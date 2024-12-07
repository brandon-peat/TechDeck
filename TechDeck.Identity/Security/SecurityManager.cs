using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TechDeck.Identity.Models;

namespace TechDeck.Identity.Security
{
    // Based on https://app.pluralsight.com/library/courses/angular-security-json-web-tokens-dot-net-five/exercise-files
    public class SecurityManager(JwtSettings jwtSettings)
    {
        public UserAuthBase BuildUserAuthObject(int userId, string email, string fullName)
        {
            var token = BuildJwtToken(userId, email, fullName);

            return new UserAuthBase(userId, email, token, true, []);
        }

        protected string BuildJwtToken(int userId, string userName, string fullName)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));

            List<Claim> jwtClaims = [
                new(JwtRegisteredClaimNames.Sub, userName),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new("name", fullName),
                new("id", userId.ToString())
            ];

            var token = new JwtSecurityToken(
                issuer: jwtSettings.Issuer,
                audience: jwtSettings.Audience,
                claims: jwtClaims,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(jwtSettings.MinutesToExpiration),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token); ;
        }
    }
}
