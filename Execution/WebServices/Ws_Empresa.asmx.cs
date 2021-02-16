using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using Execution.Clases;

namespace Execution.WebServices
{
    /// <summary>
    /// Summary description for Ws_Empresa
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Ws_Empresa : System.Web.Services.WebService
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["ConexionSql"]);
        DataSet ds = new DataSet();

        public class ListaEmpresas
        {
            public int EmpresaId { get; set; }
            public string Empresa { get; set; }
        }

        [WebMethod]
        public List<ListaEmpresas> GetListaEmpresas()
        {
            ds.Tables.Clear();
            Cl_Empresa clEmpresa = new Cl_Empresa();
            ds = clEmpresa.GetListaEmpresas();
            List<ListaEmpresas> Datos = new List<ListaEmpresas>();


            foreach (DataRow dr in ds.Tables["DATOS"].Rows)
            {
                ListaEmpresas Registro = new ListaEmpresas();
                Registro.EmpresaId = Convert.ToInt32(dr["EmpresaId"]);
                Registro.Empresa = dr["Empresa"].ToString();
                Datos.Add(Registro);
            }
            return Datos;
        }
    }
}
