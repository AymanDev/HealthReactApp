using System;
using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name = "disease")]
    public class Disease
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name = "startDate")]
        public DateTime StartDate { get; set; }

        [Column(Name = "endDate")]
        public DateTime EndDate { get; set; }

        [Column(Name = "homeless")]
        public bool Homeless { get; set; }

        [Column(Name = "description")]
        public string Description { get; set; }

        [Column(Name = "userId")]
        public string UserId { get; set; }

        [Column(Name = "clientId")]
        public string ClientId { get; set; }

        [Column(Name = "diseaseTypeId")]
        public string DiseaseTypeId { get; set; }
    }
}