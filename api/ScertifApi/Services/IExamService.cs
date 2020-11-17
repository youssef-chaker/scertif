using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using ScertifApi.Models;

namespace ScertifApi.Services
{
    public interface IExamService
    {
        public Task<List<dynamic>> GetExams();
        public Task<ExamModel> GetExam(string exam);
        // public Task<List<dynamic>> GetExamsOnly();
        public Task<List<SearchModel>> searchExam(string search);

        public Task ReportQuestion(ReportModel report);
    }
}