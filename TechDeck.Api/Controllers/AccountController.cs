using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechDeck.Core.Files;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;
using TechDeck.Core.People;
using TechDeck.Identity.Commands;
using TechDeck.Identity.Security;
using TechDeck.Core.People.ViewModels;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("account")]
    public class AccountController(IMediator mediator) : Controller
    {
        [AllowAnonymous]
        [HttpPost("sign-up")]
        public async Task<ResponseViewModel> SignUp(SignUpCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [AllowAnonymous]
        [HttpPost("log-in")]
        public async Task<ResponseViewModel> LogIn(LogInCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [AllowAnonymous]
        [HttpGet("email-is-in-use/{email}")]
        public async Task<bool> EmailIsInUse(string email, CancellationToken cancellationToken)
            => await mediator.Send(new EmailIsInUseQuery(email), cancellationToken);

        [HttpPost("name")]
        public async Task<ResponseViewModel> UpdateName(UpdateNameCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);
        
        [AllowAnonymous]
        [HttpGet("name/{userId}")]
        public async Task<string> GetName(int userId, CancellationToken cancellationToken)
            => await mediator.Send(new GetNameQuery(userId), cancellationToken);

        [HttpGet("profile-picture/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProfilePicture(int userId, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new GetProfilePictureQuery(userId), cancellationToken);

            return result.Exists ? File(result.Content!, "image/jpeg") : NotFound();
        }

        [HttpPost("profile-picture")]
        public async Task<IActionResult> UploadProfilePicture(
            [FromForm] IFormFile file, CancellationToken cancellationToken)
        {
            var response = await mediator.Send(
                new UploadProfilePictureCommand(file.OpenReadStream()), 
                cancellationToken);
                
            return Ok(response);
        }

        [HttpGet("banner/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBanner(int userId, CancellationToken cancellationToken)
        {
            var result = await mediator.Send(new GetBannerQuery(userId), cancellationToken);
            
            return result.Exists ? File(result.Content!, "image/jpeg") : NotFound();
        }

        [HttpPost("banner")]
        public async Task<IActionResult> UploadBanner(
            [FromForm] IFormFile file, CancellationToken cancellationToken)
        {
            var response = await mediator.Send(
                new UploadBannerCommand(file.OpenReadStream()), 
                cancellationToken);
                
            return Ok(response);
        }

        [HttpPost("search")]
        public async Task<PaginatedList<SearchedPersonViewModel>> Search(SearchPeoplePagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);
    }
}
