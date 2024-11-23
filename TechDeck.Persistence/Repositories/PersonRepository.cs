using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;

namespace TechDeck.Persistence.Repositories
{
    public class PersonRepository(ApplicationDbContext db) : IPersonRepository
    {
        public async Task Create(Person person, CancellationToken cancellationToken)
        {
            db.Add(person);
            await db.SaveChangesAsync(cancellationToken);
        }

        public async Task<bool> IsEmailInUse(string email, CancellationToken cancellationToken) => 
            await db.People.AnyAsync(person => person.Email == email, cancellationToken);
    }
}
