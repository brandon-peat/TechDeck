namespace TechDeck.Core.Identity
{
    public interface ISecretHasher
    {
        public string Hash(string input);
        public bool Verify(string input, string hashString);
    }
}
