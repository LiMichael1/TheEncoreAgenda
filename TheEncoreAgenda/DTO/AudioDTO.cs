namespace TheEncoreAgenda.DTO
{
    public class AudioDTO
    {
        public int? AudioId { get; set; }
        public string? UserId { get; set; }
        public string? Song { get; set; } = String.Empty;
        public string? OriginalArtist { get; set; } = String.Empty;
        public DateTime? SubmittedOn { get; set; } = DateTime.Now;
        public string? AudioPath { get; set; } = String.Empty;
        public string? EventName { get; set; } = String.Empty;

        public int? NumberOfLikes { get; set; } = 0;
        public int? NumberOfDislikes { get; set; } = 0;

        public string? UserName { get; set; }

        //public ApplicationUser? User { get; set; }

        //public List<Vote>? Votes { get; set; }
        //public List<Comment>? Comments { get; set; }
    }
}
