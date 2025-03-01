using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using System.Linq;
using TechDeck.Core.People.ViewModels;
using System;
using TechDeck.Core.Files;

namespace TechDeck.Persistence.Repositories
{
    public class PostRepository(ApplicationDbContext db) : IPostRepository
    {
        public async Task Create(Post post, CancellationToken cancellationToken)
        {
            db.Add(post);
            await db.SaveChangesAsync(cancellationToken);
        }

        public async Task<PaginatedList<PostViewModel>> GetActivityPaged(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var posts = await db.Post
                .OrderByDescending(Post => Post.DateCreated)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Join(db.People, post => post.PersonId, person => person.Id,
                    (post, person) => new PostViewModel(
                        post.Id,
                        post.PersonId,
                        post.DateCreated,
                        post.Text,
                        $"{person.Forename} {person.Surname}",
                        post.Attachments.Select(a => a.Name).ToList()
                    )
                )
                .ToListAsync(cancellationToken);

            var count = await db.Post.CountAsync(cancellationToken);
            var totalPages = (int) Math.Ceiling(count / (double) pageSize);

            return new PaginatedList<PostViewModel>(posts, pageNumber, totalPages);
        }

        public async Task<PostViewModel> GetPost(int postId, CancellationToken cancellationToken) =>
            await db.Post
                .Where(post => post.Id == postId)
                .Join(db.People, post => post.PersonId, person => person.Id,
                    (post, person) => new PostViewModel(
                        post.Id,
                        post.PersonId,
                        post.DateCreated,
                        post.Text,
                        $"{person.Forename} {person.Surname}",
                        post.Attachments.Select(a => a.Name).ToList()
                    )
                )
                .FirstAsync(cancellationToken);
    }
}
