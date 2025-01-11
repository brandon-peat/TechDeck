using System.Runtime.CompilerServices;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public interface IPostRepository
    {
        Task Create(Post post, CancellationToken cancellationToken);

        Task<PaginatedList<PostViewModel>> GetActivityPaged(int pageNumber, int pageSize, CancellationToken cancellationToken);

        Task<PostViewModel> GetPost(int postId, CancellationToken cancellationToken);
    }
}