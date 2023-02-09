using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheEncoreAgenda.Models
{
    public enum Repeat { None, Daily, Weekly, Monthly, Yearly };

    public class CalendarEvent
    {
        //add location var later
        //maybe add flags for custom repeat

        [Key]
        public int Id { get; set; }

        public DateTime Start { get; set; } = DateTime.Now;
        public DateTime End { get; set; } = DateTime.Now;
        public bool AllDay { get; set; } = true;
        public bool IsPublic { get; set; } = false;
        public string? Title { get; set; } = String.Empty;
        public string? Description { get; set; } = String.Empty;
        public Repeat RepeatNum { get; set; } = Repeat.None;
        

        public List<ApplicationUser>? Users { get; set; }
    }
}
