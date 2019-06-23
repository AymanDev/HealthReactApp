using System;
using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name ="client")]
    public class Client
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }

        [Column(Name ="surname")]
        public string Surname { get; set; }

        [Column(Name = "name")]
        public string Name { get; set; }

        [Column(Name = "patronymicName")]
        public string PatronymicName { get; set; }

        [Column(Name = "birthDate")]
        public DateTime BirthDate { get; set; }

        [Column(Name = "gender")]
        public string Gender { get; set; }

        [Column(Name = "cityid")]
        public string Cityid { get; set; }

        [Column(Name = "addres")]
        public string Addres { get; set; }

        [Column(Name = "passSerial")]
        public string PassSerial { get; set; }

        [Column(Name = "passNumber")]
        public string PassNumber { get; set; }

        [Column(Name = "passPlace")]
        public string PassPlace { get; set; }

        [Column(Name = "passDate")]
        public DateTime PassDate { get; set; }

        [Column(Name = "insurance")]
        public string Insurance { get; set; }

        [Column(Name = "snils")]
        public string Snils { get; set; }
    }
}