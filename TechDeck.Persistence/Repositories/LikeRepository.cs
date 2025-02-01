using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using System.Linq;
using TechDeck.Core.People.ViewModels;
using System;

namespace TechDeck.Persistence.Repositories
{
    public class LikeRepository(ApplicationDbContext db) : ILikeRepository
    {
        public async Task CreateLike(Like like, CancellationToken cancellationToken)
        {
            db.Add(like);
            await db.SaveChangesAsync(cancellationToken);
        }
        public async Task DeleteLike(int likeId, CancellationToken cancellationToken)
        {
            db.Remove(db.Like.Find(likeId)!);
            await db.SaveChangesAsync(cancellationToken);
        }
        public async Task<Like?> GetLike(int postId, int personId, CancellationToken cancellationToken) =>
            await db.Like.FirstOrDefaultAsync(like => like.PostId == postId && like.PersonId == personId, cancellationToken);
        public async Task<int> GetLikes(int postId, CancellationToken cancellationToken) =>
            await db.Like.Where<Like>(like => like.PostId == postId).CountAsync(cancellationToken);
        public async Task<PaginatedList<string>> GetLikeUsersPaged(int pageNumber, int pageSize, int postId, CancellationToken cancellationToken)
        {
            var names = await db.Like
            .Where(like => like.PostId == postId)
            .Join(db.People,
                  like => like.PersonId,
                  person => person.Id,
                  (like, person) => new {
                      fullName = person.Forename + " " + person.Surname
                  })
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(name => name.fullName)
            .ToListAsync(cancellationToken);

            var count = await db.Like
                .Where(like => like.PostId == postId)
                .CountAsync();
            var totalPages = (int)Math.Ceiling(count / (double)pageSize);

            return new PaginatedList<string>(names, pageNumber, totalPages);
        }
    }
}
