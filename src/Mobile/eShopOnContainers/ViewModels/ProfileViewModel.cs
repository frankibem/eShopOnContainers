﻿using eShopOnContainers.Extensions;
using eShopOnContainers.Helpers;
using eShopOnContainers.Models.Orders;
using eShopOnContainers.Models.User;
using eShopOnContainers.Services.Order;
using eShopOnContainers.ViewModels.Base;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace eShopOnContainers.ViewModels
{
    public class ProfileViewModel : ViewModelBase
    {
        private ObservableCollection<Order> _orders;

        private IOrderService _orderService;

        public ProfileViewModel(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public ObservableCollection<Order> Orders
        {
            get { return _orders; }
            set
            {
                _orders = value;
                RaisePropertyChanged(() => Orders);
            }
        }

        public ICommand LogoutCommand => new Command(async () => await LogoutAsync());

        public ICommand OrderDetailCommand => new Command<Order>(async (order) => await OrderDetailAsync(order));

        public override async Task InitializeAsync(object navigationData)
        {
            IsBusy = true;

            // Get orders
            var authToken = Settings.AuthAccessToken;
            var orders = await _orderService.GetOrdersAsync(authToken);
            Orders = orders.ToObservableCollection();

            IsBusy = false;
        }

        private async Task LogoutAsync()
        {
            IsBusy = true;

            // Logout
            await NavigationService.NavigateToAsync<LoginViewModel>(new LogoutParameter { Logout = true });
            await NavigationService.RemoveBackStackAsync();

            IsBusy = false;
        }

        private async Task OrderDetailAsync(Order order)
        {
            await NavigationService.NavigateToAsync<OrderDetailViewModel>(order);
        }
    }
}
