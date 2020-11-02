using System.ComponentModel.DataAnnotations;

namespace ScertifApi.Models
{
    public class AuthenticateModel
    {
        [Required]
        public string UsernameOrEmail { get; set; }
        [Required]
        public string Password { get; set; }
    }
}