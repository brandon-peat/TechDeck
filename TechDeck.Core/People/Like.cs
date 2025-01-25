namespace TechDeck.Core.People
{
    public class Like
    {
        public int Id { get; set; }
        public required int PersonId { get; set; }
        public required int PostId { get; set; }
    }
}
