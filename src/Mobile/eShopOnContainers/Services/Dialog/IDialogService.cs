using System.Threading.Tasks;

namespace eShopOnContainers.Services.Dialog
{
    public interface IDialogService
    {
        Task ShowAlertAsync(string message, string title, string buttonLabel);
    }
}
