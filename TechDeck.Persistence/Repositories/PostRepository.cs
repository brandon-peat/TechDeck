using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;

namespace TechDeck.Persistence.Repositories
{
    public class PostRepository(ApplicationDbContext db) : IPostRepository
    {
        public async Task Create(Post post, CancellationToken cancellationToken)
        {
            db.Add(post);
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}
