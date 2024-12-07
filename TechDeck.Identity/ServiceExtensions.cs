using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TechDeck.Core.Identity;
using TechDeck.Identity.Security;

namespace TechDeck.Identity
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddIdentityLayer(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            services.AddTransient<ISecretHasher, SecretHasher>();
            services.AddScoped<IAuthenticatedUserService, AuthenticatedUserService>();

            return services;
        }
    }
}
