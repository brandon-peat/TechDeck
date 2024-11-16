namespace TechDeck.Core.Models
{
    public record ResponseViewModel
    {
        public bool IsSuccess { get; }
        public string? ErrorMessage { get; }

        private ResponseViewModel()
        {
            IsSuccess = true;
            ErrorMessage = null;
        }

        private ResponseViewModel(string errorMessage)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
        }

        public static ResponseViewModel Success() => new();
        public static ResponseViewModel Fail(string errorMessage) => new(errorMessage);
    }
}