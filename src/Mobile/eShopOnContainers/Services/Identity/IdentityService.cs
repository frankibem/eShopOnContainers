using IdentityModel.Client;
using System;
using System.Collections.Generic;

namespace eShopOnContainers.Services.Identity
{
    public class IdentityService : IIdentityService
    {
        public string CreateAuthorizationRequest()
        {
            // Create URI to authorization endpoint
            var authorizeRequest = new AuthorizeRequest(GlobalSetting.Instance.IdentityEndpoint);            

            // Dictionary with values for requeset
            var dic = new Dictionary<string, string>();
            dic.Add("client_id", "xamarin");
            dic.Add("response_type", "id_token token");
            dic.Add("scope", "openid profile basket orders");
            dic.Add("redirect_url", GlobalSetting.Instance.IdentityCallback);
            dic.Add("nonce", Guid.NewGuid().ToString("N"));

            // Add CSRF token to protect against cross-site request forgery attacks
            var currentCSRFToken = Guid.NewGuid().ToString("N");
            dic.Add("state", currentCSRFToken);

            var authorizeUri = authorizeRequest.Create(dic);
            return authorizeUri;
        }

        public string CreateLogoutRequest(string token)
        {
            if(string.IsNullOrEmpty(token))
            {
                return string.Empty;
            }

            return $"{GlobalSetting.Instance.LogoutEndpoint}?id_token_hint={token}&post_logout_redirect_uri={GlobalSetting.Instance.LogoutCallback}";
        }
    }
}
