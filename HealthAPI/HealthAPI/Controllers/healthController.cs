using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Configuration;
using System.Data.SqlClient;
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
        public IHttpActionResult GetClient([FromBody]ClientReq clientReq)
        {
            if (clientReq == null || clientReq.snils == null) return BadRequest("Parameters is empty");

            Client client = (from c in dc.GetTable<Client>()
                          where c.Snils == clientReq.snils
                          select c).FirstOrDefault();
            return Json(client);
        }

        [HttpPut]
        public IHttpActionResult CreateIsnpection([FromBody]CreateInspectionReq createInspectionReq)
        {
            if (createInspectionReq == null) return BadRequest("Parameters is empty");
            Inspection inspection = new Inspection
            {
                ClientId = createInspectionReq.clientId,
                Id = Guid.NewGuid().ToString(),
                FullDate = createInspectionReq.fullDate,
                Userid = createInspectionReq.userId,
                Diagnosis = createInspectionReq.diagnosis,
                Description = createInspectionReq.description
            };
            try
            {
                dc.GetTable<Inspection>().InsertOnSubmit(inspection);
                dc.SubmitChanges();
                return Ok();
            }
            catch
            {
                return InternalServerError();
            }
        }

    }
}