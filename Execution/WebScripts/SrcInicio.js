function OpcionesInicioLocal() {
    //$("#rate7").rate({
    //    selected_symbol_type: 'image2',
    //    max_value: 5,
    //    step_size: 1,
    //    update_input_field_name: $("#input1"),
    //    only_select_one_symbol: true,
    //    symbols: {
    //        image2: {
    //            base: ['<div style="background-image: url(\'images/emoji1.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji2.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji3.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji4.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji5.png\');" class="im2">&nbsp;</div>',],
    //            hover: ['<div style="background-image: url(\'images/emoji1.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji2.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji3.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji4.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji5.png\');" class="im2">&nbsp;</div>',],
    //            selected: ['<div style="background-image: url(\'images/emoji1.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji2.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji3.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji4.png\');" class="im2">&nbsp;</div>',
    //                '<div style="background-image: url(\'images/emoji5.png\');" class="im2">&nbsp;</div>',],
    //        },
    //    },
    //});
    $("#cboEmpresa").select2({
        width: '100%',
        placeholder: "",
        allowClear: true,
        modal: true,
        dropdownParent: $("#register")
    }).on("change", function () {
        $("#txtEmpresaId").val($("#cboEmpresa").val());
        });

    ComboEmpresas();
    $("#spanVideos").html(CuantosVideos());
    //$("#spanVideosVistos").html(CuantosVideosVistos());
    $("#spanUsrRegis").html(CuantosUsuarios());
    $("#spanLikes").html(CuantosLikes());
    $("#spanComentarios").html(CuantosComentarios());
}

function CrearUsuario() {
    $.blockUI({
        theme: true,
        baseZ: 4000,
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var CamposVacios = "<b>" + "Campos Invalidos: " + "</b>" + "<br />";
            var Error = true;
            if ($('#txtNombres').val() == "") {
                CamposVacios = CamposVacios + 'Nombres' + "<br />";
                Error = false;
            }
            if ($('#txtApellidos').val() == "") {
                CamposVacios = CamposVacios + 'Apellidos' + "<br />";
                Error = false;
            }
            if ($('#txtCorreo').val() == "") {
                CamposVacios = CamposVacios + 'Correo' + "<br />";
                Error = false;
            }
            if ($('#txtEmpresaId').val() == "") {
                CamposVacios = CamposVacios + 'Empresa' + "<br />";
                Error = false;
            }
            if ($('#txtCorreo').val() != "") {
                var HayDato = ExisteCorreo($("#txtCorreo").val());
                if (HayDato > 0) {
                    CamposVacios = CamposVacios + 'Correo electrónico ya existe' + "<br />";
                    Error = false;
                }
                //if (validateEmail($('#txtCorreo').val()) == false) {
                //    CamposVacios = CamposVacios + 'Correo Invalido' + "<br />";
                //    Error = false;
                //}
                //else {
                    
                //}
            }
            if (Error == false) {
                toastr.error(CamposVacios);
                $.unblockUI();
                return Error;

            }
            else {
                $.unblockUI();
                var Nombres = $('#txtNombres').val() + ' ' + $('#txtApellidos').val()
                var sentAjaxData = {
                    "Nombres": $('#txtNombres').val(),
                    "Apellidos": $('#txtApellidos').val(),
                    "Correo": $('#txtCorreo').val(),
                    "EmpresaId": $('#txtEmpresaId').val()
                };
                var retval;
                $.ajax({
                    type: "POST",
                    url: "WebServices/WS_Usuarios.asmx/InsertUsuario",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sentAjaxData),
                    async: false,
                    success: function (data) {
                        $.unblockUI();
                        $('#register').modal('hide');
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario Creado',
                            text: '¡Tu usuario ha sido creado exitosamente, pero aún se encuentra inactivo, recibirás un correo electrónico muy pronto con tu usuario y clave!',
                            footer: 'Execution'
                        })
                        LimpiarUsuario();
                        return false;
                    },
                    error: function (request, status, error) {
                        alert(request.responseText);
                    }
                });
                
                var Empresa = $('#cboEmpresa').find(":selected").text()
                var Mensaje = "<div class=container-fluid><div class=col-md-12><div class=form-group><label>Estimado Administrador un nuevo usuario en el sistema de Video tutoriales</label></div></div><div class=col-md-6><div class=form-group><label>Usuario: " + Nombres + "</label></div></div><div class=col-md-6><div class=form-group><label>Empresa: " + Empresa + "</label></div></div></div>"
                var sentAjaxData = {
                    "Asunto": "Nuevo Usuario Video tutoriales",
                    "Mensaje": Mensaje,
                    "ConAdjunto": 0,
                    "RutaAdjunto": '',
                    "NombreArchivo": ''
                };
                $.ajax({
                    type: "POST",
                    url: "WebServices/WS_Generales.asmx/EnvioCorreoAdmin",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sentAjaxData),
                    async: false,
                    success: function (data) {

                        return false;
                    }
                });
            }
        }
    });
}

