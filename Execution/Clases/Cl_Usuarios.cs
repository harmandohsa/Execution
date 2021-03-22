using System;
using System.Data;
using System.Data.SqlClient;

namespace Execution.Clases
{
    public class Cl_Usuarios
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["ConexionSql"]);
        DataSet ds = new DataSet();


        public DataSet GetDatosUsuario(string Usuario)
        {
            try
            {
                if (ds.Tables["DATOS"] != null)
                    ds.Tables.Remove("DATOS");
                cn.Open();
                SqlCommand Comando = new SqlCommand("SP_GetDatosUsuario", cn);
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Parameters.Add("Usuario", SqlDbType.VarChar, 200).Value = Usuario;
                SqlDataAdapter adp = new SqlDataAdapter(Comando);
                adp.Fill(ds, "DATOS");
                cn.Close();

                return ds;
            }
            catch (Exception ex)
            {
                return ds;
            }

        }

    }
}