window.addEventListener('load', function () {
    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            OpcionesInicio();
            OpcionesInicioLocal();
        }
    });
}, false);

function OpcionesInicio() {
    //var Pagina = location.pathname.substring(1);
    ////alert(Pagina);
    //if (Pagina == 'Inicio')   {
    //}
    //else if (Pagina == 'Execution/') {
    //    //alert('Nada');
    //}
    //else
    //{
    //    if (Cookies.get('UsuarioId') == null) {
    //        window.location = "../Inicio.aspx";
    //    }
    //}
    $.unblockUI();
}

function validateEmail(email) {
    // First check if any value was actually set
    if (email.length == 0) return false;
    // Now validate the email format using Regex
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return re.test(email);
}

function Encriptar(Clave) {
    var sentAjaxData = {
        "clearText": Clave
    };
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Generales.asmx/Encrypt",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sentAjaxData),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function Desencriptar(Clave) {
    var ClaveDes = "";
    if (typeof Clave === 'undefined') {

    }
    else {
        ClaveDes = Clave;
    }
    //alert(ClaveDes)
    var sentAjaxData = {
        "cipherText": ClaveDes
    };
    var retval;
    $.ajax({
        type: "POST",
        url: "../WebServices/WS_Generales.asmx/Decrypt",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sentAjaxData),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function Salir() {
    //GrabaBitacoraSalida();
    Cookies.remove('UsuarioId');
    Cookies.remove('NombreUsuario');
    window.location = "../Inicio.aspx";
}

