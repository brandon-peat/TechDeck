using MediatR;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;
using TechDeck.Core.People;
using TechDeck.Identity.Models;
using TechDeck.Identity.Security;

namespace TechDeck.Identity.Commands
{
    public record LogInCommand(
        string Email,
        string Password)
        : IRequest<ResponseViewModel<UserAuthBase>>;

    public class LogInCommandHandler(
        IPersonRepository personRepository,
        JwtSettings jwtSettings,
        ISecretHasher secretHasher) : IRequestHandler<LogInCommand, ResponseViewModel<UserAuthBase>>
    {
        public async Task<ResponseViewModel<UserAuthBase>> Handle(LogInCommand request, CancellationToken cancellationToken)
        {
            var manager = new SecurityManager(jwtSettings);

            var person = await personRepository.GetByEmail(request.Email, cancellationToken);

            if (person is null)
            {
                return ResponseViewModel<UserAuthBase>.Fail($"No user with email {request.Email} found");
            }

            if (!secretHasher.Verify(request.Password, person.PasswordHash))
            {
                return ResponseViewModel<UserAuthBase>.Fail($"Incorrect password");
            }

            var auth = manager.BuildUserAuthObject(person.Id, person.Email, person.FullName);

            return ResponseViewModel<UserAuthBase>.Success(auth);
        }
    }
}
