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
    }
}