function LimpiarUsuario() {
    $('#txtNombres').val('')
    $('#txtApellidos').val('')
    $('#txtCorreo').val('')
}

function ExisteCorreo(Correo) {
    var sentAjaxData = {
        "Correo": Correo
    };
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Usuarios.asmx/ExisteCorreo",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sentAjaxData),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        },
        error: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function Ingresar() {
    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var CamposVacios = "<b>" + "Campos Invalidos: " + "</b>" + "<br />";
            var Error = true;
            if ($('#TxtUsuarioLog').val() == "") {
                CamposVacios = CamposVacios + 'Usuario' + "<br />";
                Error = false;
            }
            if ($('#TxtClaveLog').val() == "") {
                CamposVacios = CamposVacios + 'Clave' + "<br />";
                Error = false;
            }
            if (Error == false) {
                toastr.error(CamposVacios);
                $.unblockUI();
                return Error;

            }
            else {

                var sentAjaxData = {
                    "Usuario": $('#TxtUsuarioLog').val(),
                    "Clave": Encriptar($('#TxtClaveLog').val())
                };

                //var sentAjaxData = {
                //    "Correo": 'ss'
                //};

                $.ajax({
                    type: "POST",
                    url: "WebServices/WS_Usuarios.asmx/ExisteUsuarioClaveEmpresa",
                    dataType: "json",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify(sentAjaxData),
                    success: function (data) {
                        //var len = data.d.length;
                        //alert(data.d);
                        if (data.d == 0) {
                            toastr.error('Usuario o Clave Invalidas');
                            $.unblockUI();
                        }
                        else {
                            GetDatosUsuario($('#TxtUsuarioLog').val());
                            window.location = "Web_Forms/Wfrm_InicioVideos.aspx";
                            //GrabaBitacoraIngreso($('#TxtUsuario').val());
                            //if (Desencriptar(Cookies.get('EstatusUsuario')) == 0) {
                            //    toastr.error('Su usuario esta inactivo');
                            //}
                            //else {
                            //    if (Desencriptar(Cookies.get('CambiaClave')) == 0)
                            //        window.location = "../WebForms/Wfrm_Inicio.aspx";
                            //    else
                            //        window.location = "../WebForms/Wfrm_CambioClave.aspx";
                            //}

                        }


                    },
                    error: function (result) {
                        alert(result);
                    }
                });


                $.unblockUI();
            }

        }
    });
}

function GetDatosUsuario(Usuario) {
    var sentAjaxData = {
        "Usuario": Usuario
    };
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Login.asmx/GetDatosUsuario",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(sentAjaxData),
        async: false,
        success: function (data) {
            Cookies.set('UsuarioId', Encriptar(data.d[0]['UsuarioId']));
            Cookies.set('NombreUsuario', Encriptar(data.d[0]['Nombre']));
            Cookies.set('CambiaClave', Encriptar(data.d[0]['CambiaClave']));
            Cookies.set('Clave', Encriptar(data.d[0]['Clave']));
            return false;
        }
    });
}

