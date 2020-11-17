using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ScertifApi.Models
{
    public class ExamModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("provider")]
        public string Provider { get; set; }
        [BsonElement("exam")]
        [BsonRequired]
        public string Name { get; set; }
        [BsonElement("questions")]
        [BsonRequired]
        public List<QuestionModel> Questions { get; set; }
    }
}