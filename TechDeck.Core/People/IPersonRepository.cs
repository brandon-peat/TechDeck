﻿using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public interface IPersonRepository
    {
        Task Create(Person person, CancellationToken cancellationToken);

        Task<bool> IsEmailInUse(string email, CancellationToken cancellationToken);

        Task<Person?> GetByEmail(string email, CancellationToken cancellationToken);

        Task UpdateName(int personId, string firstName, string lastName, CancellationToken cancellationToken);
        
        Task<string> GetName(int personId, CancellationToken cancellationToken);

        Task<PaginatedList<SearchedPersonViewModel>> SearchPeoplePaged(
            int pageNumber,
            int pageSize,
            string searchTerm,
            CancellationToken cancellationToken);
    }
}
