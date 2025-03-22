using MediatR;
using TechDeck.Core.Files;
using TechDeck.Core.Identity;
using TechDeck.Core.Models;

namespace TechDeck.Core.People
{
    public record UploadBannerCommand(
        Stream ImageStream)
        : IRequest<ResponseViewModel>;

    public class UploadBannerCommandHandler(
        IFileManager fileManager,
        IAuthenticatedUserService authenticatedUserService)
        : IRequestHandler<UploadBannerCommand, ResponseViewModel>
    {
        public async Task<ResponseViewModel> Handle(UploadBannerCommand request, CancellationToken cancellationToken)
        {
            await fileManager.UploadFile(
                "banners",
                authenticatedUserService.PersonId.ToString()!,
                request.ImageStream,
                cancellationToken);

            return ResponseViewModel.Success();
        }
    }
} 