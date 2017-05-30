using eShopOnContainers.Helpers;
using eShopOnContainers.Models.Orders;
using eShopOnContainers.Services.Order;
using eShopOnContainers.ViewModels.Base;
using System;
using System.Threading.Tasks;

namespace eShopOnContainers.ViewModels
{
    public class OrderDetailViewModel : ViewModelBase
    {
        private IOrderService _ordersService;
        private Order _order;

        public OrderDetailViewModel(IOrderService ordersService)
        {
            _ordersService = ordersService;
        }

        public Order Order
        {
            get { return _order; }
            set
            {
                _order = value;
                RaisePropertyChanged(() => Order);
            }
        }

        public override async Task InitializeAsync(object navigationData)
        {
            if (navigationData is Order order)
            {
                IsBusy = true;

                // Get order detail info
                var authToken = Settings.AuthAccessToken;
                Order = await _ordersService.GetOrderAsync(Convert.ToInt32(order.OrderNumber), authToken);

                IsBusy = false;
            }
        }
    }
}
