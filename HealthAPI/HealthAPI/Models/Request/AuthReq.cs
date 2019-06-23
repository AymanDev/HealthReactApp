using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Runtime.Serialization;

namespace HealthAPI.Models
{
    [DataContract]
    public class AuthReq
    {
        [DataMember]
        public string login { get; set; }
        [DataMember]
        public string pass { get; set; }
    }
}