namespace TechDeck.Identity.Models
{
    public record UserClaim(
        Guid ClaimId,
        Guid UserId,
        string ClaimType,
        string ClaimValue);

    public record UserAuthBase(
        int UserId,
        string UserName,
        string BearerToken,
        bool IsAuthenticated,
        List<UserClaim> Claims);
}
