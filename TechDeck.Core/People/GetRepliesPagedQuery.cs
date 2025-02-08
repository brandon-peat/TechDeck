using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetRepliesPagedQuery(int PostId, int PageNumber, int PageSize) : IRequest<PaginatedList<ReplyViewModel>>;

    public class GetRepliesPagedQueryHandler(IReplyRepository repository)
        : IRequestHandler<GetRepliesPagedQuery, PaginatedList<ReplyViewModel>>
    {
        public async Task<PaginatedList<ReplyViewModel>> Handle(GetRepliesPagedQuery request, CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.GetRepliesPaged(request.PostId, request.PageNumber, pageSize, cancellationToken);
        }
    }
}