using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using System.Linq;
using System;
using TechDeck.Core.People.Messaging;
using TechDeck.Core.People.ViewModels;

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

        public async Task<Conversation> GetConversation(
            int currentPersonId,
            int otherPersonId,
            CancellationToken cancellationToken)
            => await db
                .GetConversations(currentPersonId)
                .Where(conversation => conversation.PersonId == otherPersonId)
                .FirstAsync(cancellationToken);

        public async Task<PaginatedList<Message>> GetMessagesPaged(
            int pageNumber,
            int pageSize,
            int currentPersonId,
            int otherPersonId,
            CancellationToken cancellationToken)
        {
            var messages = db.Message
                .Where(m => (m.SenderId == currentPersonId && m.RecipientId == otherPersonId) ||
                            (m.SenderId == otherPersonId && m.RecipientId == currentPersonId))
                .OrderByDescending(m => m.DateTimeSent);

            var totalItems = await messages.CountAsync(cancellationToken);
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var items = await messages
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PaginatedList<Message>(items, pageNumber, totalPages);
        }

        public async Task<int> GetUnreadMessagesTotal(int personId, CancellationToken cancellationToken)
            => await db.Message.CountAsync(message => message.RecipientId == personId && !message.IsRead, cancellationToken);
    }
}
