<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/SiteVideoTutoriales.Master" AutoEventWireup="true" CodeBehind="Wfrm_InicioVideos.aspx.cs" Inherits="Execution.Web_Forms.Wfrm_InicioVideos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
        .big-modal {
            max-width: 80% !important;
        }
    </style>
    <div id="full-slider-wrapper">
        <div id="layerslider" style="width:100%;height:667px;">
            <!-- first slide -->
            <div class="ls-slide" data-ls="slidedelay: 5000; transition2d:5;">
                <img src="../img/slides/Execution.jpeg" class="ls-bg" alt="Slide background" width="1600" height="667">
                <h3 class="ls-l slide_typo" style="top: 50%; left: 50%; color:black;" data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;">Video Tutoriales<br>
                IMS Execution</h3>
                <p class="ls-l slide_typo_2" style="top:62%; left:50%;" data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;">
                    
                </p>
            </div>
           <%-- <!-- second slide -->
            <div class="ls-slide" data-ls="slidedelay: 5000; transition2d:85;">
                <img src="img/slides/slide_2.jpg" class="ls-bg" alt="Slide background" width="1600" height="667">
                <h3 class="ls-l slide_typo" style="top: 50%; left: 50%;" data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;">High Quality Videos<br>
               for every fitness level</h3>
                <p class="ls-l slide_typo_2" style="top:62%; left:50%;" data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;">
                     Cardio / Strenght / Yoga
                </p>
            </div>
            <!-- third slide -->
            <div class="ls-slide" data-ls="slidedelay:5000; transition2d:103;">
                <img src="img/slides/slide_3.jpg" class="ls-bg" alt="Slide background" width="1600" height="667">
                <h3 class="ls-l slide_typo" style="top: 50%; left: 50%;" data-ls="offsetxin:0;durationin:2000;delayin:1000;easingin:easeOutElastic;rotatexin:90;transformoriginin:50% bottom 0;offsetxout:0;rotatexout:90;transformoriginout:50% bottom 0;">Improve your overall health</h3>
                <p class="ls-l slide_typo_2" style="top:56%; left:50%;" data-ls="durationin:2000;delayin:1000;easingin:easeOutElastic;">
                    Cardio / Strenght / Yoga
                </p>
            </div>--%>
        </div>
    </div>
    <div class="container_styled_1">
		<div class="container margin_60_35">
			<h2 class="main_title"><em></em>Video Tutoriales<span></span></h2>
			<div id="filter_buttons">
				<button data-toggle="portfilter" class="active" data-target="all">Últimos cargados</button>
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
    <!-- Register modal -->
	<div class="modal fade" id="changepass" tabindex="-1" role="dialog" aria-labelledby="myRegister" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content modal-popup">
				<a  class="close-link"><i class="icon_close_alt2"></i></a>
				<div  class="popup-form" id="myRegister">
					<input id="txtClaveActual" type="password" class="form-control form-white" placeholder="Clave Actual">
					<input id="txtNuevaClave" type="password" class="form-control form-white" placeholder="Nueva Clave">
					<input id="txtConfClave" type="password" class="form-control form-white" placeholder="Confirmar Clave">
					<button type="submit" onclick="ResetClave()" class="btn btn-submit">Cambiar Clave</button>
				</div>
			</div>
		</div>
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
    <script src="../WebScripts/SrcVideos.js"></script>
    
</asp:Content>
