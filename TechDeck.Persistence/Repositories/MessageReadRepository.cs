using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using System.Linq;
using System;
using TechDeck.Core.People.Messaging;

namespace TechDeck.Persistence.Repositories
{
    public class MessageReadRepository(ApplicationDbContext db) : IMessageReadRepository
    {
        public async Task<PaginatedList<Conversation>> GetConversationsPaged(
            int pageNumber,
            int pageSize,
            int personId,
            CancellationToken cancellationToken)
        {
            var conversations = db.GetConversations(personId).OrderByDescending(c => c.DateTimeSent);

            var totalItems = await conversations.CountAsync(cancellationToken);
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var items = await conversations
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PaginatedList<Conversation>(items, pageNumber, totalPages);
        }
    }
}
