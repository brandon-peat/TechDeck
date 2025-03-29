using MediatR;
using TechDeck.Core.Identity;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetUserPostsPagedQuery(int PageNumber, int PageSize, int PersonId) : IRequest<PaginatedList<PostViewModel>>;

    public class GetUserPostsPagedQueryHandler(IPostRepository repository)
        : IRequestHandler<GetUserPostsPagedQuery, PaginatedList<PostViewModel>>
    {
        public async Task<PaginatedList<PostViewModel>> Handle(GetUserPostsPagedQuery request, CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.GetActivityPaged(request.PageNumber, pageSize, request.PersonId, cancellationToken);
        }
    }
}