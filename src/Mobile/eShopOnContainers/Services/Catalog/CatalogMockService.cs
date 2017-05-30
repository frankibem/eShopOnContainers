﻿using System.Collections.ObjectModel;
using System.Threading.Tasks;
using eShopOnContainers.Models.Catalog;
using Xamarin.Forms;
using System.Linq;
using eShopOnContainers.Extensions;

namespace eShopOnContainers.Services.Catalog
{
    public class CatalogMockService : ICatalogService
    {
        private ObservableCollection<CatalogBrand> MockCatalogBrand = new ObservableCollection<CatalogBrand>
        {
            new CatalogBrand { Id = 1, Brand = "Azure" },
            new CatalogBrand { Id = 2, Brand = "Visual Studio" }
        };

        private ObservableCollection<CatalogType> MockCatalogType = new ObservableCollection<CatalogType>
        {
            new CatalogType { Id = 1, Type = "Mug" },
            new CatalogType { Id = 2, Type = "T-Shirt" }
        };

        private ObservableCollection<CatalogItem> MockCatalog = new ObservableCollection<CatalogItem>
        {
            new CatalogItem { Id = Common.Common.MockCatalogItemId01, PictureUri = Device.RuntimePlatform != Device.Windows ? "fake_product_01.png" : "Assets/fake_product_01.png", Name = ".NET Bot Blue Sweatshirt (M)", Price = 19.50M, CatalogBrandId = 2, CatalogBrand = "Visual Studio", CatalogTypeId = 2, CatalogType = "T-Shirt" },
            new CatalogItem { Id = Common.Common.MockCatalogItemId02, PictureUri = Device.RuntimePlatform != Device.Windows ? "fake_product_02.png" : "Assets/fake_product_02.png", Name = ".NET Bot Purple Sweatshirt (M)", Price = 19.50M, CatalogBrandId = 2, CatalogBrand = "Visual Studio", CatalogTypeId = 2, CatalogType = "T-Shirt" },
            new CatalogItem { Id = Common.Common.MockCatalogItemId03, PictureUri = Device.RuntimePlatform != Device.Windows ? "fake_product_03.png" : "Assets/fake_product_03.png", Name = ".NET Bot Black Sweatshirt (M)", Price = 19.95M, CatalogBrandId = 2, CatalogBrand = "Visual Studio", CatalogTypeId = 2, CatalogType = "T-Shirt" },
            new CatalogItem { Id = Common.Common.MockCatalogItemId04, PictureUri = Device.RuntimePlatform != Device.Windows ? "fake_product_04.png" : "Assets/fake_product_04.png", Name = ".NET Black Cupt", Price = 17.00M, CatalogBrandId = 2, CatalogBrand = "Visual Studio", CatalogTypeId = 1, CatalogType = "Mug" },
            new CatalogItem { Id = Common.Common.MockCatalogItemId05, PictureUri = Device.RuntimePlatform != Device.Windows ? "fake_product_05.png" : "Assets/fake_product_05.png", Name = "Azure Black Sweatshirt (M)", Price = 19.50M, CatalogBrandId = 1, CatalogBrand = "Azure", CatalogTypeId = 2, CatalogType = "T-Shirt" }
        };

        public async Task<ObservableCollection<CatalogItem>> FilterAsync(int catalogBrandId, int catalogTypeId)
        {
            await Task.Delay(500);

            return MockCatalog
                .Where(c => c.CatalogBrandId == catalogBrandId && c.CatalogTypeId == catalogTypeId)
                .ToObservableCollection();
        }

        public async Task<ObservableCollection<CatalogItem>> GetCatalogAsync()
        {
            await Task.Delay(500);
            return MockCatalog;
        }

        public async Task<ObservableCollection<CatalogBrand>> GetCatalogBrandAsync()
        {
            await Task.Delay(500);
            return MockCatalogBrand;
        }

        public async Task<ObservableCollection<CatalogType>> GetCatalogTypeAsync()
        {
            await Task.Delay(500);
            return MockCatalogType;
        }
    }
}
