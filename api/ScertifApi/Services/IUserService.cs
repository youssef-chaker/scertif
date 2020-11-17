using System.Threading.Tasks;
using MongoDB.Bson;
using ScertifApi.Models;

namespace ScertifApi.Services
{
    public interface IUserService
    {
        public Task<TokenModel> CreateUser(UserModel user);
        public Task<TokenModel> Authenticate(AuthenticateModel user);
        public Task<UserModel> GetUser(ObjectId id);
        public Task<bool> PatchUser(ObjectId id);
    }
}