using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name = "d_diseaseType")]
    public class d_DiseaseType
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name = "diseaseName")]
        public string diseaseName { get; set; }
    }
}