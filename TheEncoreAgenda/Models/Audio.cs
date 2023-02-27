using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace TheEncoreAgenda.Models
{
    public class Audio
    {
        [Key]
        public int AudioId { get; set; }

        [ForeignKey("ApplicationUser")]
        public string? UserId { get; set; }

        [ForeignKey("CalendarEvent")] // LeaderBoard
        public int? CalendarEventId { get; set; }

        public string Song { get; set; } = String.Empty;

        [DisplayName("Artist")]
        public string OriginalArtist { get; set; } = String.Empty;

        [DisplayName("Submission Date")]
        public DateTime SubmittedOn { get; set; } = DateTime.Now;

        [DisplayName("Audio Path")]
        public string AudioPath { get; set; } = String.Empty;

        public int NumberOfLikes { get; set; } = 0;
        public int NumberOfDislikes { get; set; } = 0;

        public int Vote { get { return NumberOfLikes - NumberOfDislikes; } }

        public ApplicationUser? User { get; set; }
        public CalendarEvent? CalendarEvent { get; set; }

        public List<Vote>? Votes { get; set; }
        public List<Comment>? Comments { get; set; }

    }
}
