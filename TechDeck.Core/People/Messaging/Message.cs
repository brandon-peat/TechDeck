namespace TechDeck.Core.People.Messaging
{
    public class Message
    {
        public int Id { get; set; }
        public required int SenderId { get; set; }
        public required int RecipientId { get; set; }
        public DateTime DateTimeSent { get; set; } = DateTime.Now; // db sets this
        public required string Text { get; set; }
        public bool IsRead { get; set; } = false;
    }
}
