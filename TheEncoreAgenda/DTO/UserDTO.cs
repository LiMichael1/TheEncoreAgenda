using TheEncoreAgenda.Models;

namespace TheEncoreAgenda.DTO
{
	public class UserDTO
	{
		public string? Id { get; set; }
		public string? UserName { get; set; } = String.Empty;
		public string? Email { get; set; } = String.Empty;
		public List<Audio>? Audios { get; set; }
	}
}
