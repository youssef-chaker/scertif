using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using ScertifApi.Models;

namespace ScertifApi.Services
{
    public class CommentService : ICommentService
    {
        private readonly IMongoCollection<CommentModel> _commentsCollection;

        public CommentService(IMongoClient client)
        {
            var db = client.GetDatabase("scertif");
            _commentsCollection = db.GetCollection<CommentModel>("comments");
        }

        public Task AddComment(CommentModel comment)
        {
            return _commentsCollection.InsertOneAsync(comment);
        }

        public Task DeleteComment(string id) {
            return _commentsCollection.DeleteOneAsync(c => c.Id.Equals(id));
        }

        public Task UpdateComment(string id , CommentModel comment) {
            comment.Id = id;
            return _commentsCollection.ReplaceOneAsync(c => c.Id.Equals(id), comment); 
        }

        public async Task<CommentModel> GetComment(string id ) {
            return await _commentsCollection.Find(c => c.Id.Equals(id)).FirstAsync();
        }

        public async Task<IEnumerable<CommentModel>> GetComments(string exam, string question)
        {
            List<CommentModel> comments =  await _commentsCollection.
                                                    Find(c => c.Exam.Equals(exam) && c.Question.Equals(question)).ToListAsync();

            List<CommentModel> nestedComments = new List<CommentModel>();

            foreach (var comment in comments)
            {
                if(comment.Parent is null) {
                    nestedComments.Add(nestComments(comment, comments));
                }
            }

            return nestedComments;
        }

        private CommentModel nestComments(CommentModel comment,List<CommentModel> comments) {
            if(comment is null) {
                return null;
            }
            // comments.Remove(comment);
            foreach(var c in comments ) {
                if(comment.Id.Equals(c.Parent)) {
                    if (comment.Comments is null)
                    {
                        comment.Comments = new List<CommentModel>();
                    }
                    comment.Comments.Add(nestComments(c,comments));
                }
            }
            return comment;
        }

    }
}