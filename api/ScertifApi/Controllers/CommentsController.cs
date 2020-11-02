using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScertifApi.Services;
using ScertifApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;

namespace ScertifApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentsController(ICommentService commentService) {
            this._commentService = commentService;
        }

        [HttpPost]
        [Authorize]
        [AllowAnonymous]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddComment([FromBody] CommentModel comment) {
            if(comment is null) return BadRequest();
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }
            await _commentService.AddComment(comment);
            return  new ObjectResult(comment);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(string id) {
            CommentModel comment = await _commentService.GetComment(id);
            if( HttpContext.User.FindFirstValue(ClaimTypes.Role).Equals("user") && !comment.UserId.Equals(id)) {
                return Unauthorized(new { message = "user is not the owner of the comment" });
            }
            await _commentService.DeleteComment(id);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment(string id , [FromBody] CommentModel comment) {
            CommentModel c = await _commentService.GetComment(id);
            if(HttpContext.User.FindFirstValue(ClaimTypes.Role).Equals("user") && !c.UserId.Equals(id)) {
                return Unauthorized(new { message = "user is not the owner of the comment" });
            }
            await _commentService.UpdateComment(id,comment);
            return Ok(comment);
        }

        [HttpGet("{exam}/{question}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetComments(string exam , string question) {
            IEnumerable<CommentModel> comments =  await _commentService.GetComments(exam, question);
            return Ok(comments);
        } 

    }
}