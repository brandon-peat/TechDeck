using MediatR;
using TechDeck.Core.People.ViewModels;
using TechDeck.Core.Identity;

namespace TechDeck.Core.People
{
    public record HaveILikedQuery(int PostId) : IRequest<bool>;

    public class HaveILikedQueryHandler(
        ILikeRepository repository,
        IAuthenticatedUserService service
        ) : IRequestHandler<HaveILikedQuery, bool>
    {
        public async Task<bool> Handle(HaveILikedQuery request, CancellationToken cancellationToken)
        {
            var like = await repository.GetLike(request.PostId, service.PersonId!.Value, cancellationToken);
            return like != null;
        }
    }
}
