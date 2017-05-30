using eShopOnContainers.ViewModels;
using eShopOnContainers.ViewModels.Base;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace eShopOnContainers.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MainView : TabbedPage
    {
        public MainView()
        {
            InitializeComponent();
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            MessagingCenter.Subscribe<MainViewModel, int>(this, MessageKeys.ChangeTab, (sender, args) =>
            {
                switch (args)
                {
                    case 0:
                        CurrentPage = HomeView;
                        break;
                    case 1:
                        CurrentPage = ProfileView;
                        break;
                    case 2:
                        CurrentPage = BasketView;
                        break;
                }
            });

            await ((CatalogViewModel)HomeView.BindingContext).InitializeAsync(null);
            await ((BasketViewModel)BasketView.BindingContext).InitializeAsync(null);
            await ((ProfileViewModel)ProfileView.BindingContext).InitializeAsync(null);
        }

        protected override async void OnCurrentPageChanged()
        {
            base.OnCurrentPageChanged();

            if (CurrentPage is BasketView)
            {
                // Force basket view refresh every time we access it
                await (BasketView.BindingContext as ViewModelBase).InitializeAsync(null);
            }
        }
    }
}