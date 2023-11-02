using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepositry
    {

        Task<Category> CreateAsync(Category category);

        Task<IEnumerable<Category>> GetAllAsync();

        // if the item with particular id is not found in the Db, then return null
        Task<Category?> GetById(Guid id);

        Task<Category?> UpdateAsync(Category category);

        Task<Category?> DeleteAsync(Guid id);

    }
}
