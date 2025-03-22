using MediatR;
using TechDeck.Core.Files;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record UploadProfilePictureCommand(
        Stream ImageStream)
        : IRequest<ResponseViewModel>;

    public class UploadProfilePictureCommandHandler(
        IFileManager fileManager,
        IAuthenticatedUserService authenticatedUserService)
        : IRequestHandler<UploadProfilePictureCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(UploadProfilePictureCommand request, CancellationToken cancellationToken)
        {
            await fileManager.UploadFile(
                "profile-pictures",
                authenticatedUserService.PersonId.ToString()!,
                request.ImageStream,
                cancellationToken);

            return ResponseViewModel.Success();
        }
    }
} 