using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ScertifApi.Models
{
    [BsonIgnoreExtraElements]
    public class UserModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("username")]
        public string Username { get; set; }
        [BsonElement("password")]
        public string Password { get; set; }
        [BsonElement("email")]
        public string Email { get; set; }
        [BsonElement("salt")]
        public string Salt { get; set; }
        [BsonElement("role")]
        public string Role { get; set; }
    }
}