using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScertifApi.Services;
using ScertifApi.Models;
using System.Linq;

namespace ScertifApi.Controllers {

    [Route("/api/[controller]")]
    [ApiController]
    public class HistoryController : ControllerBase {

        private readonly IHistoryService _historyService;

        public HistoryController(IHistoryService historyService) {
            _historyService = historyService;
        }

        [Authorize(Roles = "admin,moderator")]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> GetHistory()
        {
            return Ok(await _historyService.GetHistory());
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetHistory(string userId)
        {
            return Ok(await _historyService.GetHistory(userId: userId));
        }

        [AllowAnonymous]
        [HttpGet("{userId}/{examId}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetHistory(string userId , string examId)
        {
            return Ok(await _historyService.GetHistory(userId:userId , examId : examId));
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        /// {
        ///     "ExamId" : "5f8d98015f561d24267dd00a",
        ///     "UserId" : "5f9e7f7b3931c850d03596c5",
        ///     "Results" : [
        ///     {
        ///         "Question" : "5fb4e7db0e54dbc533d95eae",
        ///         "correctAnswers" : ["D"],
        ///         "Answers" : ["A"],
        ///        "Correct" : false
        ///     },
        ///     {
        ///         "Question" : "5fb4e7db0e54dbc533d95eaf",
        ///         "correctAnswers" : ["D"],
        ///         "Answers" : ["E"],
        ///         "Correct" : false
        ///     },
        ///     {
        ///         "Question" : "5fb4e7db0e54dbc533d95eb0",
        ///         "correctAnswers" : ["A","E"],
        ///         "Answers" : ["B","C"],
        ///         "Correct" : false
        ///     },
        ///     {
        ///         "Question" : "5fb4e7db0e54dbc533d95eb1",
        ///         "correctAnswers" : ["B"],
        ///         "Answers" : ["A"],
        ///         "Correct" : false
        ///     }
        ///     ]
        /// }
        ///
        /// </remarks>
        
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> AddHistory([FromBody] PassedExamModel passedExamModel) {
            if(!ModelState.IsValid) {
                return BadRequest("invalid exam");
            }
            if(passedExamModel is null) {
                return BadRequest("bitch this shit is null !");
            }

            var latestResults = (await _historyService.GetLatestHistory(passedExamModel.UserId, passedExamModel.ExamId))?.Results;
            await _historyService.AddHistory(passedExamModel);
            if(latestResults is null) return Ok();
            int trueFalse = 0,falseFalse = 0,falseTrue = 0;
            foreach (var question in passedExamModel.Results)
            {
                var history = latestResults.FirstOrDefault(q => q.Question.Equals(question.Question));
                if (history != null)
                {
                    if (question.Correct && !history.Correct) trueFalse++;
                    else if (!question.Correct && !history.Correct ) falseFalse++;
                    else if (!question.Correct && history.Correct) falseTrue++;
                } 
            }
            return new ObjectResult(new
            {
                trueFalse,
                falseFalse,
                falseTrue
            });
            
        }

    }

}