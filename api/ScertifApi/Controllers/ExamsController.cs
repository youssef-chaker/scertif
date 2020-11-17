using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScertifApi.Services;
using ScertifApi.Models;

namespace ScertifApi.Controllers
{
        
    [Route("/api/[controller]")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly IExamService _examService ;
        
        public ExamsController(IExamService examService)
        {
            _examService = examService;
        }

        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetExams()
        {
            return new ObjectResult(await _examService.GetExams());
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

        [AllowAnonymous]
        [HttpPost("report")]
        [ProducesResponseType(201)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> report([FromBody]ReportModel reportModel) {
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