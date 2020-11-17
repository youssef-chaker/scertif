using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ScertifApi.Models
{
    public class SearchModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("exam")]
        public string Exam { get; set; }
    }
}