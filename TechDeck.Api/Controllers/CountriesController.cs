using Microsoft.AspNetCore.Mvc;

namespace TechDeck.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController() : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get() => ["England", "Wales", "Scotland", "Northern Ireland"];
    }
}
