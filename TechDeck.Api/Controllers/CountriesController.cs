using Microsoft.AspNetCore.Mvc;
using TechDeck.Api.Responses;
using TechDeck.Core.Identity;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController(IAuthenticatedUserService service) : ControllerBase
    {
        private readonly List<DropdownViewModel> _countries = [
            new(1, "England"),
            new(2, "Wales"),
            new(3, "Scotland"),
            new(4, "Northern Ireland")
        ];

        [HttpGet]
        public IEnumerable<DropdownViewModel> Get()
        {
            if (!service.IsAuthenticated)
            {
                throw new ArgumentException("Unauthorised");
            }

            return _countries;
        }
    }
}
