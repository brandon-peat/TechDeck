using MediatR;
using System;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record CreatePostCommand(
        string Text)
        : IRequest<ResponseViewModel>;

    public class CreatePostCommandHandler(
        IPostRepository postRepository,
        IAuthenticatedUserService service)
        : IRequestHandler<CreatePostCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            var post = new Post
            {
                PersonId = service.PersonId.Value,
                Text = request.Text
            };
            await postRepository.Create(post, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
