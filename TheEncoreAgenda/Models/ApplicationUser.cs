using Microsoft.AspNetCore.Identity;

namespace TheEncoreAgenda.Models
{
    public class ApplicationUser : IdentityUser
    {
        public virtual List<Audio>? Audios { get; set; }
        public virtual List<Comment>? Comments { get; set; }
        public virtual List<Vote>? Votes { get; set; }
        public virtual List<CalendarEvent>? CalendarEvents { get; set; }
    }
}