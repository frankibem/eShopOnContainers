using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using eShopOnContainers.Models.Catalog;
using eShopOnContainers.Services.RequestProvider;
using eShopOnContainers.Extensions;
using eShopOnContainers.Helpers;

namespace eShopOnContainers.Services.Catalog
{
    public class CatalogService : ICatalogService
    {
        private readonly IRequestProvider _requestProvider;

        public CatalogService(IRequestProvider requestProvider)
        {
            _requestProvider = requestProvider;
        }

        public async Task<ObservableCollection<CatalogItem>> FilterAsync(int catalogBrandId, int catalogTypeId)
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.CatalogEndpoint);
            builder.Path = $"api/v1/catalog/items/type/{catalogTypeId}/brand/{catalogBrandId}";
            string uri = builder.ToString();

            CatalogRoot catalog = await _requestProvider.GetAsync<CatalogRoot>(uri);

            return catalog?.Data?.ToObservableCollection() ?? new ObservableCollection<CatalogItem>();
        }

        public async Task<ObservableCollection<CatalogItem>> GetCatalogAsync()
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.CatalogEndpoint);
            builder.Path = "api/v1/catalog/items";
            string uri = builder.ToString();

            CatalogRoot catalog = await _requestProvider.GetAsync<CatalogRoot>(uri);

            if (catalog?.Data != null)
            {
                ServicesHelper.FixCatalogItemPictureUrl(catalog.Data);
                return catalog.Data.ToObservableCollection<CatalogItem>();
            }
            else
            {
                return new ObservableCollection<CatalogItem>();
            }
        }

        public async Task<ObservableCollection<CatalogBrand>> GetCatalogBrandAsync()
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.CatalogEndpoint);
            builder.Path = "api/v1/catalog/catalogbrands";
            string uri = builder.ToString();

            IEnumerable<CatalogBrand> brands = await _requestProvider.GetAsync<IEnumerable<CatalogBrand>>(uri);
            return brands?.ToObservableCollection() ?? new ObservableCollection<CatalogBrand>();
        }

        public async Task<ObservableCollection<CatalogType>> GetCatalogTypeAsync()
        {
            UriBuilder builder = new UriBuilder(GlobalSetting.Instance.CatalogEndpoint);
            builder.Path = "api/v1/catalog/catalogtypes";
            string uri = builder.ToString();

            IEnumerable<CatalogType> types = await _requestProvider.GetAsync<IEnumerable<CatalogType>>(uri);
            return types?.ToObservableCollection() ?? new ObservableCollection<CatalogType>();
        }
    }
}
