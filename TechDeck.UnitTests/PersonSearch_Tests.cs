using MockQueryable.Moq;
using Moq;
using Shouldly;
using TechDeck.Persistence;
using TechDeck.Persistence.Repositories;
using TechDeck.UnitTests.TestData;

namespace TechDeck.UnitTests
{
    public class PersonSearch_Tests
    {
        private readonly Mock<ApplicationDbContext> _dbMock = new();
        private readonly PersonRepository _sut;

        public PersonSearch_Tests()
        {
            var mockDbSet = PeopleTestData.StandardPeople.AsQueryable().BuildMockDbSet();
            _dbMock.Setup(x => x.People).Returns(mockDbSet.Object);

            _sut = new PersonRepository(_dbMock.Object);
        }

        [Fact]
        public async Task We_Can_Search_By_Part_Of_The_First_Name()
        {
            var data = await _sut.SearchPeoplePaged(
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "Jo",
                default);

            var names = data.Items.Select(x => x.FullName).ToList();

            names.ShouldBe([
                "John Smith",
                "John Johnson-Smith",
                "Joe McSmith",
                "Jotaro Kujo"]);
        }

        [Fact]
        public async Task We_Can_Search_By_First_Name()
        {
            var data = await _sut.SearchPeoplePaged(
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "Jotaro",
                default);

            var names = data.Items.Select(x => x.FullName).ToList();

            names.ShouldBe(["Jotaro Kujo"]);
        }

        [Fact]
        public async Task We_Can_Search_By_Part_Of_The_Last_Name()
        {
            var data = await _sut.SearchPeoplePaged(
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "Smi",
                default);

            var names = data.Items.Select(x => x.FullName).ToList();

            names.ShouldBe(["John Smith", "John Johnson-Smith", "Joe McSmith"]);
        }

        [Fact]
        public async Task We_Can_Search_By_Last_Name()
        {
            var data = await _sut.SearchPeoplePaged(
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "Kujo",
                default);

            var names = data.Items.Select(x => x.FullName).ToList();

            names.ShouldBe(["Jotaro Kujo"]);
        }

        [Fact]
        public async Task We_Can_Search_By_Part_Of_The_Full_Name()
        {
            var data = await _sut.SearchPeoplePaged(
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "Giorno Gio",
                default);

            var names = data.Items.Select(x => x.FullName).ToList();

            names.ShouldBe(["Giorno Giovanna"]);
        }

        [Fact]
        public async Task We_Can_Search_By_Full_Name()
        {
            var data = await _sut.SearchPeoplePaged(
                pageNumber: 1,
                pageSize: 10,
                searchTerm: "Jotaro Kujo",
                default);

            var names = data.Items.Select(x => x.FullName).ToList();

            names.ShouldBe(["Jotaro Kujo"]);
        }
    }
}