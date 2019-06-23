using System;
using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name ="inspection")]
    public class Inspection
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name ="clientid")]
        public string ClientId { get; set; }

        [Column(Name = "fullDate")]
        public DateTime FullDate { get; set; }

        [Column(Name = "diseaseid")]
        public string Diseaseid { get; set; }

        [Column(Name = "description")]
        public string Description { get; set; }

        [Column(Name = "diagnosis")]
        public string Diagnosis { get; set; }

        [Column(Name = "treatment")]
        public string Treatment { get; set; }

        [Column(Name = "userid")]
        public string Userid { get; set; }

    }
}