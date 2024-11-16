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
    }
}
