using System.Threading.Tasks;
using MongoDB.Bson;
using ScertifApi.Models;

namespace ScertifApi.Services
{
    public interface IUserService
    {
        public Task<dynamic> CreateUser(UserModel user);
        public Task<dynamic> Authenticate(AuthenticateModel user);
        public Task<UserModel> GetUser(ObjectId id);
        public Task<bool> PatchUser(ObjectId id);
    }
}