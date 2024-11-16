namespace TechDeck.Core.People
{
    public class Person
    {
        public int Id { get; set; }
        public required string Forename { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required byte[] PasswordHash { get; set; }
    }
}
