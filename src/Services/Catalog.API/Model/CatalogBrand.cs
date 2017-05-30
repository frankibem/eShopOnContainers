using System.ComponentModel.DataAnnotations;

namespace Catalog.API.Model
{
    public class CatalogBrand
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Brand { get; set; }
    }
}
