using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web.Services;

namespace Execution.WebServices
{
    /// <summary>
    /// Summary description for Ws_Generales
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Ws_Generales : System.Web.Services.WebService
    {

        [WebMethod]
        public string GeneraClave()
        {
            Random rdn = new Random();
            string caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%$#@";
            int longitud = caracteres.Length;
            char letra;
            int longitudContrasenia = 10;
            string contraseniaAleatoria = string.Empty;
            for (int i = 0; i < longitudContrasenia; i++)
            {
                letra = caracteres[rdn.Next(longitud)];
                contraseniaAleatoria += letra.ToString();
            }
            return contraseniaAleatoria;
        }

        [WebMethod]
        public string Encrypt(string clearText)
        {
            string EncryptionKey = "QueryClinica";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        [WebMethod]
        public string Decrypt(string cipherText)
        {

            string EncryptionKey = "QueryClinica";
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        //cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        [WebMethod]
        public void EnvioCorreoAdmin(string Asunto, string Mensaje, int ConAdjunto, string RutaAdjunto, string NombreArchivo)
        {
            try
            {
                zstring Sitio = System.Configuration.ConfigurationManager.AppSettings["Sitio"].ToString();
                System.Net.Mail.MailMessage Correo = new System.Net.Mail.MailMessage();
                Correo.From = new System.Net.Mail.MailAddress(System.Configuration.ConfigurationManager.AppSettings["Cuenta"], "Video tutoriales Execution");
                Correo.To.Add(System.Configuration.ConfigurationManager.AppSettings["CuentaDestino"].ToString());
                Correo.Subject = Asunto;
                string Saludo = "<table><tr><td>Estimado(a): Administrador</td></tr></table>";
                string Notificacion = "<table><tr><td><b>NOTIFICACIÓ ELECTRÓNICA, DEL ADMINISTRADOR DEL SISTEMA</b></td></tr></table>";
                Mensaje = Notificacion + Saludo + Mensaje + "<table><tr><td>Ingrese al sistema por medio del siguiente enlace: " + Sitio + " para revisar la información</td></tr><tr><td></td></tr><tr><td><b>Execution</b></td><tr><td></td></tr><tr><td> <font color=#FF0000>Por favor no responda este correo.</font></td></tr></table>";
                AlternateView HTMLConImagenes = default(AlternateView);
                HTMLConImagenes = AlternateView.CreateAlternateViewFromString(Mensaje, null, "text/html");

                Correo.IsBodyHtml = true;
                if (ConAdjunto == 1)
                {
                    Attachment File = new Attachment(RutaAdjunto);
                    File.Name = NombreArchivo;
                    Correo.Attachments.Add(File);
                }
                Correo.AlternateViews.Add(HTMLConImagenes);
                Correo.Priority = System.Net.Mail.MailPriority.High;
                System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(System.Configuration.ConfigurationManager.AppSettings["Host"].ToString(), Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["Puerto"]));
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Credentials = new System.Net.NetworkCredential(System.Configuration.ConfigurationManager.AppSettings["Cuenta"], System.Configuration.ConfigurationManager.AppSettings["Clave"]);

                smtp.Send(Correo);
            }
            catch (Exception ex)
            {
                string Err = ex.Message;
            }
        }
    }
}
