using System.Collections.Generic;
using ScertifApi.Models;
using System.Threading.Tasks;

namespace ScertifApi.Services
{
    public interface IHistoryService
    {
        Task<List<PassedExamModel>> getHistory(string userId=null, string examId = null);
        Task addHistory(PassedExamModel passedExamModel);
    }
}