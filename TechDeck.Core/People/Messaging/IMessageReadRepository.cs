namespace TechDeck.Core.People.Messaging
{
    public interface IMessageReadRepository
    {
        Task<PaginatedList<Conversation>> GetConversationsPaged(
            int pageNumber,
            int pageSize,
            int personId,
            CancellationToken cancellationToken);
    }
}