using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static TechDeck.Core.People.EmailIsInUseQuery;

namespace TechDeck.Core.People
{
    public record EmailIsInUseQuery(string Email) : IRequest<bool>;

    public class EmailIsInUseQueryHandler(IPersonRepository repository) : IRequestHandler<EmailIsInUseQuery, bool>
    {
        public async Task<bool> Handle(EmailIsInUseQuery request, CancellationToken cancellationToken) =>
            await repository.IsEmailInUse(request.Email, cancellationToken);
    }
}