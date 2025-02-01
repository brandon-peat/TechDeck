namespace TechDeck.Core.People
{
    public interface ILikeRepository
    {
        Task CreateLike(Like like, CancellationToken cancellationToken);
        Task DeleteLike(int likeId, CancellationToken cancellationToken);
        Task<Like?> GetLike(int postId, int personId, CancellationToken cancellationToken);
        Task<int> GetLikes(int postId, CancellationToken cancellationToken);
        Task<PaginatedList<string>> GetLikeUsersPaged(int pageNumber, int pageSize, int postId, CancellationToken cancellationToken);
    }
}