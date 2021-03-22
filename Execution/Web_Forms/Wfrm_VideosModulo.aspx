<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/SiteVideoTutoriales.Master" AutoEventWireup="true" CodeBehind="Wfrm_VideosModulo.aspx.cs" Inherits="Execution.Web_Forms.Wfrm_VideosModulo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .big-modal {
            max-width: 80% !important;
        }
    </style>
    <div class="container_styled_1">
		<div class="container margin_60_35">
			<h2 class="main_title"><em></em><label id="lblTituloModulo">Video Tutoriales</label>  <span></span></h2>
			<div id="filter_buttons">
				<button onclick="PaginaVideoModulo(0)" data-toggle="portfilter" data-target="all">Inicio</button>
                <button onclick="PaginaVideoModulo(1)" data-toggle="portfilter" data-target="Yoga">Configuración</button>
				<button onclick="PaginaVideoModulo(10)" data-toggle="portfilter" data-target="Yoga">Sala de Toma de Decisiones</button>
				<button onclick="PaginaVideoModulo(4)" data-toggle="portfilter" data-target="Strength">Performance</button>
				<button onclick="PaginaVideoModulo(5)" data-toggle="portfilter" data-target="Cardio">Reuniones</button>
				<button onclick="PaginaVideoModulo(2)" data-toggle="portfilter" data-target="Pilates">360</button>
			</div>
            <div id="filter_buttons">
                <button onclick="PaginaVideoModulo(3)" data-toggle="portfilter" data-target="Yoga">Clima</button>
				<button onclick="PaginaVideoModulo(6)" data-toggle="portfilter" data-target="Strength">Calibración</button>
				<button onclick="PaginaVideoModulo(7)" data-toggle="portfilter" data-target="Cardio">Alineaciones Horizontales</button>
				<button onclick="PaginaVideoModulo(8)" data-toggle="portfilter" data-target="Pilates">Proyectos</button>
                <button onclick="PaginaVideoModulo(9)" data-toggle="portfilter" data-target="Pilates">Innovación</button>
            </div>
			<div class="row" id="DivVideos"></div>
			<!-- End row -->
		</div>
		<!-- End container -->
	</div>
    <div class="modal fade slide-up" id="modalNuevaUsuario" tabindex="-1" role="dialog" aria-labelledby="modalSlideUpLabel" aria-hidden="false">
            <div class="modal-dialog modal-lg big-modal">
                <div class="modal-content-wrapper">
                <div class="modal-content ">
                    <div class="modal-header clearfix text-left">
                        <h5><label id="lblVideoNom"></label></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            <i class="ik ik-arrow-down bg-blue"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div id="DivComentarios" class="row scroll scroll-pull" data-scroll="true" data-wheel-propagation="true" style="height: 300px;overflow-y:scroll;" >
                        
                            </div>
                            &nbsp;
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="txtComentario">Escribi aqui tu comentario</label>
                                        <textarea id="txtComentario" placeholder="Comentarios" rows="5" class="form-control" ></textarea>
                                    </div>
                                </div>
                        </div>
                        <div class="modal-footer">
                           <button type="button" onclick="GrabarComentario()" id="BtnGrabarComentario" class="btn btn-primary"><i class="fa fa-save"></i>Grabar</button>
                        </div>
                    </div>
                </div>
                </div>
                <!-- /.modal-content -->
            </div>
        </div>
    </div>
    <input id="txtVideoId" type="text" class="form-control" Style="display:none" >
    <script src="../WebScripts/SrcVideosModulo.js"></script>
</asp:Content>
