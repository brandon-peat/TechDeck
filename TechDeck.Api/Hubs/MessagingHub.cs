using Microsoft.AspNetCore.SignalR;

namespace TechDeck.Api.Hubs
{
    public class MessagingHub : Hub
    {
        public override async Task OnConnectedAsync()
        {

        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}