using MediatR;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record SignUpCommand(
        string FirstName,
        string LastName,
        string Email,
        string Password)
        : IRequest<ResponseViewModel>;

    public class SignUpCommandHandler(IPersonRepository personRepository) : IRequestHandler<SignUpCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(SignUpCommand request, CancellationToken cancellationToken)
        {
            var person = new Person
            {
                Forename = request.FirstName,
                Surname = request.LastName,
                Email = request.Email,
                PasswordHash = []
            };

            await personRepository.Create(person, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
