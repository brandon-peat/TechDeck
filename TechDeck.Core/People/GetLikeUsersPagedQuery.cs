using MediatR;

namespace TechDeck.Core.People
{
    public record GetLikeUsersPagedQuery(int PageNumber, int PageSize, int PostId) : IRequest<PaginatedList<string>>;

    public class GetLikeUsersPagedQueryHandler(ILikeRepository repository) : IRequestHandler<GetLikeUsersPagedQuery, PaginatedList<string>>
    {
        public async Task<PaginatedList<string>> Handle(GetLikeUsersPagedQuery request, CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.GetLikeUsersPaged(request.PageNumber, pageSize, request.PostId, cancellationToken);
        }
    }
}