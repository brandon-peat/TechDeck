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
        public async Task<int> SendMessage(SendMessageCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpPost("conversations")]
        public async Task<PaginatedList<Conversation>> GetConversationsPagedQuery(
            GetConversationsPagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);

        [HttpPost("messages")]
        public async Task<PaginatedList<Message>> GetMessagesPagedQuery(GetMessagesPagedQuery query, CancellationToken cancellationToken)
            => await mediator.Send(query, cancellationToken);

        [HttpPost("mark-conversation-as-read")]
        public async Task<ResponseViewModel> MarkConversationAsRead(MarkConversationAsReadCommand command, CancellationToken cancellationToken)
            => await mediator.Send(command, cancellationToken);

        [HttpGet("unread-messages-total")]
        public async Task<int> GetUnreadMessagesTotal(CancellationToken cancellationToken)
            => await mediator.Send(new GetUnreadMessagesTotalQuery(), cancellationToken);
    }
}