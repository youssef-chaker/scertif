using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;


namespace ScertifApi.Models
{
    public class QuestionResultsModel
    {
        [BsonRequired]
        [Required]
        [BsonElement("question")]        
        public string Question { get; set; }
        [BsonRequired]
        [BsonElement("answers")]      
        public string[] Answers { get; set; }
        [BsonRequired]
        [BsonElement("correct")]      
        public string[] CorrectAnswers { get; set; }
    }
}