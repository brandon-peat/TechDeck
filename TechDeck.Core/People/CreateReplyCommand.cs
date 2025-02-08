using MediatR;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record CreateReplyCommand(
        int PostId,
        string Text)
        : IRequest<ResponseViewModel>;

    public class CreateReplyCommandHandler(
        IReplyRepository replyRepository,
        IAuthenticatedUserService service)
        : IRequestHandler<CreateReplyCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(CreateReplyCommand request, CancellationToken cancellationToken)
        {
            var reply = new Reply
            {
                PostId = request.PostId,
                PersonId = service.PersonId!.Value,
                Text = request.Text
            };
            await replyRepository.Create(reply, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
