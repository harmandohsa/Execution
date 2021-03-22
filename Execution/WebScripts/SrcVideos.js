var UsuarioId;

function OpcionesInicioLocal() {
    if (Cookies.get('UsuarioId') == null) {
        window.location = "../Inicio.aspx";
    }
    else {
        CargaVideos()
        if (Desencriptar(Cookies.get('CambiaClave')) == 1) {
            $('#changepass').modal('show');
        }
    }

    
    
}

function CargaVideos() {
    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {

            $(DivVideos).empty();
            $.ajax({
                type: 'POST',
                data: JSON.stringify(),
                contentType: "application/json; charset=utf-8",
                url: "../WebServices/WS_Videos.asmx/GetListaVideos",
                datatype: 'json',
                success: function (data) {
                    djson = JSON.parse(data.d);
                    for (var j = 0; j < djson.length; j++) {
                        var Html;
                        Html = '<div class=col-md-4><div class=course_container><div class=ribbon top><span>' + djson[j].Modulo + '</span></div><div><figure>' + djson[j].Link + '</figure></div><div class=course_title><div class="type"><span>' + djson[j].Menu + '</span></div><div><h3>' + djson[j].Nombre + '</h3></div>&nbsp;<div class=row><div class=col-md-4><a onclick=AddLike(' + djson[j].VideoId + ')  class="btn_2"><img width="50%" height="50%" src="../img/like.png" />Like</a></div></div>&nbsp;<div class=row><div class=col-md-4><a onclick=VerComentarios(' + djson[j].VideoId + ')  class="btn_3">Comentarios</a></div></div><div class="info_2 clearfix"><i class=icon-ok></i><span>' + djson[j].Likes + ' Likes</span></div><div class="info_2 clearfix"><i class=icon-comment></i><span>' + djson[j].Comentarios + ' Comentarios</span></div></div></div></div>'
                        $(DivVideos).append(Html)
                    }

                },
                error: function (result) {
                    alert(result);
                }
            });

            
            $.unblockUI();
        }
    });
}

function GetNameVideo(VideoId) {
    var Name = '';
    var sentAjaxData = {
        "VideoId": VideoId
    };

    $.ajax({
        type: "POST",
        url: "../WebServices/Ws_Videos.asmx/NameVideo",
        dataType: "json",
        contentType: "application/json",
        async: false,
        data: JSON.stringify(sentAjaxData),
        success: function (data) {
            //var len = data.d.length;
            Name = data.d;
            return Name
        },
        error: function (result) {
            alert(result);
        }
    });
    return Name
}

function VerComentarios(VideoId) {
    $('#modalNuevaUsuario').modal('show');
    $('#txtVideoId').val(VideoId);
    GetNameVideo(VideoId);
    $('#lblVideoNom').text('Comentarios: ' + GetNameVideo(VideoId))
    $(DivComentarios).empty();
    var sentAjaxData = {
        "VideoId": VideoId
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(sentAjaxData),
        contentType: "application/json; charset=utf-8",
        url: "../WebServices/WS_Videos.asmx/GetComentariosVideos",
        datatype: 'json',
        success: function (data) {
            djson = JSON.parse(data.d);
            Html = '<ul class="recent_post">'
            for (var j = 0; j < djson.length; j++) {
                Html = Html +  '<li><i class="icon-calendar-empty"></i> ' + djson[j].Fecha + '<i class="icon-user-md"></i> ' + djson[j].Nombre + '<div><a href="">' + djson[j].Comentario + '</a></div></li>'
                
            }
            Html = Html + '</ul>'
            $(DivComentarios).append(Html)
        },
        error: function (result) {
            alert(result);
        }
    });

}

function GrabarComentario() {
    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var CamposVacios = "<b>" + "Campos Invalidos: " + "</b>" + "<br />";
            var Error = true;
            if ($('#txtComentario').val() == "") {
                CamposVacios = CamposVacios + 'Comentario' + "<br />";
                Error = false;
            }
            if (Error == false) {
                toastr.error(CamposVacios);
                $.unblockUI();
                return Error;

            }
            else {
                var sentAjaxData = {
                    "VideoId": $('#txtVideoId').val(),
                    "UsuarioId": Desencriptar(Cookies.get('UsuarioId')),
                    "Comentario": $('#txtComentario').val()
                };
                var retval;
                $.ajax({
                    type: "POST",
                    url: "../WebServices/WS_Videos.asmx/InsertComentario",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sentAjaxData),
                    async: false,
                    success: function (data) {
                        $.unblockUI();
                        $('#modalNuevaUsuario').modal('hide');
                        toastr.success('Comentario Grabado');
                        CargaVideos()
                        $('#txtComentario').val('')
                        return false;
                    },
                    error: function (request, status, error) {
                        alert(request.responseText);
                    }
                });
            }
        }
    });
}

function AddLike(VideoId) {
    $.blockUI({
        message: 'Cargando Likes',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var sentAjaxData = {
                "VideoId": VideoId,
                "UsuarioId": Desencriptar(Cookies.get('UsuarioId'))
            };
            var retval;
            $.ajax({
                type: "POST",
                url: "../WebServices/WS_Videos.asmx/InsertLike",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(sentAjaxData),
                async: false,
                success: function (data) {
                    CargaVideos()
                    return false;
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
    });
}


function Contador() {
    alert('Hola')
}

function ResetClave() {
    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var CamposVacios = "<b>" + "Campos Invalidos: " + "</b>" + "<br />";
            var Error = true;
            if ($('#txtClaveActual').val() == "") {
                CamposVacios = CamposVacios + 'Clave Actual' + "<br />";
                Error = false;
            }
            if ($('#txtNuevaClave').val() == "") {
                CamposVacios = CamposVacios + 'Nueva Clave' + "<br />";
                Error = false;
            }
            if ($('#txtConfClave').val() == "") {
                CamposVacios = CamposVacios + 'Confirmar Nueva Clave' + "<br />";
                Error = false;
            }
            if ($('#txtClaveActual').val() != "") {
                if ($('#txtClaveActual').val() != Desencriptar(Cookies.get('Clave'))) {
                    CamposVacios = CamposVacios + 'La clave actual no es correcta' + "<br />";
                    Error = false;
                }    
            }
            if ($('#txtNuevaClave').val() != $('#txtConfClave').val()) {
                CamposVacios = CamposVacios + 'La Clave nueva no coincide con lo confirmación' + "<br />";
                Error = false;
            }
            if (Error == false) {
                toastr.error(CamposVacios);
                $.unblockUI();
                return Error;

            }
            else {

                var sentAjaxData = {
                    "UsuarioId": Desencriptar(Cookies.get('UsuarioId')),
                    "Clave": $('#txtConfClave').val(),
                    "CambiaClave": 0
                };
                var retval;
                $.ajax({
                    type: "POST",
                    url: "../WebServices/WS_Usuarios.asmx/EditClave",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(sentAjaxData),
                    async: false,
                    success: function (data) {
                        $.unblockUI();
                        toastr.success('Clave Modificada');
                        $('#changepass').modal('hide');
                        Cookies.set('CambiaClave', Encriptar(0));
                        return false;
                    },
                    error: function (request, status, error) {
                        alert(request.responseText);
                    }
                });


                $.unblockUI();
            }

        }
    });


    
}


function PaginaVideoModulo(ModuloId) {
    window.location = "../Web_Forms/Wfrm_VideosModulo.aspx?ModuloId=" + ModuloId;
}