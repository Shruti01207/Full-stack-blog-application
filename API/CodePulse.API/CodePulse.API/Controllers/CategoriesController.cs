﻿using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
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
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
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
    }
}
