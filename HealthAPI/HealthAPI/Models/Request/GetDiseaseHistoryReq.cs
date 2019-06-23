using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace HealthAPI.Models
{
    [DataContract]
    public class GetDiseaseHistoryReq
    {
        [DataMember]
        public string clientId{ get; set; }
    }
}