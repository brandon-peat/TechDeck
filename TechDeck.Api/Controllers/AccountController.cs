using MediatR;
using Microsoft.AspNetCore.Mvc;
using TechDeck.Core.Models;
using TechDeck.Core.People;
using TechDeck.Identity.Commands;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Route("account")]
    public class AccountController(IMediator mediator)
    {
        [HttpPost("sign-up")]
        public async Task<ResponseViewModel> SignUp(SignUpCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpPost("log-in")]
        public async Task<ResponseViewModel> LogIn(LogInCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpGet("email-is-in-use/{email}")]
        public async Task<bool> EmailIsInUse(string email, CancellationToken cancellationToken)
            => await mediator.Send(new EmailIsInUseQuery(email), cancellationToken);
    }
}
