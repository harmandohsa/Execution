using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using Execution.Clases;

namespace Execution.WebServices
{
    /// <summary>
    /// Summary description for Ws_Login
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Ws_Login : System.Web.Services.WebService
    {

        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["ConexionSql"]);
        DataSet ds = new DataSet();

        [WebMethod]
        public int ExisteUsuarioClaveEmpresa(string Usuario, string Clave)
        {
            try
            {
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_ExisteUsuarioEmpresa", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@Usuario", SqlDbType.VarChar).Value = Usuario;
                Comando.Parameters.Add("@Clave", SqlDbType.VarChar).Value = Clave;
                Comando.Parameters.Add("@Resul", SqlDbType.Int).Direction = ParameterDirection.Output;
                Comando.ExecuteNonQuery();
                int Respuesta = Convert.ToInt32(Comando.Parameters["@Resul"].Value);
                cn.Close();
                return Respuesta;

            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public class DatosUsuario
        {
            public int UsuarioId { get; set; }
            public string Nombre { get; set; }
            public int PerfilId { get; set; }
            public string Correo { get; set; }
            public string Usuario { get; set; }
            public string Clave { get; set; }
            public int CambiaClave { get; set; }
            public int EstatusUsuario { get; set; }
        }

        [WebMethod]
        public List<DatosUsuario> GetDatosUsuario(string Usuario)
        {
            ds.Tables.Clear();
            Cl_Usuarios clUsuarios = new Cl_Usuarios();
            Ws_Generales wsGenerales = new Ws_Generales();
            ds = clUsuarios.GetDatosUsuario(Usuario);
            List<DatosUsuario> Datos = new List<DatosUsuario>();


            foreach (DataRow dr in ds.Tables["DATOS"].Rows)
            {
                DatosUsuario Registro = new DatosUsuario();
                Registro.UsuarioId = Convert.ToInt32(dr["UsuarioId"]);
                Registro.Nombre = dr["Nombre"].ToString();
                Registro.PerfilId = Convert.ToInt32(dr["PerfilId"]);
                Registro.CambiaClave = Convert.ToInt32(dr["CambiaClave"]);
                Registro.Correo = dr["Correo"].ToString();
                Registro.Clave = wsGenerales.Decrypt(dr["Clave"].ToString());
                Registro.EstatusUsuario = Convert.ToInt32(dr["EstatusId"]);
                Datos.Add(Registro);
            }
            return Datos;
        }



    }
}
