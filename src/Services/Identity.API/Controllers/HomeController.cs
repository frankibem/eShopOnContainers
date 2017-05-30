using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IdentityServer4.Services;
using Microsoft.Extensions.Options;
using Identity.API.Services;
using Identity.API.Models;

namespace Identity.API.Controllers
{
    public class HomeController : Controller
    {
        private readonly IIdentityServerInteractionService _interaction;
        private IOptionsSnapshot<AppSettings> _settings;
        private readonly IRedirectService _redirectService;

        public HomeController(IIdentityServerInteractionService interaction, IOptionsSnapshot<AppSettings> settings, IRedirectService redirectSvc)
        {
            _interaction = interaction;
            _settings = settings;
            _redirectService = redirectSvc;
        }

        public IActionResult Index(string returnUrl)
        {
            return View();
        }

        public IActionResult ReturnToOriginalApplication(string returnUrl)
        {
            if (returnUrl != null)
                return Redirect(_redirectService.ExtractRedirectUriFromReturnUrl(returnUrl));
            else
                return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> Error(string errorId)
        {
            var vm = new ErrorViewModel();
            var message = await _interaction.GetErrorContextAsync(errorId);

            if (message != null)
                vm.Error = message;

            return View("Error", vm);
        }
    }
}
