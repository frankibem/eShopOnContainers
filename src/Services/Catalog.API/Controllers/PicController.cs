using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Catalog.API.Controllers
{
    [Route("api/v1/[controller]")]
    public class PicController : Controller
    {
        private readonly IHostingEnvironment _env;

        public PicController(IHostingEnvironment env)
        {
            _env = env;
        }

        [HttpGet("{id}")]
        public IActionResult GetImage(int id)
        {
            var webroot = _env.WebRootPath;
            //var path = Path.Combine(webroot, id + ".png");
            var path = Path.Combine(_env.ContentRootPath, "Pics", id + ".png");

            var buffer = System.IO.File.ReadAllBytes(path);
            return File(buffer, "image/png");
        }
    }
}
