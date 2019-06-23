using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace HealthAPI.Models
{
    [DataContract]
    public class CreateInspectionReq
    {
        [DataMember]
        public string clientId { get; set; }

        [DataMember]
        public DateTime fullDate { get; set; }

        [DataMember]
        public string description { get; set; }

        [DataMember]
        public string diseaseId { get; set; }
        [DataMember]
        public string userId { get; set; }
    }
}