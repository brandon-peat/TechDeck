using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TechDeck.Core.Identity;

namespace TechDeck.Identity.Security
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        public AuthenticatedUserService(IHttpContextAccessor httpContextAccessor)
        {
            ArgumentNullException.ThrowIfNull(httpContextAccessor);

            var httpContext = httpContextAccessor.HttpContext;
            if (httpContext?.User?.Identity?.IsAuthenticated == true)
            {
                var claimsPrincipal = httpContext.User;

                PersonId = Convert.ToInt32(claimsPrincipal.FindFirst("id")?.Value);
                Email = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
                Name = claimsPrincipal.FindFirst("name")?.Value;
                IsAuthenticated = true;
            }
        }

        public bool IsAuthenticated { get; }
        public int? PersonId { get; }
        public string? Email { get; }
        public string? Name { get; }
    }
}