using MediatR;
using TechDeck.Core.Files;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record CreatePostCommand(
        string Text,
        List<Stream> Streams)
        : IRequest<ResponseViewModel>;

    public class CreatePostCommandHandler(
        IPostRepository postRepository,
        IAuthenticatedUserService service,
        IFileManager fileManager)
        : IRequestHandler<CreatePostCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            if (request.Streams.Count > 3)
            {
                throw new ArgumentException("Maximum 3 attachments.");
            }

            List<Guid> fileNames = [];
            foreach (var stream in request.Streams)
            {
                var fileName = Guid.NewGuid();
                await fileManager.UploadFile("attachments", fileName + ".jpeg", stream, cancellationToken);
                fileNames.Add(fileName);
            }

            var post = new Post
            {
                PersonId = service.PersonId!.Value,
                Text = request.Text,
                Attachments = fileNames.Select(name => new Attachment { Name = name }).ToList()
            };
            await postRepository.Create(post, cancellationToken);

            return ResponseViewModel.Success();
        }
    }
}
