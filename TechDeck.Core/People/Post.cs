namespace TechDeck.Core.People
{
    public class Post
    {
        public int Id { get; set; }
        public required int PersonId { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now; // db sets this
        public required string Text { get; set; }
    }
}
