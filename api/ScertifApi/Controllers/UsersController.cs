using System;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using ScertifApi.Models;
using ScertifApi.Services;
using MongoDB.Bson;
using System.Text.Json;

namespace ScertifApi.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model is null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            UserModel user = new UserModel
            {
                Email = model.Email,
                Username = model.Username,
                Password = model.Password,
                Role = "user"
            };
            try
            {
                var usernameToken = await _userService.CreateUser(user);
                return new ObjectResult(usernameToken);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("authenticate")]
        [AllowAnonymous]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateModel model)
        {
            if (model is null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                var obj = await _userService.Authenticate(model);
                return new ObjectResult(obj);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // [AllowAnonymous]
        // [HttpPatch("{id}")]
        // public async Task<IActionResult> Update(string id , [FromBody] JsonPatchDocument<UserModel> model)
        // {
        //     if (model is null) return BadRequest();
        //     var user = await _userService.GetUser(ObjectId.Parse(id));
        //     Console.WriteLine(JsonSerializer.Serialize(model));
        //     if (user is null) return BadRequest(new {message="user does not exist"});
        //     return new ObjectResult(model);
        // }

        [HttpGet("validate")]
        [Authorize]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public IActionResult Valid() {
            return Ok(new
            {
                id = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier),
                role = HttpContext.User.FindFirstValue(ClaimTypes.Role)
            });
        }
    }
}