using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;

namespace Execution.WebServices
{
    /// <summary>
    /// Summary description for WS_Usuarios
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WS_Usuarios : System.Web.Services.WebService
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["ConexionSql"]);
        DataSet ds = new DataSet();

        [WebMethod]
        public int ExisteCorreo(string Correo)
        {
            try
            {
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_ExisteCorreo", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@correo", SqlDbType.VarChar, 200).Value = Correo;
                Comando.Parameters.Add("@Resul", SqlDbType.Int).Direction = ParameterDirection.Output;

                Comando.ExecuteNonQuery();
                int Respuesta = Convert.ToInt32(Comando.Parameters["@Resul"].Value);
                cn.Close();

                return Respuesta;
            }
            catch (Exception)
            {
                return -1;
            }

        }

        [WebMethod]
        public string InsertUsuario(string Nombres, string Apellidos, string Correo, int EmpresaId)
        {
            try
            {
                Ws_Generales wsGenerales = new Ws_Generales();
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_Insert_Usuario", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@Nombres", SqlDbType.VarChar, 200).Value = Nombres;
                Comando.Parameters.Add("@Apellidos", SqlDbType.VarChar, 200).Value = Apellidos;
                Comando.Parameters.Add("@Correo", SqlDbType.VarChar, 200).Value = Correo;
                Comando.Parameters.Add("@Clave", SqlDbType.VarChar, 500).Value = wsGenerales.Encrypt(wsGenerales.GeneraClave());
                Comando.Parameters.Add("@EmpresaId", SqlDbType.Int).Value = EmpresaId;

                Comando.ExecuteNonQuery();
                cn.Close();

                return "";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


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

        [WebMethod]
        public string EditClave(int UsuarioId, string Clave, int CambiaClave)
        {
            try
            {
                Ws_Generales wsGenerales = new Ws_Generales();
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_ChangeClave", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@UsuarioId", SqlDbType.Int).Value = UsuarioId;
                Comando.Parameters.Add("@Clave", SqlDbType.VarChar, 200).Value = wsGenerales.Encrypt(Clave);
                Comando.Parameters.Add("@CambiaClave", SqlDbType.Int).Value = CambiaClave;
                Comando.ExecuteNonQuery();
                cn.Close();

                return "";

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [WebMethod]
        public int ExisteUsuario(string Usuario)
        {
            try
            {
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_ExisteUsuarioNew", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@Usuario", SqlDbType.VarChar, 200).Value = Usuario.Trim();
                Comando.Parameters.Add("@Resul", SqlDbType.Int).Direction = ParameterDirection.Output;

                Comando.ExecuteNonQuery();
                int Respuesta = Convert.ToInt32(Comando.Parameters["@Resul"].Value);
                cn.Close();

                return Respuesta;
            }
            catch (Exception ex)
            {
                string Err = ex.Message;
                return -1;
            }

        }

    }
}
