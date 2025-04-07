namespace TechDeck.Core.People.ViewModels
{
    public record SearchedPersonViewModel(
        int Id,
        string Forename,
        string Surname)
    {
        public string FullName => $"{Forename} {Surname}";
    }
}
