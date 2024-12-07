namespace TechDeck.Core.People
{
    public interface IPersonRepository
    {
        Task Create(Person person, CancellationToken cancellationToken);

        Task<bool> IsEmailInUse(string email, CancellationToken cancellationToken);

        Task<Person?> GetByEmail(string email, CancellationToken cancellationToken);
    }
}
