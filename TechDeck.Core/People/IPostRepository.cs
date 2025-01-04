using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public interface IPostRepository
    {
        Task Create(Post post, CancellationToken cancellationToken);

        Task<List<PostViewModel>> GetActivity(CancellationToken cancellationToken);
    }
}
