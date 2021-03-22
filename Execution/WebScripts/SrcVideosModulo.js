function OpcionesInicioLocal() {
    if (Cookies.get('UsuarioId') == null) {
        window.location = "../Inicio.aspx";
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        var ModuloId = parseInt(urlParams.get('ModuloId'))
        switch (ModuloId) {
            case 1:
                $('#lblTituloModulo').text('Configuración')
                break;
            case 2:
                $('#lblTituloModulo').text('Evaluacíón 360')
                break;
            case 3:
                $('#lblTituloModulo').text('Clima Organizacional')
                break;
            case 4:
                $('#lblTituloModulo').text('Performance')
                break;
            case 5:
                $('#lblTituloModulo').text('Reuniones')
                break;
            case 6:
                $('#lblTituloModulo').text('Calibración')
                break;
            case 7:
                $('#lblTituloModulo').text('Alineaciones Horizontales')
                break;
            case 8:
                $('#lblTituloModulo').text('Proyectos')
                break;
            case 9:
                $('#lblTituloModulo').text('Innovación')
                break;
            case 10:
                $('#lblTituloModulo').text('Sala de Toma de Decisiones')
                break;
            default:
                break
        }

        CargaVideos(urlParams.get('ModuloId'))

       
        
    }

    
}

function CargaVideos(ModuloId) {
    
    $.blockUI({
        message: 'Cargando Datos',
        css: { border: 'none', padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px', '-moz-border-radius': '10px', opacity: .5, color: '#fff' },
        onBlock: function () {
            var sentAjaxData = {
                "ModuloId": ModuloId
            };

            $(DivVideos).empty();
            $.ajax({
                type: 'POST',
                data: JSON.stringify(sentAjaxData),
                contentType: "application/json; charset=utf-8",
                url: "../WebServices/WS_Videos.asmx/GetListaVideosModulo",
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
                Html = Html + '<li><i class="icon-calendar-empty"></i> ' + djson[j].Fecha + '<i class="icon-user-md"></i> ' + djson[j].Nombre + '<div><a href="">' + djson[j].Comentario + '</a></div></li>'

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
    const urlParams = new URLSearchParams(window.location.search);
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
                        CargaVideos(parseInt(urlParams.get('ModuloId')))
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
    const urlParams = new URLSearchParams(window.location.search);
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
                    CargaVideos(parseInt(urlParams.get('ModuloId')))
                    return false;
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        }
    });
}


function PaginaVideoModulo(ModuloId) {
    if (ModuloId == 0)
        window.location = "../Web_Forms/Wfrm_InicioVideos.aspx";
    else
        window.location = "../Web_Forms/Wfrm_VideosModulo.aspx?ModuloId=" + ModuloId;
}

function Contar() {
    alert('Hola');
}