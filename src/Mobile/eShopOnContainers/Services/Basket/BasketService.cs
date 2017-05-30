using System;
using System.Threading.Tasks;
using eShopOnContainers.Models.Basket;
using eShopOnContainers.Services.RequestProvider;
using eShopOnContainers.Helpers;

namespace eShopOnContainers.Services.Basket
{
    public class BasketService : IBasketService
    {
        private readonly IRequestProvider _requestProvider;

        public BasketService(IRequestProvider requestProvider)
        {
            _requestProvider = requestProvider;
        }

        public async Task ClearBasketAsync(string guidUser, string token)
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.BasketEndpoint);
            builder.Path = guidUser;
            string uri = builder.ToString();

            await _requestProvider.DeleteAsync(uri, token);
        }

        public async Task<CustomerBasket> GetBasketAsync(string guidUser, string token)
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.BasketEndpoint);
            builder.Path = guidUser;
            string uri = builder.ToString();

            CustomerBasket basket = await _requestProvider.GetAsync<CustomerBasket>(uri, token);
            ServicesHelper.FixBasketItemPictureUri(basket.Items);

            return basket;
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket, string token)
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.BasketEndpoint);
            string uri = builder.ToString();

            var result = await _requestProvider.PostAsync(uri, customerBasket, token);
            return result;
        }
    }
}
