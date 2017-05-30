using eShopOnContainers.Helpers;
using eShopOnContainers.Services.Navigation;
using eShopOnContainers.ViewModels.Base;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace eShopOnContainers
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class App : Application
    {
        public bool UseMockServices { get; set; }

        public App()
        {
            InitializeComponent();

            InitApp();

            if(Device.RuntimePlatform == Device.Windows)
            {
                InitNavigation();
            }
        }

        private void InitApp()
        {
            UseMockServices = Settings.UseMocks;
            ViewModelLocator.RegisterDependencies(UseMockServices);
        }

        private Task InitNavigation()
        {
            var navigationService = ViewModelLocator.Resolve<INavigationService>();
            return navigationService.InitializeAsync();
        }

        protected async override void OnStart()
        {
            base.OnStart();

            if(Device.RuntimePlatform != Device.Windows)
            {
                await InitNavigation();
            }
        }
    }
}