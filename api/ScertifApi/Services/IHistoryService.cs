using System.Collections.Generic;
using ScertifApi.Models;
using System.Threading.Tasks;

namespace ScertifApi.Services
{
    public interface IHistoryService
    {
        Task<List<PassedExamModel>> GetHistory(string userId=null, string examId = null);
        Task AddHistory(PassedExamModel passedExamModel);
        Task<PassedExamModel> GetLatestHistory(string userId, string examId);
    }
}