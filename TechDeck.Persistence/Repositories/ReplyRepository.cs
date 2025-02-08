using TechDeck.Core.People;

namespace TechDeck.Persistence.Repositories
{
    public class ReplyRepository(ApplicationDbContext db) : IReplyRepository
    {
        public async Task Create(Reply reply, CancellationToken cancellationToken)
        {
            db.Add(reply);
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}
