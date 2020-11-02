using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScertifApi.Services;

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
        [HttpGet("{exam}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetExam(string exam)
        {
            return new ObjectResult(await _examService.GetExam(exam));
        }
        
    }
}