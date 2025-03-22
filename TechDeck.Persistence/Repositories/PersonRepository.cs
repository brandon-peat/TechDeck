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

        public async Task<Person?> GetByEmail(string email, CancellationToken cancellationToken)
            => await db.People.FirstOrDefaultAsync(person => person.Email == email, cancellationToken);

        public async Task UpdateName(int personId, string firstName, string lastName, CancellationToken cancellationToken)
        {
            var person = await db.People.FindAsync([personId], cancellationToken);
            if (person != null)
            {
                person.Forename = firstName;
                person.Surname = lastName;
                await db.SaveChangesAsync(cancellationToken);
            }
        }

        public async Task<string> GetName(int personId, CancellationToken cancellationToken)
        {
            var fullName = await db.People
                .Where(person => person.Id == personId)
                .Select(person => person.FullName)
                .SingleOrDefaultAsync(cancellationToken);

            return fullName ?? string.Empty;
        }
    }
}
