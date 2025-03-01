namespace TechDeck.Core.People.ViewModels
{
    public record PostViewModel(
        int Id,
        int PersonId,
        DateTime DateCreated,
        string Text,
        string AuthorName,
        List<Guid> ImageUrls);
}
