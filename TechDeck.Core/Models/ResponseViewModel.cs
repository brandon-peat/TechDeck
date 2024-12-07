namespace TechDeck.Core.Models
{
    public record ResponseViewModel
    {
        public bool IsSuccess { get; }
        public string? ErrorMessage { get; }

        protected ResponseViewModel()
        {
            IsSuccess = true;
            ErrorMessage = null;
        }

        protected ResponseViewModel(string errorMessage)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
        }

        public static ResponseViewModel Success() => new();
        public static ResponseViewModel Fail(string errorMessage) => new(errorMessage);
    }

    public record ResponseViewModel<T> : ResponseViewModel
    {
        public T? Value { get; }

        protected ResponseViewModel(T data) : base()
        {
            Value = data;
        }

        protected ResponseViewModel(string errorMessage) : base(errorMessage) { }

        public static ResponseViewModel<T> Success(T data) => new(data);
        public static new ResponseViewModel<T> Fail(string errorMessage) => new(errorMessage);
    }
}