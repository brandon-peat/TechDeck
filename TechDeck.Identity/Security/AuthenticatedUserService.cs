using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using TechDeck.Core.Identity;

namespace TechDeck.Identity.Security
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
        {
            ArgumentNullException.ThrowIfNull(httpContextAccessor);

            var token = httpContextAccessor.HttpContext!.Request.Headers.Authorization.ToString();

            if (!string.IsNullOrWhiteSpace(token))
            {
                var handler = new JwtSecurityTokenHandler();

                var jsonToken = handler.ReadJwtToken(token.Substring(7));

                PersonId = Convert.ToInt32(jsonToken.Claims.Single(claim => claim.Type == "id").Value);
                Email = jsonToken.Claims.Single(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;
                Name = jsonToken.Claims.Single(claim => claim.Type == "name").Value;
                IsAuthenticated = true;
            }
        }

        public bool IsAuthenticated { get; }
        public int? PersonId { get; }
        public string? Email { get; }
        public string? Name { get; }
    }
}
