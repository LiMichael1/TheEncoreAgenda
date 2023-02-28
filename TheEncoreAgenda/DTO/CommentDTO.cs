namespace TheEncoreAgenda.DTO
{
	public class CommentDTO
	{
		public int CommentId { get; set; }
		public int AudioId { get; set; }
		public string? UserName { get; set; }
		public string Message { get; set; } = String.Empty;
	}
}
