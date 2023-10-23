

using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{

    public class CategoryRepositry : ICategoryRepositry
    {
        private readonly ApplicationDbContext dbContext;

        public CategoryRepositry(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

         public async Task<Category> CreateAsync(Category category)
         {
             await dbContext.Categories.AddAsync(category);// talk to db
             await dbContext.SaveChangesAsync(); // save changes to Db
             return category;
         }
    }
}
