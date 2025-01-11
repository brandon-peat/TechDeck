using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetActivityPagedQuery(int pageNumber, int pageSize) : IRequest<PaginatedList<PostViewModel>>;

    public class GetActivityPagedQueryHandler(IPostRepository repository) : IRequestHandler<GetActivityPagedQuery, PaginatedList<PostViewModel>>
    {
        public async Task<PaginatedList<PostViewModel>> Handle(GetActivityPagedQuery request, CancellationToken cancellationToken)
        {
            var pageSize = request.pageSize > 1000 ? 1000 : request.pageSize;

            return await repository.GetActivityPaged(request.pageNumber, pageSize, cancellationToken);
        }
    }
}