using System;
using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name = "disease")]
    public class Disease
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name = "diseaseid")]
        public string Diseaseid { get; set; }

        [Column(Name = "diseaseDescription")]
        public DateTime StartDate { get; set; }

        [Column(Name = "endDate")]
        public DateTime EndDate { get; set; }

        [Column(Name = "homeless")]
        public string Homeless { get; set; }

        [Column(Name = "description")]
        public string Description { get; set; }

        [Column(Name = "treatment")]
        public string Treatment { get; set; }
    }
}