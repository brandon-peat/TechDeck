namespace TechDeck.Core.Identity
{
    public interface IAuthenticatedUserService
    {
        bool IsAuthenticated { get; }
        int? PersonId { get; }
        string? Email { get; }
        string? Name { get; }
    }
}