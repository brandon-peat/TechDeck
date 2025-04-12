using MediatR;
using System;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People.Messaging
{
    public record SendMessageCommand(string Text, int RecipientId) : IRequest<ResponseViewModel>;

    public class CreateMessageCommandHandler(IMessageRepository messageRepository, IAuthenticatedUserService service)
        : IRequestHandler<SendMessageCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                SenderId = service.PersonId!.Value,
                RecipientId = request.RecipientId,
                Text = request.Text
            };
            await messageRepository.CreateMessage(message, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
