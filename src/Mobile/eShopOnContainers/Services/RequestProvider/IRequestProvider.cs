﻿using System.Threading.Tasks;

namespace eShopOnContainers.Services.RequestProvider
{
    public interface IRequestProvider
    {
        Task<TResult> GetAsync<TResult>(string uri, string token = "");
        Task<TResult> PostAsync<TResult>(string uri, TResult data, string token = "", string header = "");
        Task DeleteAsync(string uri, string token = "");
    }
}
