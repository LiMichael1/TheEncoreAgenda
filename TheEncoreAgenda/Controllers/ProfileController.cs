using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using TheEncoreAgenda.Data;
using TheEncoreAgenda.DTO;
using TheEncoreAgenda.Models;

namespace TheEncoreAgenda.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class ProfileController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public ProfileController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<ActionResult<UserDTO>> GetProfile()
		{
			string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

			UserDTO? user = await _context.Users
												  .Where(x => x.Id == userId)
												  .Select(x => new UserDTO
												  {
													  Id = x.Id,
													  UserName = x.UserName,
													  Email = x.Email,
													  Audios = x.Audios
												  })
												  .SingleOrDefaultAsync();

			if (user == null) return BadRequest("Missing User");

			return Ok(user);
		}

		[HttpPatch("username")]
		public async Task<ActionResult> ChangeUserName([FromBody]string userName) {
			return Ok(userName);

			//string? userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

			//ApplicationUser? user = await _context.Users.FindAsync(userId);

			//if(user == null) return BadRequest(user);

			//user.UserName = userName;
			
			//// Update DB set 
			//_context.Update(user);
			//// Save Changes on DB
			//await _context.SaveChangesAsync();

			//return Ok(user);
		}
	}
}
