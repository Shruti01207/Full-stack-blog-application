﻿using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepositry blogPostRepositry;

        public BlogPostsController(IBlogPostRepositry blogPostRepositry)
        {
            this.blogPostRepositry = blogPostRepositry;
        }


        [HttpPost]
        public async Task<IActionResult> CreateBlogPost([FromBody] CreateBlogPostRequestDto request)
        {

            var blogPost = new BlogPost
            {
                Title = request.Title,
                ShortDescription = request.ShortDescription,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                UrlHandle = request.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible

            };

            await blogPostRepositry.CreateAsync(blogPost);

            var response = new BlogPostDto
            {
                Id=blogPost.Id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                UrlHandle = blogPost.UrlHandle,
                PublishedDate = request.PublishedDate,
                Author = request.Author,
                IsVisible = request.IsVisible

            };

            return Ok(response);

        }

        [HttpGet]

        public async Task<IActionResult> getBlogs()
        {
            var blogPosts = await blogPostRepositry.GetAllAsync();

            var response = new List<BlogPostDto>( );

            foreach(var blogPost in blogPosts)
            {
                response.Add(new BlogPostDto
                {
                    Id=blogPost.Id,
                    Title = blogPost.Title,
                    ShortDescription=blogPost.ShortDescription,
                    Content=blogPost.Content,
                    FeaturedImageUrl=blogPost.FeaturedImageUrl,
                    UrlHandle=blogPost.UrlHandle,
                    PublishedDate=blogPost.PublishedDate,
                    Author=blogPost.Author,
                    IsVisible=blogPost.IsVisible,
                });
            }

            return Ok(response);

        }



    }
}
