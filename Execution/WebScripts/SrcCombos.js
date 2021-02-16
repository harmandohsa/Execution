function ComboEmpresas() {
    $.ajax({
        type: "POST",
        url: "WebServices/Ws_Empresa.asmx/GetListaEmpresas",
        dataType: "json",
        contentType: "application/json",
        async: false,
        data: JSON.stringify(),
        success: function (data) {
            $("#cboEmpresa").get(0).options.length = 0;
            $("#cboEmpresa").get(0).options[0] = new Option("Seleccione su empresa", "-1");
            var len = data.d.length;

            for (var i = 0; i < len; i++) {
                var id = data.d[i]['EmpresaId'];
                var name = data.d[i]['Empresa'];

                $("#cboEmpresa").append("<option value='" + id + "'>" + name + "</option>");

            }
        },
        error: function (result) {
            alert(result);
        }
    });
}