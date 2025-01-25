using MediatR;
using System;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record LikePostCommand(
        int PostId)
        : IRequest<ResponseViewModel>;

    public class LikePostCommandHandler(
        ILikeRepository likeRepository,
        IPostRepository postRepository,
        IAuthenticatedUserService service)
        : IRequestHandler<LikePostCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(LikePostCommand request, CancellationToken cancellationToken)
        {
            var post = await postRepository.GetPost(request.PostId, cancellationToken);
            var existingLike = await likeRepository.GetLike(request.PostId, service.PersonId!.Value, cancellationToken);

            if (post.PersonId == service.PersonId)
            {
                throw new Exception("User cannot like their own post");
            }
            else if(existingLike != null)
            {
                await likeRepository.DeleteLike(existingLike.Id, cancellationToken);
            }
            else
            {
                var like = new Like
                {
                    PersonId = (int)service.PersonId!,
                    PostId = request.PostId
                };
                await likeRepository.CreateLike(like, cancellationToken);
            }
            return ResponseViewModel.Success();
        }
    }
}
