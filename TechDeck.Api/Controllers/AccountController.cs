using MediatR;
using Microsoft.AspNetCore.Mvc;
using TechDeck.Core.Models;
using TechDeck.Core.People;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController(IMediator mediator)
    {
        [HttpPost("sign-up")]
        public async Task<ResponseViewModel> SignUp(SignUpCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpGet("email-is-in-use/{email}")]
        public async Task<bool> Name(string email, CancellationToken cancellationToken)
            => await mediator.Send(new EmailIsInUseQuery(email), cancellationToken);
    }
}
