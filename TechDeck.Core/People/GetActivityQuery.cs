using MediatR;

namespace TechDeck.Core.People
{
    public record GetActivityQuery() : IRequest<List<Post>>;

    public class GetActivityQueryHandler(IPostRepository repository) : IRequestHandler<GetActivityQuery, List<Post>>
    {
        public async Task<List<Post>> Handle(GetActivityQuery request, CancellationToken cancellationToken) =>
            await repository.GetActivity(cancellationToken);
    }
}