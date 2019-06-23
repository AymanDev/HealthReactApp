using System;
using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name ="vaccine")]
    public class Vaccine
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name ="vaccineName")]
        public string VaccineName { get; set; }

        [Column(Name ="vaccineDate")]
        public DateTime VaccineDate { get; set; }

        [Column(Name = "clientId")]
        public string ClientId { get; set; }
    }
}