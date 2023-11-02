using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogPostRepositry
    {

        Task<BlogPost> CreateAsync(BlogPost blogPost);

        Task<IEnumerable<BlogPost>> GetAllAsync();


    }
}
