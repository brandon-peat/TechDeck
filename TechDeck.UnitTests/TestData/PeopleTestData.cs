using TechDeck.Core.People;

namespace TechDeck.UnitTests.TestData
{
    internal static class PeopleTestData
    {
        public static List<Person> StandardPeople = [
            new()
            {
                Id = 1,
                Forename = "John",
                Surname = "Smith",
                Email = "johnsmith@gmail.com",
                PasswordHash = "thisisnotapassword"
            },
            new()
            {
                Id = 2,
                Forename = "John",
                Surname = "Johnson-Smith",
                Email = "johnjohnsonsmith@example.com",
                PasswordHash = "thisisnotapassword"
            },
            new()
            {
                Id = 3,
                Forename = "Joe",
                Surname = "McSmith",
                Email = "joemcsmith@example.com",
                PasswordHash = "thisisnotapassword"
            },
            new()
            {
                Id = 4,
                Forename = "Fictional",
                Surname = "McPerson",
                Email = "fictionalmcperson@imaginary.com",
                PasswordHash = "thisisnotapassword"
            },
            new()
            {
                Id = 5,
                Forename = "Bill",
                Surname = "Board",
                Email = "billboard@example.com",
                PasswordHash = "thisisnotapassword"
            },
            new()
            {
                Id = 6,
                Forename = "Jotaro",
                Surname = "Kujo",
                Email = "jotaro.kujo@yahoo.com",
                PasswordHash = "thisisnotapassword"
            },
            new()
            {
                Id = 7,
                Forename = "Giorno",
                Surname = "Giovanna",
                Email = "giorno.giovanna@passione.com",
                PasswordHash = "thisisnotapassword"
            }
        ];
    }
}
