using MediatR;
using TechDeck.Core.Identity;

namespace TechDeck.Core.People.Messaging
{
    public record GetConversationsPagedQuery(int PageNumber, int PageSize)
        : IRequest<PaginatedList<Conversation>>;

    public class GetConversationsPagedQueryHandler(IMessageReadRepository repository, IAuthenticatedUserService service)
        : IRequestHandler<GetConversationsPagedQuery, PaginatedList<Conversation>>
    {
        public async Task<PaginatedList<Conversation>> Handle(
            GetConversationsPagedQuery request,
            CancellationToken cancellationToken)
        {
            var pageSize = request.PageSize > 1000 ? 1000 : request.PageSize;

            return await repository.GetConversationsPaged(
                request.PageNumber,
                pageSize,
                service.PersonId!.Value,
                cancellationToken);
        }
    }
}