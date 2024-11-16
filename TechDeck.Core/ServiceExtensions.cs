using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace TechDeck.Core
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCoreLayer(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            return services;
        }
    }
}
