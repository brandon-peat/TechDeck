namespace TechDeck.Core.People.Messaging
{
    public record Conversation
    {
        public required int Id { get; init; }
        public required int PersonId { get; init; }
        public required DateTime DateTimeSent { get; init; }
        public required string Text { get; init; }
        public required bool IsRead { get; init; }
        public required bool IsLastMessageFromMe { get; init; }
        public required string Forename { get; init; }
        public required string Surname { get; init; }

        public string FullName => $"{Forename} {Surname}";
    }
}
