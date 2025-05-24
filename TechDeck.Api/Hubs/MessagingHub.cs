using MediatR;
using Microsoft.AspNetCore.SignalR;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;
using TechDeck.Core.People.Messaging;

namespace TechDeck.Api.Hubs
{
    public class MessagingHub(IMediator mediator, IAuthenticatedUserService service) : Hub
    {
        public override async Task OnConnectedAsync()
            => await Groups.AddToGroupAsync(Context.ConnectionId, service.PersonId!.Value.ToString());

        public async Task SendMessage(string text, int recipientId)
        {
            var message = await mediator.Send(new SendMessageCommand(text, recipientId));

            if (recipientId != service.PersonId)
            {
                await Clients.Group(recipientId.ToString()).SendAsync("ReceiveMessage", message);
            }

            await Clients.Caller.SendAsync("ReceiveMessage", message);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, service.PersonId!.Value.ToString());
            await base.OnDisconnectedAsync(exception);
        }
    }
}