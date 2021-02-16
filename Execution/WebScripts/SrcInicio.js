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
                if (validateEmail($('#txtCorreo').val()) == false) {
                    CamposVacios = CamposVacios + 'Correo Invalido' + "<br />";
                    Error = false;
                }
                else {
                    var HayDato = ExisteCorreo($("#txtCorreo").val());
                    if (HayDato > 0) {
                        CamposVacios = CamposVacios + 'Correo electrónico ya existe' + "<br />";
                        Error = false;
                    }
                }
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