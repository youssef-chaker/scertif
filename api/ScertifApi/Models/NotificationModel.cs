namespace ScertifApi.Models
{
    public class NotificationModel
    {
        public string message { get; set; }
        public string link { get; set; }

        public NotificationModel(string message , string link)
        {
            this.link = link;
            this.message = message;
        }
    }
}