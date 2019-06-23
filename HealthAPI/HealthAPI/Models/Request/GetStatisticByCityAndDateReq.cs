using System;
using System.Runtime.Serialization;
namespace HealthAPI.Models
{
    [DataContract]
    public class GetStatisticByCityAndDateReq
    {
        [DataMember]
        public string cityId { get; set; }

        [DataMember]
        public string diseaseId { get; set; }

        [DataMember]
        public DateTime startDate { get; set; }

        [DataMember]
        public DateTime endDate { get; set; }
    }
}