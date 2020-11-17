using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace ScertifApi.Models
{
    [BsonIgnoreExtraElements]
    public class QuestionModel
    {
        [BsonElement("qid")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("question")]
        [BsonRequired]
        public string Question { get; set; }
        [BsonElement("choices")]
        [BsonRequired]
        public List<string> choices { get; set; }
        [BsonElement("correctAnswers")]
        [BsonRequired]
        public List<string> correctAnswers { get; set; }
    }
}