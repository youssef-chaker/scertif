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
        public ExamService(IMongoClient client)
        {
            var db = client.GetDatabase("scertif");
            _examsCollection = db.GetCollection<ExamModel>("exams");
        }


        public Task<List<dynamic>> GetExams()
        {
            //OLD
            // db.exams.aggregate([
            // {$unwind:"$exams"},
            // {$project : {provider:1,exams:{ name:1,count: {$size :"$exams.questions" }} } },
            // {$group: {_id:"$provider",exams:{$push:"$exams"}} },
            // {$project: {_id:0,provider:"$_id",exams:"$exams"} }
            // ])
            
            //NEW
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

        // public Task<List<dynamic>> GetExamsOnly() {
        //     return _examsCollection
        //     .Find<ExamModel>(Builders<ExamModel>.Filter.Empty)
        //     .Project<dynamic>( Builders<ExamModel>.Projection.Exclude("_id").Include("provider").Include("exam"))
        //     .Sort(Builders<ExamModel>.Sort.Ascending("provider").Ascending("exam"))
        //     .ToListAsync();
        // }

        public Task<ExamModel> GetExam(string exam)
        {
            //OLD
            // db.exams.aggregate([
            // {$unwind:"$exams"},
            // {$match:{"exams.name":"MS-900"}},
            // {$project: {"questions":"$exams.questions"} }
            // ])
            
            //NEW
            // db.exams.aggregate([
            // {$match:{"exam":"MS-900"}},
            // {$project: {"questions":"$questions"} }
            // ])
            
            return _examsCollection.Aggregate<ExamModel>()
                .Match<ExamModel>(e => e.Name.Equals(exam))
                .FirstOrDefaultAsync();
        }

        public Task<List<SearchModel>> searchExam(string search) {
            System.Console.WriteLine("aaaaaaaaaaaaaaaaaaaaa");
            return _examsCollection.Find(Builders<ExamModel>.Filter.Text(search)).Project<SearchModel>(Builders<ExamModel>.Projection.Include(e => e.Name)).ToListAsync();
        }
    }
}