namespace TechDeck.Core.People
{
    public interface IPersonRepository
    {
        Task Create(Person person, CancellationToken cancellationToken);
    }
}
