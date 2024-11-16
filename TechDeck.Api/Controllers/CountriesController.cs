using Microsoft.AspNetCore.Mvc;
using TechDeck.Api.Responses;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController() : ControllerBase
    {
        private readonly List<DropdownViewModel> _countries = [
            new(1, "England"),
            new(2, "Wales"),
            new(3, "Scotland"),
            new(4, "Northern Ireland")
        ];

        [HttpGet]
        public IEnumerable<DropdownViewModel> Get() => _countries;
    }
}
