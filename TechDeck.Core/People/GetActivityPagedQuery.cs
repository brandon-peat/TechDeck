using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetActivityPagedQuery(int PageNumber, int PageSize) : IRequest<PaginatedList<PostViewModel>>;

    public class GetActivityPagedQueryHandler(IPostRepository repository) : IRequestHandler<GetActivityPagedQuery, PaginatedList<PostViewModel>>
    {
        public async Task<PaginatedList<PostViewModel>> Handle(GetActivityPagedQuery request, CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.GetActivityPaged(request.PageNumber, pageSize, cancellationToken);
        }
    }
}