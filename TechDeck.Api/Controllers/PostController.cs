using MediatR;
using Microsoft.AspNetCore.Mvc;
using TechDeck.Api.Responses;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;
using TechDeck.Core.People;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Route("post")]
    public class PostController(IMediator mediator, IAuthenticatedUserService service) : Controller
    {
        [HttpPost("create-post")]
        public async Task<ResponseViewModel> CreatePost(CreatePostCommand command, CancellationToken cancellationToken)
        {
            if (!service.IsAuthenticated)
            {
                throw new ArgumentException("Unauthorised");
            }

            return await mediator.Send(command, cancellationToken);
        }
    }
}
