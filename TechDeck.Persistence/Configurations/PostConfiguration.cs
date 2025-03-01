using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechDeck.Core.People;

namespace TechDeck.Persistence.Configurations
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.ToTable("Post", "Person");
            builder.HasKey(post => post.Id);

            builder
                .HasMany(post => post.Attachments)
                .WithOne()
                .HasForeignKey(attachment => attachment.PostId);

            builder.Navigation(post => post.Attachments).AutoInclude();
        }
    }
}
