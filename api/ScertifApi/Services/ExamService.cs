using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using ScertifApi.Models;

namespace ScertifApi.Services
{
    public class ExamService : IExamService
    {
        private readonly IMongoCollection<ExamModel> _examsCollection;
        private readonly IMongoCollection<ReportModel> _reportsCollection;
        public ExamService(IMongoClient client)
        {
            var db = client.GetDatabase("scertif");
            _examsCollection = db.GetCollection<ExamModel>("exams");
            _reportsCollection = db.GetCollection<ReportModel>("reports");
        }

        //todo : create DTOs insted of using dynamic
        public Task<List<dynamic>> GetExams()
        {
            // db.exams.aggregate([
            // {$project : {provider:1,exams:{ exam:"$exam",count: {$size :"$questions" }} } },
            // {$group:{_id:"$provider",exams:{$push:"$exams"}}},
            // {$project: {_id:0,provider:"$_id",exams:"$exams"} }
            // ])

            return _examsCollection.Aggregate<ExamModel>()
                .Project<dynamic>(new BsonDocument
                {
                    {"provider", 1},
                    {
                        "exams",
                        new BsonDocument {{"exam", "$exam"}, {"count", new BsonDocument {{"$size", "$questions"}}}}
                    }
                })
                .Group<dynamic>(new BsonDocument
                    {{"_id", "$provider"}, {"exams", new BsonDocument {{"$push", "$exams"}}}})
                .Project<dynamic>(new BsonDocument {{"_id", 0}, {"provider", "$_id"}, {"exams", "$exams"}})
                .ToListAsync();
        }
        public Task<ExamModel> GetExam(string exam)
        {
            // db.exams.aggregate([
            // {$match:{"exam":"MS-900"}},
            // {$project: {"questions":"$questions"} }
            // ])
            
            return _examsCollection.Aggregate<ExamModel>()
                .Match<ExamModel>(e => e.Name.Equals(exam))
                .FirstOrDefaultAsync();
        }

        public Task<List<SearchModel>> searchExam(string search) {
            return _examsCollection.Find(Builders<ExamModel>.Filter.Text(search)).Project<SearchModel>(Builders<ExamModel>.Projection.Include(e => e.Name)).ToListAsync();
        }

        public Task ReportQuestion(ReportModel report) {
            return _reportsCollection.InsertOneAsync(report);
        }
    }
}