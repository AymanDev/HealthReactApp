using System;
using System.Linq;
using System.Web.Http;
using System.Configuration;
using System.Data.Linq;
using HealthAPI.Models;
using System.Web.Http.Cors;

namespace HealthAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HealthController : ApiController
    {
        DataContext dc = new DataContext(ConfigurationManager.ConnectionStrings["BaseConnection"].ConnectionString);

        [HttpPost]
        public IHttpActionResult Auth([FromBody]AuthReq authReq)
        {
            if(authReq == null || authReq.login == null || authReq.pass == null) return BadRequest("Parameters is empty");
            User user = (from u in dc.GetTable<User>()
                       where u.Login == authReq.login && u.Password == authReq.pass
                       select u).FirstOrDefault();
            return Json(user);
        }

        [HttpPost]
        public IHttpActionResult GetClient([FromBody]GetClientReq req)
        {
            if (req == null || req.snils == null) return BadRequest("Parameters is empty");

            var client = (from c in dc.GetTable<Client>()
                          where c.Snils == req.snils
                          join ci in dc.GetTable<d_City>() on c.Cityid equals ci.Id
                          select new
                          {
                              c.Id,
                              c.Surname,
                              c.Name,
                              c.PatronymicName,
                              BirthDate = c.BirthDate.Date.ToString(),
                              City = ci.Name,
                              c.Addres,
                              c.Gender,
                              c.PassSerial,
                              c.PassNumber,
                              PassDate = c.PassDate.Date.ToString(),
                              c.PassPlace,
                              c.Insurance,
                              c.Snils
                          }).FirstOrDefault();

            if (client == null) return Json(client);
            var chronicMass = (from c in dc.GetTable<Chronic>()
                               where c.ClientId == client.Id
                               join t in dc.GetTable<d_DiseaseType>() on c.ChronicDiseaseTypeId equals t.Id
                               select t.diseaseName).ToArray();
            var allergyMass = (from a in dc.GetTable<Allergy>()
                               where a.ClientId == client.Id
                               select a.AlergyName).ToArray();
            
            var diseaseMass = (from d in dc.GetTable<Disease>()
                               where d.ClientId == client.Id
                               join t in dc.GetTable<d_DiseaseType>() on d.DiseaseTypeId equals t.Id
                               orderby d.EndDate descending
                               select new
                               {
                                   Name = t.diseaseName,
                                   EndDate = d.EndDate.Date.ToString(),
                                   d.Description
                               }).ToArray();
            var vaccineMass = (from v in dc.GetTable<Vaccine>()
                              where v.ClientId == client.Id
                              select new
                              {
                                  v.VaccineName,
                                  VaccineDate = v.VaccineDate.Date.ToString()
                              }).ToArray();
            return Json(new { client = client, allergy = allergyMass, disease = diseaseMass, chronic = chronicMass, vaccine = vaccineMass});
        }

        [HttpPost]
        public IHttpActionResult CreateIsnpection([FromBody]CreateInspectionReq req)
        {
            if (req == null) return BadRequest("Parameters is empty");
            Inspection inspection = new Inspection
            {
                ClientId = req.clientId,
                Id = Guid.NewGuid().ToString(),
                FullDate = req.fullDate,
                Userid = req.userId,
                Description = req.description,
                Diseaseid = req.diseaseId
            };
            try
            {
                dc.GetTable<Inspection>().InsertOnSubmit(inspection);
                dc.SubmitChanges();
                return Ok();
            }
            catch
            {
                return BadRequest("Create isnpection error");
            }
        }

        [HttpPost]
        public IHttpActionResult CreateClient([FromBody]CreateClientReq req)
        {
            if (req == null) return BadRequest();
            Client client = new Client
            {
                Id = Guid.NewGuid().ToString(),
                Surname = req.surname,
                Name = req.name,
                PatronymicName = req.patronymicName,
                BirthDate = req.birthDate,
                Gender = req.gender,
                PassSerial = req.passserial,
                PassNumber = req.passnumber,
                PassDate = req.passdate,
                PassPlace = req.passplace,
                Cityid = req.cityid,
                Addres = req.addres,
                Insurance = req.insurance,
                Snils = req.snils
            };
            dc.GetTable<Client>().InsertOnSubmit(client);
            if (req.chronic.Any())
            {
                foreach (var ch in req.chronic)
                {
                    Chronic chronic = new Chronic
                    {
                        Id = Guid.NewGuid().ToString(),
                        ChronicDiseaseTypeId = ch,
                        ClientId = client.Id
                    };
                    dc.GetTable<Chronic>().InsertOnSubmit(chronic);
                }
            }
            if (req.allergy.Any())
            {
                foreach(var al in req.allergy)
                {
                    Allergy allergy = new Allergy
                    {
                        Id = Guid.NewGuid().ToString(),
                        AlergyName = al,
                        ClientId = client.Id
                    };
                    dc.GetTable<Allergy>().InsertOnSubmit(allergy);
                }
            }
            try
            {
                dc.SubmitChanges();
                return Json(client.Id);
            }
            catch
            {
                return BadRequest("Create client error");
            }
        }

        [HttpPost]
        public IHttpActionResult GetDiseaseHistory([FromBody]GetDiseaseHistoryReq req)
        {
            var inspectionMass = (from i in dc.GetTable<Inspection>()
                                  where i.ClientId == req.clientId
                                  select i).ToArray();
            if(inspectionMass.Any())
            {
                var disease = (from d in dc.GetTable<Disease>()
                               where "23b0c6d9-336d-4b9c-ae5a-484ab27c08af" == "23b0c6d9-336d-4b9c-ae5a-484ab27c08af"
                               join dt in dc.GetTable<d_DiseaseType>() on d.DiseaseTypeId equals dt.Id
                               select new
                                {
                                    d.Id,
                                   StartDate = d.StartDate.Date.ToString(),
                                   EndDate = d.EndDate.Date.ToString(),
                                   d.Description,
                                   d.Homeless,
                                   dt.diseaseName
                               }).First();
                return Json(new { disease, inspection = inspectionMass });
            }
            return Json(inspectionMass);
        }

        //public IHttpActionResult CloseDisease()
        //{

        //}
    }
}