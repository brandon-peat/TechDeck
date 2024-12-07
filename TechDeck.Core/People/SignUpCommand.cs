using MediatR;
using System.Net;
using System.Net.Mail;
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

            var smtpClient = new SmtpClient("smtp.mailersend.net")
            {
                Port = 587,
                Credentials = new NetworkCredential("MS_jQQnbD@trial-z86org809wn4ew13.mlsender.net", "5OPlK4awxe6yS4rO"),
                EnableSsl = true,
            };

            var body = $"Welcome {request.FirstName} {request.LastName}. Your TechDeck account has been successfully registered. Please click here to log in: http://localhost:4200/log-in";
            smtpClient.Send("no-reply@trial-z86org809wn4ew13.mlsender.net", request.Email, "Welcome to TechDeck", body);

            return ResponseViewModel.Success();
        }
    }
}
