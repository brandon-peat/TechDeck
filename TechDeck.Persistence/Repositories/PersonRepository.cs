using Microsoft.EntityFrameworkCore;
using TechDeck.Core.People;
using TechDeck.Core.People.ViewModels;

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

        public async Task<PaginatedList<SearchedPersonViewModel>> SearchPeoplePaged(
            int pageNumber,
            int pageSize,
            string searchTerm,
            CancellationToken cancellationToken)
        {
            var query = db.People
                .Where(person =>
                    person.Forename.Contains(searchTerm) ||
                    person.Surname.Contains(searchTerm) ||
                    (person.Forename + " " + person.Surname).Contains(searchTerm));

            var totalItems = await query.CountAsync(cancellationToken);
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(person => new SearchedPersonViewModel(
                    person.Id,
                    person.Forename,
                    person.Surname))
                .ToListAsync(cancellationToken);

            return new PaginatedList<SearchedPersonViewModel>(items, pageNumber, totalPages);
        }
    }
}
