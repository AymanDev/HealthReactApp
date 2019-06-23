using System.Data.Linq.Mapping;

namespace HealthAPI.Models
{
    [Table(Name ="user")]
    public class User
    {
        [Column(IsPrimaryKey = true)]
        public string Id { get; set; }
        [Column(Name = "login")]
        public string Login { get; set; }
        [Column(Name = "pass")]
        public string Password { get; set; }
        [Column(Name = "surname")]
        public string Surname { get; set; }
        [Column(Name = "name")]
        public string Name { get; set; }
        [Column(Name = "patronymicName")]
        public string PatronymicName { get; set; }
        [Column(Name = "position")]
        public string Position { get; set; }
        [Column(Name = "admin")]
        public bool Admin { get; set; }
    }
}