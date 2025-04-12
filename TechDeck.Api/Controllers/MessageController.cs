using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TechDeck.Core.Models;
using TechDeck.Core.People;
using TechDeck.Core.People.Messaging;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("message")]
    public class MessageController(IMediator mediator) : Controller
    {
        [HttpPost("send")]
        public async Task<ResponseViewModel> SendMessage(string text, int recipientId, CancellationToken cancellationToken)
            => await mediator.Send(new SendMessageCommand(text, recipientId), cancellationToken);

        [HttpPost("conversations")]
        public async Task<PaginatedList<Conversation>> GetConversationsPagedQuery(
            GetConversationsPagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);
    }
}