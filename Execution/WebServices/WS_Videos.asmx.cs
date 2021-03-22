using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Services;
using Execution.Clases;

namespace Execution.WebServices
{
    /// <summary>
    /// Summary description for WS_Videos
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WS_Videos : System.Web.Services.WebService
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["ConexionSql"]);
        DataSet ds = new DataSet();

        

        [WebMethod]
        public string GetListaVideos()
        {
            ds.Tables.Clear();
            Cl_Video clVideo = new Cl_Video();
            ds = clVideo.GetListaVideos();
            Dictionary<string, object> dict = new Dictionary<string, object>();
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in ds.Tables["DATOS"].Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in ds.Tables["DATOS"].Columns)
                    row.Add(col.ColumnName, dr[col]);
                rows.Add(row);
            }
            return serializer.Serialize(rows);
        }

        [WebMethod]
        public string GetListaVideosModulo(int ModuloId)
        {
            ds.Tables.Clear();
            Cl_Video clVideo = new Cl_Video();
            ds = clVideo.GetListaVideosModulo(ModuloId);
            Dictionary<string, object> dict = new Dictionary<string, object>();
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in ds.Tables["DATOS"].Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in ds.Tables["DATOS"].Columns)
                    row.Add(col.ColumnName, dr[col]);
                rows.Add(row);
            }
            return serializer.Serialize(rows);
        }

        [WebMethod]
        public string InsertLike(int VideoId, int UsuarioId)
        {
            try
            {
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_InsertLike", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@VideoId", SqlDbType.Int).Value = VideoId;
                Comando.Parameters.Add("@UsuarioId", SqlDbType.Int).Value = UsuarioId;
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
        public string GetComentariosVideos(int VideoId)
        {
            ds.Tables.Clear();
            Cl_Video clVideo = new Cl_Video();
            ds = clVideo.GetComentarios(VideoId);
            Dictionary<string, object> dict = new Dictionary<string, object>();
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;
            foreach (DataRow dr in ds.Tables["DATOS"].Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in ds.Tables["DATOS"].Columns)
                    row.Add(col.ColumnName, dr[col]);
                rows.Add(row);
            }
            return serializer.Serialize(rows);
        }

        [WebMethod]
        public string InsertComentario(int VideoId, int UsuarioId, string Comentario)
        {
            try
            {
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_InsertComentario", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@VideoId", SqlDbType.Int).Value = VideoId;
                Comando.Parameters.Add("@UsuarioId", SqlDbType.Int).Value = UsuarioId;
                Comando.Parameters.Add("@Comentario", SqlDbType.VarChar, 8000).Value = Comentario;
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
        public string NameVideo(int VideoId)
        {
            try
            {
                cn.Open();
                SqlCommand Comando = new SqlCommand("Sp_GetNameVideo", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("@VideoId", SqlDbType.Int).Value = VideoId;
                Comando.Parameters.Add("@Name", SqlDbType.VarChar, 8000).Direction = ParameterDirection.Output;
                Comando.ExecuteNonQuery();
                string Respuesta = Comando.Parameters["@Name"].Value.ToString();
                cn.Close();
                return Respuesta;

            }
            catch (Exception ex)
            {
                return "";
            }
        }
    }
}
