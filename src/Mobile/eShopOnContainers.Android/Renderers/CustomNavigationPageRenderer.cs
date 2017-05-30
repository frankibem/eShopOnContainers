using Android.Views;
using Android.Widget;
using Xamarin.Forms.Platform.Android.AppCompat;

namespace eShopOnContainers.Droid.Renderers
{
    public class CustomNavigationPageRenderer : NavigationPageRenderer
    {
        protected override void OnLayout(bool changed, int l, int t, int r, int b)
        {
            base.OnLayout(changed, l, t, r, b);

            var toolbar = FindViewById<Android.Support.V7.Widget.Toolbar>(Resource.Id.toolbar);
            if (toolbar != null)
            {
                var image = toolbar.FindViewById<ImageView>(Resource.Id.toolbar_image);
                if (Element.CurrentPage == null)
                {
                    return;
                }

                if (!string.IsNullOrEmpty(Element.CurrentPage.Title))
                    image.Visibility = ViewStates.Invisible;
                else
                    image.Visibility = ViewStates.Visible;
            }
        }
    }
}