using MediatR;
using System;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People.Messaging
{
    public record MarkConversationAsReadCommand(int PersonId) : IRequest<ResponseViewModel>;

    public class MarkConversationAsReadCommandHandler(IMessageRepository messageRepository, IAuthenticatedUserService service)
        : IRequestHandler<MarkConversationAsReadCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(MarkConversationAsReadCommand request, CancellationToken cancellationToken)
        {
            await messageRepository.MarkConversationAsRead(service.PersonId!.Value, request.PersonId, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
