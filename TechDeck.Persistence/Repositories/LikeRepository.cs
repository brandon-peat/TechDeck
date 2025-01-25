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
    }
}
