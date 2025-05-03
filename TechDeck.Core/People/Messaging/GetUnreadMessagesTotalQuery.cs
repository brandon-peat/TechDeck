using MediatR;
using TechDeck.Core.Identity;

namespace TechDeck.Core.People.Messaging
{
    public record GetUnreadMessagesTotalQuery()
        : IRequest<int>;

    public class GetUnreadMessagesTotalQueryHandler(IMessageReadRepository repository, IAuthenticatedUserService service)
        : IRequestHandler<GetUnreadMessagesTotalQuery, int>
    {
        public async Task<int> Handle(
            GetUnreadMessagesTotalQuery request,
            CancellationToken cancellationToken)
        {
            return await repository.GetUnreadMessagesTotal(
                service.PersonId!.Value,
                cancellationToken);
        }
    }
}