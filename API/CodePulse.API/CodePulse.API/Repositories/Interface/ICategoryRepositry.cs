using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepositry
    {

        Task<Category> CreateAsync( Category category);

        Task<IEnumerable<Category>> GetAllAsync();

    }
}
