using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
	private readonly DataContext _context;

	public BuggyController(DataContext context)
	{
		_context = context;
	}
	
	[HttpGet("auth")]
	[Authorize]
	public ActionResult<string> GetSecret()
	{
		return "secret text";
	}
	
	[HttpGet("not-found")]
	public ActionResult<AppUser> GetNotFound()
	{
		var thing = _context.Users.Find(-1);
		if (thing == null)
			return NotFound();
		return thing;
	}
	
	[HttpGet("server-error")]
	public ActionResult<string> GetServerError()
	{
	
			
		string thing = null;

		var thingToReturn = thing.ToString();

		return thingToReturn;
	
	}
	
	[HttpGet("bad-request")]
	public ActionResult<string> GetBadRequest()
	{
		return BadRequest("this is a bad request");
	}
}
