using System.Text.RegularExpressions;

namespace Identity.API.Services
{
    public class RedirectService : IRedirectService
    {
        public string ExtractRedirectUriFromReturnUrl(string url)
        {
            var result = "";
            var decodedUrl = System.Net.WebUtility.HtmlDecode(url);
            var results = Regex.Split(decodedUrl, "redirect_uri=");

            if (result.Length < 2)
                return "";
            result = results[1];

            var splitKey = "";
            if (result.Contains("signin-oidc"))
                splitKey = "signin-oidc";
            else
                splitKey = "scope";

            results = Regex.Split(result, splitKey);
            if (result.Length < 2)
                return "";
            result = results[0];

            return result.Replace("%3A", ":")
                .Replace("%2F", "/")
                .Replace("&", "");
        }
    }
}
