using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace HealthAPI.Models
{
    [DataContract]
    public class CreateClientReq
    {
        [DataMember]
        public string surname { get; set; }

        [DataMember]
        public string name { get; set; }

        [DataMember]
        public string patronymicName { get; set; }

        [DataMember]
        public DateTime birthDate { get; set; }

        [DataMember]
        public string gender { get; set; }

        [DataMember]
        public string cityid { get; set; }

        [DataMember]
        public string addres { get; set; }

        [DataMember]
        public string passserial { get; set; }

        [DataMember]
        public string passnumber { get; set; }

        [DataMember]
        public string passplace { get; set; }

        [DataMember]
        public DateTime passdate { get; set; }

        [DataMember]
        public string insurance { get; set; }

        [DataMember]
        public string snils { get; set; }

        public string[] chronic { get; set; }

        public string[] allergy { get; set; }
    }
}