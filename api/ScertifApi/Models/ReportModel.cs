using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ScertifApi.Models
{
    public class ReportModel
    {
        
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("exam")]
        [BsonRequired]
        [Required(ErrorMessage = "exam field is required")]
        public string Exam { get; set; }
        [Required(ErrorMessage = "question field is required")]
        [BsonElement("question")]
        [BsonRequired]
        public string Question { get; set; }
        [BsonRequired]
        [Required(ErrorMessage = "user field is required")]

        [BsonElement("user")]
        public string User { get; set; }
        [Required(ErrorMessage = "message field is required")]
        [BsonElement("message")]
        [BsonRequired]
        public string Message { get; set; }     
    }
}

