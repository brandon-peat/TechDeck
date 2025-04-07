using MediatR;
using TechDeck.Core.Identity;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record SearchPeoplePagedQuery(int PageNumber, int PageSize, string SearchTerm)
        : IRequest<PaginatedList<SearchedPersonViewModel>>;

    public class SearchPeoplePagedQueryHandler(IPersonRepository repository)
        : IRequestHandler<SearchPeoplePagedQuery, PaginatedList<SearchedPersonViewModel>>
    {
        public async Task<PaginatedList<SearchedPersonViewModel>> Handle(
            SearchPeoplePagedQuery request,
            CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.SearchPeoplePaged(request.PageNumber, pageSize, request.SearchTerm, cancellationToken);
        }
    }
}