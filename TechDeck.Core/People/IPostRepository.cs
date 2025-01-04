namespace TechDeck.Core.People
{
    public interface IPostRepository
    {
        Task Create(Post post, CancellationToken cancellationToken);

        Task<List<Post>> GetActivity(CancellationToken cancellationToken);
    }
}
