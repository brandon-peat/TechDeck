using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using System.Linq;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Persistence.Repositories
{
    public class PostRepository(ApplicationDbContext db) : IPostRepository
    {
        public async Task Create(Post post, CancellationToken cancellationToken)
        {
            db.Add(post);
            await db.SaveChangesAsync(cancellationToken);
        }

        public async Task<List<PostViewModel>> GetActivity(CancellationToken cancellationToken)
        {
            return await db.Post
                .OrderByDescending(Post => Post.DateCreated)
                .Take(10)
                .Join(db.People, post => post.PersonId, person => person.Id,
                    (post, person) => new PostViewModel(
                        post.Id,
                        post.PersonId,
                        post.DateCreated,
                        post.Text,
                        person.Forename + person.Surname))
                .ToListAsync(cancellationToken);
        }
    }
}
