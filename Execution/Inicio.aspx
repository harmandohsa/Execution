<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage/Site.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="Execution.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <style>
       
       
        .im2
        {
            background-image: url('./images/emoji5.png');
            background-size: 32px 32px;
            background-repeat: no-repeat;
            width: 64px;
            height: 64px;
            display: inline-block;
        }
        #rate7 .rate-base-layer span
        {
            opacity: 0.5;
        }
        
    </style>

  


    
    <!-- SubHeader =============================================== -->
	<section class="header-video">
		<div id="hero_video">
			<div id="sub_content">
				<div class="mobile_fix">
					<h1>®Execution <strong></strong></h1>
					<p>
						Creando una cultura de alto desempeño
					</p>
				</div>
			</div>
			<!-- End sub_content -->
		</div>
		<img src="img/video_fix.png" alt="" class="header-video--media" data-video-src="video/Execution" data-teaser-source="video/Execution" data-provider="" data-video-width="1920" data-video-height="960">
		<div id="count" class="hidden-xs">
			<ul>
				<li><span class="number">653</span> Videos</li>
				<li><span class="number">1246</span> Videos Vistos</li>
				<li><span class="number">2343</span> Usuarios Registrados</li>
			</ul>
		</div>
	</section>
	<!-- End Header video -->
	<!-- End SubHeader ============================================ -->
    <section id="">
		<div class="container">
			<h2 class="main_title"><em></em>Buenas Prácticas y Video Tutoriales<span></span></h2>
			<p class="lead styled">
				En este portal encontraras algunas de las buenas prácticas que ®Execution fomenta; además todos nuestros clientes podrán tener acceso a todos los video tutoriales que se estarán publicando periódicamente, esto como parte del soporte que ®Execution brinda a nuestros clientes
			</p>
			<div class="row">
				<div class="col-sm-4 wow fadeIn animated" data-wow-delay="0.5s">
					<div class="box_feat" id="icon_1">
						<h3>Buenas Prácticas</h3>
						<p>Nuestras buenas prácticas en el uso de ®Execution reconocidas a nivel mundial</p>
					</div>
				</div>
                <div class="col-sm-4 wow fadeIn animated" data-wow-delay="0.2s">
					<div class="box_feat" id="icon_2">
						<h3>Videos</h3>
						<p>Podrás ver todos los videos del sistema así como darles estrellas, hacer comentarios y mucho más</p>
					</div>
				</div>
				<div class="col-sm-4 wow fadeIn animated" data-wow-delay="1s">
					<div class="box_feat" id="icon_3">
						<h3>Disponible siempre</h3>
						<p>Podrás ver y aprender de nuestros videos desde cualquier lugar y plataforma que uses</p>
					</div>
				</div>
			</div>
			<!-- End row -->
		</div>
		<!-- End container -->
	</section>
	<!-- End section -->

	<div class="container_styled_1">
		<div class="container margin_60_35">
			<h2 class="main_title"><em></em>Buenas prácticas<span></span></h2>
			<div id="filter_buttons">
				<button data-toggle="portfilter" class="active" data-target="all">Los más vistos</button>
				<button data-toggle="portfilter" data-target="Yoga">Performance</button>
				<button data-toggle="portfilter" data-target="Strength">Reuniones</button>
				<button data-toggle="portfilter" data-target="Cardio">360</button>
				<button data-toggle="portfilter" data-target="Pilates">Clima</button>
                <button data-toggle="portfilter" data-target="Pilates">Calibración</button>
                <button data-toggle="portfilter" data-target="Pilates">Configuración</button>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="course_container">
						<figure>
                            <iframe padding-bottom: 56.25%; src="https://www.youtube-nocookie.com/embed/ELqJaHHLXEE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</figure>
						<div class="course_title">
							<div class="type"><span>Video Oficial</span>
							</div>
							<h3>Execution</h3>
							<div class="info_2 clearfix"><i class="icon-eye"></i><span>150 Vistas</span></div>
						</div>
					</div>
					<!-- End box course_container -->
				</div>

			</div>
			<!-- End row -->
		</div>
		<!-- End container -->
	</div>
	<!-- End container_styled_1 -->
    <script src="WebScripts/SrcInicio.js"></script>
</asp:Content>
