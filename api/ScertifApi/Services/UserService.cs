using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;
using ScertifApi.Models;
using ScertifApi.utils;

namespace ScertifApi.Services
{
    public class UserService : IUserService
    {
        private IMongoCollection<UserModel> _usersCollection;
        private IConfiguration _configuration;

        public UserService(IMongoClient client,IConfiguration configuration)
        {
            
            var db = client.GetDatabase("scertif");
            _usersCollection = db.GetCollection<UserModel>("users");
            _configuration = configuration;
        }

        public async Task<dynamic> CreateUser(UserModel user)
        {
            user = Authentication.UserWithHashedPasswordAndSalt(user);
            await _usersCollection.InsertOneAsync(user);
            return GenerateToken(user);
        }

        public async Task<dynamic> Authenticate(AuthenticateModel model)
        {
            var user =  await _usersCollection.Find(u =>
                u.Email.Equals(model.UsernameOrEmail) || u.Username.Equals(model.UsernameOrEmail)).Limit(1).SingleOrDefaultAsync();
            if (user is null) return new {message = "user does not exist"};
            if (Authentication.CheckPassword(model.Password, user.Password, user.Salt))
            {
                return GenerateToken(user);
            }

            return new {message = "incorrect password"};
        }

        private dynamic GenerateToken(UserModel user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name , user.Username),
                new Claim(ClaimTypes.NameIdentifier , user.Id.ToString()),
                //nbf = not before
                new Claim(JwtRegisteredClaimNames.Nbf,new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp,new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
                new Claim(ClaimTypes.Role , user.Role?? "user")
            };

            var token = new JwtSecurityToken(
                new JwtHeader(
                    new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.Unicode.GetBytes(_configuration["secretKey"])), SecurityAlgorithms.HmacSha256)
                ),
                new JwtPayload(claims)
            );
            var output = new
            {
                username = user.Username,
                id = user.Id.ToString(),
                token = new JwtSecurityTokenHandler().WriteToken(token)
            };
            return output;
        }

        public Task<UserModel> GetUser(ObjectId id)
        {
            return _usersCollection.Find(u => u.Id == id ).Limit(1).SingleOrDefaultAsync();
        }

        //todo
        public Task<bool> PatchUser(ObjectId id)
        {
            var filter = Builders<UserModel>.Filter.Eq("_id", id);
            var update = Builders<UserModel>.Update.Set("w","w");
            // _usersCollection.UpdateOne()
            return null;
        }
    }
}