function CuantosVideos() {
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Generales.asmx/CuantosVideos",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        },
        error: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function CuantosVideosVistos() {
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Generales.asmx/CuantosVideosVistos",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        },
        error: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function CuantosUsuarios() {
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Generales.asmx/CuantosUsuarios",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        },
        error: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function EnviarClave() {

    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var CamposVacios = "<b>" + "Campos Invalidos: " + "</b>" + "<br />";
            var Error = true;
            if ($('#txtUsuarioRecuperar').val() == "") {
                CamposVacios = CamposVacios + 'Usuario' + "<br />";
                Error = false;
            }
            if (Error == false) {
                toastr.error(CamposVacios);
                $.unblockUI();
                return Error;

            }
            else {

                var Existe = 0;
                var sentAjaxData = {
                    "Usuario": $('#txtUsuarioRecuperar').val()
                };
                $.ajax({
                    type: "POST",
                    url: "WebServices/WS_Usuarios.asmx/ExisteUsuario",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sentAjaxData),
                    async: false,
                    success: function (data) {
                        Existe = data.d;
                        return false;
                    }
                });
                //alert(Existe);

                if (Existe == 1) {
                    var Correo, Nombre, UsuarioId
                    var sentAjaxData = {
                        "Usuario": $('#txtUsuarioRecuperar').val()
                    };
                    $.ajax({
                        type: "POST",
                        url: "WebServices/WS_Login.asmx/GetDatosUsuario",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sentAjaxData),
                        async: false,
                        success: function (data) {
                            UsuarioId = data.d[0]['UsuarioId'];
                            Correo = data.d[0]['Correo'];
                            Nombre = data.d[0]['Nombre'];
                            return false;
                        }
                    });

                    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    var string_length = 8;
                    var randomstring = '';
                    for (var i = 0; i < string_length; i++) {
                        var rnum = Math.floor(Math.random() * chars.length);
                        randomstring += chars.substring(rnum, rnum + 1);
                    }

                    alert(randomstring);
                    var sentAjaxData = {
                        "UsuarioId": UsuarioId,
                        "Clave": randomstring,
                        "CambiaClave": 1
                    };
                    var retval;
                    $.ajax({
                        type: "POST",
                        url: "WebServices/WS_Usuarios.asmx/EditClave",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sentAjaxData),
                        async: false,
                        success: function (data) {

                        },
                        error: function (request, status, error) {
                            alert(request.responseText);
                        }
                    });

                    var Mensaje = "<div class=container-fluid><div class=col-md-12><div class=form-group><label>Se ha reinicializado su clave para el sistema de videotutoriales, acontinuación sus credenciales</label></div></div><div class=col-md-6><div class=form-group><label>Usuario: " + $('#txtUsuarioRecuperar').val() + "</label></div></div><div class=col-md-6><div class=form-group><label>Clave: " + randomstring + "</label></div></div></div>"
                    var sentAjaxData = {
                        "Mail": Correo,
                        "Nombre": Nombre,
                        "Asunto": "Reinicialización de Usuario y Clave",
                        "Mensaje": Mensaje,
                        "ConAdjunto": 0,
                        "RutaAdjunto": '',
                        "NombreArchivo": ''
                    };
                    $.ajax({
                        type: "POST",
                        url: "WebServices/WS_Generales.asmx/EnvioCorreo",
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(sentAjaxData),
                        async: false,
                        success: function (data) {

                            return false;
                        }
                    });



                }
                toastr.success('Si su usuario fue encontrado en nuestros registros recibirá un correo electrónico con la información para ingresar al sistema');
                $('#forgetpass').modal('hide');
                $('#txtUsuarioRecuperar').val('')


                $.unblockUI();
            }

        }
    });
}

function CuantosLikes() {
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Generales.asmx/CuantosLikes",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        },
        error: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}

function CuantosComentarios() {
    var retval;
    $.ajax({
        type: "POST",
        url: "WebServices/WS_Generales.asmx/CuantosComentarios",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(),
        async: false,
        success: function (data) {
            retval = data.d;
            return false;
        },
        error: function (data) {
            retval = data.d;
            return false;
        }
    });
    return retval;
}