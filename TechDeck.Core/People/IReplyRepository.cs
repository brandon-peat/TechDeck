using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public interface IReplyRepository
    {
        Task Create(Reply reply, CancellationToken cancellationToken);

        Task<PaginatedList<ReplyViewModel>> GetRepliesPaged(int postId, int pageNumber, int pageSize, CancellationToken cancellationToken);

        Task<int> GetTotalReplies(int postId, CancellationToken cancellationToken);
    }
}