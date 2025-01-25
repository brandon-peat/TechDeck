using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetLikesTotalQuery(int PostId) : IRequest<int>;

    public class GetLikesTotalQueryHandler(ILikeRepository repository) : IRequestHandler<GetLikesTotalQuery, int>
    {
        public async Task<int> Handle(GetLikesTotalQuery request, CancellationToken cancellationToken) =>
            await repository.GetLikes(request.PostId, cancellationToken);

    }
}
