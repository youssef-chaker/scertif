using System.Collections.Generic;
using ScertifApi.Models;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ScertifApi.Services {
    public class HistoryService : IHistoryService
    {
        private readonly IMongoCollection<PassedExamModel> _historyCollection;

        public HistoryService(IMongoClient mongoClient)
        {
            var db = mongoClient.GetDatabase("scertif");
            _historyCollection = db.GetCollection<PassedExamModel>("history");
        }
        public Task<List<PassedExamModel>> GetHistory(string userId = null, string examId = null)
        {
            if(userId is null && examId is null) {
                return _historyCollection.Find(Builders<PassedExamModel>.Filter.Empty).ToListAsync();
            } 
            if(userId is null) {
                return _historyCollection.Find(e => e.ExamId.Equals(examId)).ToListAsync();
            }

            return _historyCollection.Find(e => e.UserId.Equals(userId)).ToListAsync();
        }


        public Task<PassedExamModel> GetLatestHistory(string userId, string examId)
        {
            if (userId is null || examId is null)
            {
                return null;
            }

            return _historyCollection.Find(e => e.UserId.Equals(userId) && e.ExamId.Equals(examId))
                .FirstOrDefaultAsync();
        }

        public async Task AddHistory(PassedExamModel passedExamModel) {
            passedExamModel.Date = System.DateTime.Now;
            await _historyCollection.InsertOneAsync(passedExamModel);
        }
    }
}