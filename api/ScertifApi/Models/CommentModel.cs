using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ScertifApi.Models
{
    public class CommentModel
    {
        [BsonId] 
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public string UserId { get; set; }
        [BsonElement("parent")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Parent { get; set; }
        [BsonElement("comment")] 
        [Required]
        public string Comment { get; set; }
        [BsonElement("exam")]
        [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public string Exam { get; set; }
        [BsonElement("question")]
        [BsonRepresentation(BsonType.ObjectId)]
        [Required]
        public string Question { get; set; }
        [BsonIgnore]
        public List<CommentModel> Comments { get; set; }
    }
}