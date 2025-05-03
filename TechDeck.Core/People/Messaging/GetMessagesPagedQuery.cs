using MediatR;
using TechDeck.Core.Identity;
using TechDeck.Core.Shared;

namespace TechDeck.Core.People.Messaging
{
    public record GetMessagesPagedQuery(
        int PageNumber,
        int PageSize,
        int PersonId)
        : PagedQuery(PageNumber, PageSize),
        IRequest<PaginatedList<Message>>;

    public class GetMessagesPagedQueryHandler(IMessageReadRepository repository, IAuthenticatedUserService service)
        : IRequestHandler<GetMessagesPagedQuery, PaginatedList<Message>>
    {
        public async Task<PaginatedList<Message>> Handle(
            GetMessagesPagedQuery request,
            CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.GetMessagesPaged(
                request.PageNumber,
                pageSize,
                service.PersonId!.Value,
                request.PersonId,
                cancellationToken);
        }
    }
}