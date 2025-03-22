using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static TechDeck.Core.People.EmailIsInUseQuery;

namespace TechDeck.Core.People
{
    public record GetNameQuery(int PersonId) : IRequest<string>;

    public class GetNameQueryHandler(IPersonRepository repository) : IRequestHandler<GetNameQuery, string>
    {
        public async Task<string> Handle(GetNameQuery request, CancellationToken cancellationToken) =>
            await repository.GetName(request.PersonId, cancellationToken);
    }
}