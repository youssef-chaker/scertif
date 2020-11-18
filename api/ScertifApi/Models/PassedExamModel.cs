using System.Collections.Generic;
using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ScertifApi.Models
{
    [BsonIgnoreExtraElements]   
    public class PassedExamModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("userId")]
        [BsonRequired]
        [Required]
        public string UserId { get; set; }
        [BsonElement("examId")]
        [BsonRequired]
        [Required]
        public string ExamId { get; set; }
        [BsonElement("date")]
        public BsonDateTime Date { get; set; }
        [BsonRequired]
        [BsonElement("results")]
        [Required]
        public List<QuestionResultsModel> Results { get; set; }
    }
}