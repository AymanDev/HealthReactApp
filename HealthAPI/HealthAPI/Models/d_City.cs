using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name = "d_city")]
    public class d_City
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name = "name")]
        public string Name { get; set; }
        
        [Column(Name = "district")]
        public string District { get; set; }
    }
}