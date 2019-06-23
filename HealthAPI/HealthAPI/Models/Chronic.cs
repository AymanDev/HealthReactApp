using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name ="chronic")]
    public class Chronic
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name = "chronicDiseaseTypeId")]
        public string ChronicDiseaseTypeId { get; set; }

        [Column(Name = "clientId")]
        public string ClientId { get; set; }
    }
}