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
            this._historyCollection = db.GetCollection<PassedExamModel>("history");
        }
        public Task<List<PassedExamModel>> getHistory(string userId = null, string examId = null)
        {
            if(userId is null && examId is null) {
                return _historyCollection.Find<PassedExamModel>(Builders<PassedExamModel>.Filter.Empty).ToListAsync();
            } else if(userId is null) {
                return _historyCollection.Find<PassedExamModel>(e => e.ExamId.Equals(examId)).ToListAsync();
            } else {
                return _historyCollection.Find<PassedExamModel>(e => e.UserId.Equals(userId)).ToListAsync();
            }
        }

        public async Task addHistory(PassedExamModel passedExamModel) {
            await _historyCollection.InsertOneAsync(passedExamModel);
        }
    }
}