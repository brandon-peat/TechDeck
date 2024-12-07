namespace TechDeck.Identity.Models
{
    public record JwtSettings(
        string Key,
        string Issuer,
        string Audience,
        int MinutesToExpiration);
}
