using System;
using System.Data;
using System.Data.SqlClient;

namespace Execution.Clases
{
    public class Cl_Usuarios
    {
        SqlConnection cn = new SqlConnection(System.Configuration.ConfigurationManager.AppSettings["ConexionSql"]);
        DataSet ds = new DataSet();

        


    }
}