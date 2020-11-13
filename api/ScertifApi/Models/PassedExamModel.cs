using System.Collections.Generic;
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ScertifApi.Models
{
    public class PassedExamModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("userId")]
        [BsonRequired]
        public string UserId { get; set; }
        [BsonElement("examId")]
        [BsonRequired]
        public string ExamId { get; set; }
        [BsonElement("date")]
        public DateTime Date { get; set; }
        [BsonRequired]
        public List<QuestionResultsModel> Results { get; set; }
    }
}