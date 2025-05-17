using MediatR;
using TechDeck.Core.Identity;

namespace TechDeck.Core.People.Messaging
{
    public record GetConversationQuery(int PersonId)
        : IRequest<Conversation>;

    public class GetConversationQueryHandler(IMessageReadRepository repository, IAuthenticatedUserService service)
        : IRequestHandler<GetConversationQuery, Conversation>
    {
        public async Task<Conversation> Handle(
            GetConversationQuery request,
            CancellationToken cancellationToken)
        {
            return await repository.GetConversation(
                service.PersonId!.Value,
                request.PersonId,
                cancellationToken);
        }
    }
}