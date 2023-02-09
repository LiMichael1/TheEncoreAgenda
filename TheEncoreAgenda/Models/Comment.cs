using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheEncoreAgenda.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        [Required]
        [ForeignKey("Audio")]
        public int AudioId { get; set; }

        [ForeignKey("User")]
        public string? UserId { get; set; }
        public string Message { get; set; } = String.Empty;

        public Audio? Audio { get; set; }

        public ApplicationUser? User { get; set; }
    }
}
