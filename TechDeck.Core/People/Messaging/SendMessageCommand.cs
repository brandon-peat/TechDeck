using MediatR;
using System;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People.Messaging
{
    public record SendMessageCommand(string Text, int RecipientId) : IRequest<int>;

    public class CreateMessageCommandHandler(IMessageRepository messageRepository, IAuthenticatedUserService service)
        : IRequestHandler<SendMessageCommand, int>
    {
        public async Task<int> Handle(SendMessageCommand request, CancellationToken cancellationToken)
        {
            var message = new Message
            {
                SenderId = service.PersonId!.Value,
                RecipientId = request.RecipientId,
                Text = request.Text
            };

            return await messageRepository.CreateMessage(message, cancellationToken);
        }
    }
}
