using TechDeck.Core.People.Messaging;

namespace TechDeck.Core.People
{
    public interface IMessageRepository
    {
        Task CreateMessage(Message message, CancellationToken cancellationToken);
    }
}