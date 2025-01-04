using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using System.Linq;

namespace TechDeck.Persistence.Repositories
{
    public class PostRepository(ApplicationDbContext db) : IPostRepository
    {
        public async Task Create(Post post, CancellationToken cancellationToken)
        {
            db.Add(post);
            await db.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<Post>> GetActivity(CancellationToken cancellationToken)
        {
            return await db.Post.OrderByDescending(Post => Post.DateCreated).Take(10).ToListAsync(cancellationToken);
        }
    }
}
