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
        [BsonElement("answers")]      
        public string[] Answers { get; set; }
        [BsonRequired]
        [BsonElement("correctAnswers")]      
        public string[] CorrectAnswers { get; set; }
        [BsonElement("correct")]
        [Required]
        public bool Correct { get; set; }
    } 
}