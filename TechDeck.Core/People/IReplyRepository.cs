namespace TechDeck.Core.People
{
    public interface IReplyRepository
    {
        Task Create(Reply reply, CancellationToken cancellationToken);
    }
}