using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Persistence.Repositories
{
    public class ReplyRepository(ApplicationDbContext db) : IReplyRepository
    {
        public async Task Create(Reply reply, CancellationToken cancellationToken)
        {
            db.Add(reply);
            await db.SaveChangesAsync(cancellationToken);
        }

        public async Task<PaginatedList<ReplyViewModel>> GetRepliesPaged(int postId, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var query = db.Reply.Where(reply => reply.PostId == postId);

            var replies = await query
                .OrderByDescending(reply => reply.DateCreated)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Join(db.People, reply => reply.PersonId, person => person.Id,
                    (reply, person) => new ReplyViewModel(
                        reply.Id,
                        reply.PostId,
                        reply.PersonId,
                        reply.DateCreated,
                        reply.Text,
                        $"{person.Forename} {person.Surname}"))
                .ToListAsync(cancellationToken);

            var count = await query.CountAsync(cancellationToken);
            var totalPages = (int)Math.Ceiling(count / (double)pageSize);

            return new PaginatedList<ReplyViewModel>(replies, pageNumber, totalPages);
        }

        public async Task<int> GetTotalReplies(int postId, CancellationToken cancellationToken) =>
            await db.Reply.Where<Reply>(reply => reply.PostId == postId).CountAsync(cancellationToken);
    }
}
