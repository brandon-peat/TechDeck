using TechDeck.Core.People.Messaging;

namespace TechDeck.Core.People
{
    public interface IMessageRepository
    {
        Task<Message> CreateMessage(Message message, CancellationToken cancellationToken);
        Task MarkConversationAsRead(int currentPersonId, int otherPersonId, CancellationToken cancellationToken);
    }
}