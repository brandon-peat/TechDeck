using MediatR;
using System.Net;
using System.Net.Mail;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record UpdateNameCommand(
        string FirstName,
        string LastName)
        : IRequest<ResponseViewModel>;

    public class UpdateNameCommandHandler(
        IPersonRepository personRepository,
        IAuthenticatedUserService authenticatedUserService)
        : IRequestHandler<UpdateNameCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(UpdateNameCommand request, CancellationToken cancellationToken)
        {
            await personRepository.UpdateName(authenticatedUserService.PersonId!.Value, request.FirstName, request.LastName, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
