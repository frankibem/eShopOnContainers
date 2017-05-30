using eShopOnContainers.Models.Basket;
using System.Threading.Tasks;

namespace eShopOnContainers.Services.Basket
{
    public interface IBasketService
    {
        Task<CustomerBasket> GetBasketAsync(string guidUser, string token);
        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket, string token);
        Task ClearBasketAsync(string guidUser, string token);
    }
}
