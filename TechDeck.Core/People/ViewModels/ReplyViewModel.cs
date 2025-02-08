namespace TechDeck.Core.People.ViewModels
{
    public record ReplyViewModel(
        int Id,
        int PostId,
        int PersonId,
        DateTime DateCreated,
        string Text,
        string AuthorName);
}
