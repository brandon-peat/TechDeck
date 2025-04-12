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
            return await repository.GetConversationsPaged(
                request.PageNumber,
                request.PageSize,
                service.PersonId!.Value,
                cancellationToken);
        }
    }
}