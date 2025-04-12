using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using TechDeck.Core.People.Messaging;

namespace TechDeck.Persistence.Repositories
{
    public class MessageRepository(ApplicationDbContext db) : IMessageRepository
    {
        public async Task CreateMessage(Message message, CancellationToken cancellationToken)
        {
            db.Add(message);
            await db.SaveChangesAsync(cancellationToken);
        }
    }
}