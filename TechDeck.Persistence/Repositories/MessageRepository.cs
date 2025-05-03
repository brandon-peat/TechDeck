using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using TechDeck.Core.People.Messaging;

namespace TechDeck.Persistence.Repositories
{
    public class MessageRepository(ApplicationDbContext db) : IMessageRepository
    {
        public async Task<int> CreateMessage(Message message, CancellationToken cancellationToken)
        {
            db.Add(message);
            await db.SaveChangesAsync(cancellationToken);
            return message.Id;
        }

        public async Task MarkConversationAsRead(int currentPersonId, int otherPersonId, CancellationToken cancellationToken)
        {
            var messages = await db.Message
                .Where(m => m.SenderId == otherPersonId && m.RecipientId == currentPersonId)
                .ToListAsync(cancellationToken);

            foreach (var message in messages)
            {
                message.IsRead = true;
            }

            await db.SaveChangesAsync(cancellationToken);
        }
    }
}