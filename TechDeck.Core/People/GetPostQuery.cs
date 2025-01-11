using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetPostQuery(int postId) : IRequest<PostViewModel>;

    public class GetPostQueryHandler(IPostRepository repository) : IRequestHandler<GetPostQuery, PostViewModel>
    {
        public async Task<PostViewModel> Handle(GetPostQuery request, CancellationToken cancellationToken) =>
            await repository.GetPost(request.postId, cancellationToken);

    }
}
