using MediatR;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Core.People
{
    public record GetActivityQuery() : IRequest<List<PostViewModel>>;

    public class GetActivityQueryHandler(IPostRepository repository) : IRequestHandler<GetActivityQuery, List<PostViewModel>>
    {
        public async Task<List<PostViewModel>> Handle(GetActivityQuery request, CancellationToken cancellationToken) =>
            await repository.GetActivity(cancellationToken);
    }
}