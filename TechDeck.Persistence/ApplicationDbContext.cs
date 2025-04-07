using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TechDeck.Core.People;

namespace TechDeck.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { } // This is here for unit testing
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public virtual required DbSet<Person> People { get; set; }
        public virtual required DbSet<Post> Post { get; set; }
        public virtual required DbSet<Like> Like { get; set; }
        public virtual required DbSet<Reply> Reply { get; set; }
        public virtual required DbSet<Attachment> Attachment { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
