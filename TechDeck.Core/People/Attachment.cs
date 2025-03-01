namespace TechDeck.Core.People
{
    public class Attachment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public required Guid Name { get; set; }
    }
}
