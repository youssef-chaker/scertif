using System.Threading.Tasks;
using ScertifApi.Models;
using System.Collections.Generic;

namespace ScertifApi.Services
{
    public interface ICommentService
    {
        public Task AddComment(CommentModel comment);
        public Task DeleteComment(string id);
        public Task UpdateComment(string id, CommentModel comment);
        public Task<CommentModel> GetComment(string id);

        public Task<IEnumerable<CommentModel>> GetComments(string exam, string question);
    }
}