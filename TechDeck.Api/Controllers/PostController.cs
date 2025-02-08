using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechDeck.Core.Files;
using TechDeck.Core.Models;
using TechDeck.Core.People;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("post")]
    public class PostController(IMediator mediator, IFileManager files) : Controller
    {
        [HttpPost("create-post")]
        public async Task<ResponseViewModel> CreatePost(CreatePostCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpPost("activity")]
        public async Task<PaginatedList<PostViewModel>> GetActivityPagedQuery(GetActivityPagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);

        [HttpGet("post/{postId}")]
        public async Task<PostViewModel> GetPostQuery(int postId, CancellationToken cancellationToken)
            => await mediator.Send(new GetPostQuery(postId), cancellationToken);

        [HttpPost("like/{postId}")]
        public async Task<ResponseViewModel> LikePost(int postId, CancellationToken cancellationToken)
            => await mediator.Send(new LikePostCommand(postId), cancellationToken);

        [HttpGet("number-of-likes/{postId}")]
        public async Task<int> GetLikesTotalQuery(int postId, CancellationToken cancellationToken)
            => await mediator.Send(new GetLikesTotalQuery(postId), cancellationToken);

        [HttpGet("have-i-liked/{postId}")]
        public async Task<bool> HaveILikedQuery(int postId, CancellationToken cancellationToken)
            => await mediator.Send(new HaveILikedQuery(postId), cancellationToken);

        [HttpPost("get-like-users")]
        public async Task<PaginatedList<string>> GetLikeUsersPagedQuery(GetLikeUsersPagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);

        [HttpPost("reply")]
        public async Task<ResponseViewModel> CreateReplyToPost(CreateReplyCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpPost("image")]
        public async Task UploadImage([FromForm] IFormFile file, CancellationToken cancellationToken)
        {
            await files.UploadFile("blah", "blah-file", file.OpenReadStream(), cancellationToken);
        }

        [HttpPost("replies/query")]
        public async Task<PaginatedList<ReplyViewModel>> GetRepliesPagedQuery(GetRepliesPagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);

        [HttpGet("number-of-replies/{postId}")]
        public async Task<int> GetRepliesTotalQuery(int postId, CancellationToken cancellationToken)
            => await mediator.Send(new GetRepliesTotalQuery(postId), cancellationToken);
    }
}
