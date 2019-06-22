using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{  
    [Table(Name = "Allergy")]
    public class Allergy
    {
        [Column(IsPrimaryKey =true)]
        public string Id { get; set; }

        [Column(Name ="clientid")]
        public string ClientId { get; set; }

        [Column(Name ="alergyName")]
        public string AlergyName { get; set; }
    }
}