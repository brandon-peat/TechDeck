namespace TechDeck.Core.People.Messaging
{
    public interface IMessageReadRepository
    {
        Task<PaginatedList<Conversation>> GetConversationsPaged(
            int pageNumber,
            int pageSize,
            int personId,
            CancellationToken cancellationToken);

        Task<Conversation> GetConversation(
            int currentPersonId,
            int otherPersonId,
            CancellationToken cancellationToken);

        Task<PaginatedList<Message>> GetMessagesPaged(
            int pageNumber,
            int pageSize,
            int currentPersonId,
            int otherPersonId,
            CancellationToken cancellationToken); 

        Task<int> GetUnreadMessagesTotal(
            int personId,
            CancellationToken cancellationToken);
    }
}