using System;
using System.Security.Cryptography;
using System.Text;
using ScertifApi.Models;

namespace ScertifApi.utils
{
    public class Authentication
    {
        private static string SaltAndHashPassword(string password, string salt)
        {
            var sha = SHA256.Create();
            var saltedPassword = password + salt;
            return Convert.ToBase64String(sha.ComputeHash(Encoding.Unicode.GetBytes(saltedPassword)));
        }

        public static UserModel UserWithHashedPasswordAndSalt(UserModel user)
        {
            //generate random salt
            var rng = RandomNumberGenerator.Create();
            var saltBytes = new byte[16];
            rng.GetBytes(saltBytes);
            var saltText = Convert.ToBase64String(saltBytes);
            
            //generate the salted and hashed password
            user.Salt = saltText;
            user.Password = SaltAndHashPassword(user.Password, saltText);
            return user;
        }
        
        public static bool CheckPassword(string password, string hashedPassword , string salt)
        {
            return hashedPassword.Equals(SaltAndHashPassword(password, salt));
        }

    }
}