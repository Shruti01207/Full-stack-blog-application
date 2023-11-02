using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Implementation;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")] //attributes
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepositry categoryRepositry;


        // inject the db context class
        public CategoriesController(ICategoryRepositry categoryRepositry)
        {
            this.categoryRepositry = categoryRepositry;
        }


        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };
            // ef core will automatically assign unique id
            await categoryRepositry.CreateAsync(category);

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
            // never expose Domain model to client
        }


        [HttpGet]

        public async Task<IActionResult> GetCategories()
        {
            var categories = await categoryRepositry.GetAllAsync();
            var response = new List<CategoryDto>();

            foreach (var category in categories) {

                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle

                });
            }

            return Ok(response);

        }
        // GET: https://localhost:7157/api/categories/{id}
        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var existingCategory = await categoryRepositry.GetById(id);

            if (existingCategory == null)
                return NotFound();

            var response = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle
            };

            return Ok(response);

        }
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, [FromBody] UpdateCategoryRequestDto request)
        {
            var category = new Category
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle

            };

            var updatedCategory = await categoryRepositry.UpdateAsync(category);

            if (updatedCategory == null)
                return NotFound();


            var response = new CategoryDto
            {
                Id = updatedCategory.Id,
                Name = updatedCategory.Name,
                UrlHandle = updatedCategory.UrlHandle
            };

            return Ok(response);

        }

        [HttpDelete]
        [Route("{id:Guid}")]

        public async Task<IActionResult> DeleteCategory(Guid id)
        {
          var deletedCategory= await categoryRepositry.DeleteAsync(id);

            if (deletedCategory == null)
                return NotFound();

            //Convert Domain to DTO

            var response = new CategoryDto
            {
                Id = deletedCategory.Id,
                Name = deletedCategory.Name,
                UrlHandle = deletedCategory.UrlHandle
            };

            return Ok(response);
        }


    }


    
   

}
