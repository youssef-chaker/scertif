using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using ScertifApi.Services;
using ScertifApi.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace ScertifApi.Controllers
{
        
    [Route("/api/[controller]")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly IExamService _examService ;
        private readonly IDistributedCache _cache;
        
        public ExamsController(IExamService examService,IDistributedCache cache)
        {
            _examService = examService;
            _cache = cache;
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetExams()
        {
            string cachedExams = await _cache.GetStringAsync("exams");
            if (cachedExams is null)
            {
                var exams = await _examService.GetExams();
                var options = new DistributedCacheEntryOptions();
                options.AbsoluteExpirationRelativeToNow =TimeSpan.FromMinutes(60);
                _ = _cache.SetStringAsync("exams", JsonSerializer.Serialize(exams),options);
                return new ObjectResult(exams);
            }
            
            return new ObjectResult(await _cache.GetStringAsync("exams"));
        }
        
        [AllowAnonymous]
        [HttpGet("search/{search}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> SearchExam(string search)
        {
            return Ok(await _examService.searchExam(search));
        }

        [AllowAnonymous]
        [HttpGet("{exam}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetExam(string exam)
        {
            return new ObjectResult(await _examService.GetExam(exam));
        }

        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "user": 5fb41f617c0f3e72f61b9ea4,
        ///        "exam": "5fb41f617c0f3e72f61b9ea4",
        ///        "question": 5fb41f617c0f3e72f61b9ea4,
        ///         "message" : "bla bla bla"
        ///     }
        ///
        /// </remarks>

        [AllowAnonymous]
        [HttpPost("report")]
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> Report([FromBody]ReportModel reportModel) {
            if(!ModelState.IsValid) {
                return BadRequest("unvalid report");
            }
            await _examService.ReportQuestion(reportModel);
            return new ObjectResult(reportModel);
        }


        
        // [AllowAnonymous]
        // [HttpGet("examsonly")]
        // [ProducesResponseType(200)]
        // [ProducesResponseType(404)]
        // public async Task<IActionResult> getExamsOnly() {
        //     return Ok(
        //         await _examService.GetExamsOnly()
        //     );
        // }

    }
}