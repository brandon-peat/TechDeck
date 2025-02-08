using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetRepliesTotalQuery(int PostId) : IRequest<int>;

    public class GetRepliesTotalQueryHandler(IReplyRepository repository) : IRequestHandler<GetRepliesTotalQuery, int>
    {
        public async Task<int> Handle(GetRepliesTotalQuery request, CancellationToken cancellationToken) =>
            await repository.GetRepliesTotal(request.PostId, cancellationToken);
    }
}
