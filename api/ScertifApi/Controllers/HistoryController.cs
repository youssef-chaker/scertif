using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScertifApi.Services;
using ScertifApi.Models;

namespace ScertifApi.Controllers {

    [Route("/api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase {

        private readonly HistoryService _historyService;

        public HistoryController(HistoryService historyService) {
            this._historyService = historyService;
        }

        [Authorize(Roles = "admin,moderator")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> GetHistory()
        {
            return Ok(await _historyService.getHistory());
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetHistory(string userId)
        {
            return Ok(await _historyService.getHistory(userId: userId));
        }

        [AllowAnonymous]
        [HttpGet("{userId}/{examId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetHistory(string userId , string examId)
        {
            return Ok(await _historyService.getHistory(userId:userId , examId : examId));
        }

        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> addHistory([FromBody] PassedExamModel passedExamModel) {
            await _historyService.addHistory(passedExamModel);
            return Ok();
        }

    }

}