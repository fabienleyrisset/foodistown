
var response;
var crotte = new Array;
var lc_div; //div pour affichage liste lieux ds contenu gauche
var geocoder;
var p_suite;
var direction;
var myPoints = [];
var p_suite_old=null;
var p_suite_id;
var p_suite_old_id;
var lieu_recup;
var n_distance=0;
var nbre_lieux=0;
var latitude;
var longitude;
var map;
var pos;
var action;
var Distance;
var distance;
var Monadresse; //lieu de départ
var Monadresse_O;//leiu class
var oParams;
var lieu; //objet lieu
var aParams;
var reqParams;
// var xhr = getXMLHttpRequest();
var res;
var monurl;
var codepostal;
var latreq;
var longreq;
var nomreq;
var Lat;
var maxdist;
var Lng;
var tabreq = new Array;
var tabreq_ssdbl = new Array;
var tabreq_numresto = new Array;
var tabreq_double = new Array;
//var tab = new Array;
var nb_reponses;//nbre de reponses à la requete
//var tabreq = new Array;
var l_div;
var vehicule;
var travelmode;
var chaine_mode_transport;
var num_page;
var nb_pages;
var prev_infowindow="0";
var infowindow;
var markers = [];
var lieu_cur;
var tab_award  = [];
var tab_lien  = [];
var tab_guide  = [];
var tab_cor_guide  = [];
var tab_color  = [];
var i_deb;
var i_fin;
var flag_reload;

var nombre_guide=5;
//declaration des couleurs
tab_color["1"]="blue";//fooding
tab_color["2"]="red";//michelin
tab_color["3"]="yellow"; //figaroscope
tab_color["4"]="orange";//omnivore
tab_color["8"]="green";//gault et millau


tab_cor_guide["1"]="Fooding";
tab_cor_guide["2"]="Michelin";
tab_cor_guide["3"]="Figaroscope";
tab_cor_guide["4"]="Omnivore";
tab_cor_guide["8"]="Gault et Millau";
tab_cor_guide[""]="";





var test="coucou";

//var oReq;

function MonLieu(nom,adresse,idbase,cp,lat,lng,action,budget,phone,genre,distance,award,lien,numresto,guide,award1,award2,award3)
{
		{ 
		this.nom = nom;
		this.adresse = adresse;
		this.idbase = idbase;
		this.cp = cp;
		this.lat = lat;
		this.lng = lng;
		this.action = action;
		this.budget = budget; 
		this.phone = phone;
		this.genre = genre;
		this.distance = distance;
		this.award = award;
		this.lien = lien;
		this.numresto = numresto;
		this.guide = guide;
		this.awardfood = "";
		this.awardmich = "";
		this.awardgem = "";
		this.awardomn = "";
		//this.awardgem = "";
		this.lienfood = "";
		this.lienmich = "";
		this.liengem = "";
		this.lienomn = "";
		
		//this.attribut2 = parametre2; this.ajout_distance = function(distance) { //alert("classe ajout distance" + distance);
		this.distance = distance;
		}
		this.ajout_coord = function(lat,lng) 
		{ //alert("classe ajout coord" + lat + lng);
		this.lat = lat;
		this.lng = lng;
		} 
		
		this.change_nom = function(nom) 
		{ //alert("classe ajout coord" + lat + lng);
		this.nom = nom;
		} 
		
		this.ajout_distance = function(distance) { 

        //alert("classe ajout distance" + distance);
		this.distance = distance;
		}
} 



function initialize_map() {

var rendererOptions = {
  map: map,
  suppressMarkers : true
}
   direction = new google.maps.DirectionsRenderer(rendererOptions);
  var chicago = new google.maps.LatLng(48.85296820,2.34990210);
  var mapOptions = {
    zoom:12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: chicago
  }
  
  
    map = new google.maps.Map(document.getElementById("Plan"), mapOptions);
    direction.setMap(map);
  }

  function initialize_old() {
    geocoder = new google.maps.Geocoder();
    //centre de Paris
    var latlng = new google.maps.LatLng(48.85296820,2.34990210);
    var mapOptions = {
      zoom: 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("Plan"), mapOptions);
	var maison = new google.maps.Marker
	({
		map: map,
		position: new google.maps.LatLng(48.8845705, 2.3801582)
	});
  }

function re_initGM(){
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
      center: mylatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    //centre de Paris
    //on récupère la distance la plu sgrance pour caler le zoom
    var mylatlng = new google.maps.LatLng(Monadresse.lat,Monadresse.lng);
    var mysuite = new google.maps.LatLng(tabreq[nb_reponses-1].lat,tabreq[nb_reponses-1].lng);
	map = new google.maps.Map(document.getElementById("Plan"), mapOptions)
	var circleOptions = {
    	center: mylatlng,
    	fillOpacity: 0,
    	strokeOpacity:0,
    	map: map,
    	radius: maxdist 
		}
		
	var myPoints = [];
   myPoints.push( new google.maps.LatLng(tabreq[nb_reponses-1].lat,tabreq[nb_reponses-1].lng)); // Paris
   //myPoints.push( new google.maps.LatLng(48.8123155, 2.2381535)); // Meudon	
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(mylatlng);
	bounds.extend(myPoints[0]);
	
	
	//var myCircle = new google.maps.Circle(circleOptions);
		//alert(nb_reponses);
	map.fitBounds(bounds);


  }

//envoi une requete
function Initialise_Affichage_liste(lieu)
{
//alert("aff=iche liste verif moi" + Monadresse.nom);
lc_div = document.getElementById("contenu_gauche");
//if (lc_div.innerHTML == ""){
var D_itineraire = Calcul_distance(Monadresse,lieu);
//lc_div.innerHTML += "<UL>" + lieu.nom + "<li>" + lieu.adresse + "</li>" + "</UL>";
// créer un lien vers une page qui affiche
}





function delete_double(nb_reponses)
{
	var i=0;
	j=0;
	var t =0;
	vide_tab_award();
	vide_tab_guide();
	vide_tabreq_double();
		
	//alert(nb_reponses);
	tabreq_ssdbl= [];
	tabreq.sort(function(a, b) { return a.numresto - b.numresto;});//tri par numresto
	
	var num;
	//boucle traitement par numresto
	
	while(i<nb_reponses-1)
	{
		num = tabreq[i].numresto;
		tab_award[t]=tabreq[i].award;
		tab_lien[t]=tabreq[i].lien;
		tab_guide[t]=tabreq[i].guide;
		if(tabreq[i].nom == "Anne de Bretagne") 
		{alert("anne");}
		if(num == tabreq[i+1].numresto)
		{
			
			
		
			tabreq_double[t]=tabreq[i];
			i++;
			
			t++;
		
			
			tab_award[t]=tabreq[i].award;
			tab_lien[t]=tabreq[i].lien;
			tab_guide[t]=tabreq[i].guide;
			
	
		}
		else
		{
			tabreq_double[t]=tabreq[i];
			tabreq_double.sort(function(a, b) { return a.guide - b.guide;});//tri par guide
			
			tabreq_ssdbl[j]=tabreq_double[0];
			for (var u=0;u<=nombre_guide;u++)
			{
			
				if(tabreq_double[u]!="")
				{
				tab_award[u]=tabreq_double[u].award;
				tab_lien[u]=tabreq_double[u].lien;
				tab_guide[u]=tabreq_double[u].guide;
				}
			}
			
			
			tabreq_ssdbl[j].award = new Array;
			tabreq_ssdbl[j].lien = new Array;
			tabreq_ssdbl[j].guide = new Array;
			
			for (var k=0;k<=nombre_guide;k++)
			{tabreq_ssdbl[j].award[k] = tab_award[k];
			tabreq_ssdbl[j].lien[k] = tab_lien[k];
			tabreq_ssdbl[j].guide[k] = tab_guide[k];
				vide_tabreq_double();
			}
			

	
			
			j++;
			i++;
			t=0;
			num = tabreq[i].numresto;
			tab_lien= [];
			
			vide_tab_award();
			vide_tab_guide();
		
		}

		
		
		
	}
	
	
	
}	
	
	
function vide_tab_award(){
tab_award= [];
tab_award[0]="";
tab_award[1]="";
tab_award[2]="";
tab_award[3]="";
tab_award[4]="";
tab_award[5]="";
tab_award[5]="";

}

function vide_tab_guide(){
tab_guide= [];
tab_guide[0]="";
tab_guide[1]="";
tab_guide[2]="";
tab_guide[3]="";
tab_guide[4]="";
tab_guide[5]="";
tab_guide[5]="";

}

function vide_tabreq_double(){
tabreq_double= [];
tabreq_double[0]="";
tabreq_double[1]="";
tabreq_double[2]="";
tabreq_double[3]="";
tabreq_double[4]="";
tabreq_double[5]="";
tabreq_double[5]="";

}		
	

function trie_affiche_tableau(param){
nb_reponses = tabreq.length;

delete_double(nb_reponses);

//trie un tableau tab d'objet selon la valeur de sa propriété distance
tabreq_ssdbl.sort(function(a, b) { return a.distance - b.distance;});


//nb_reponses = 10;

//on recup plus grande distance
//var maxdist=tabreq[nb_reponses-1].distance;
//re_initGM();

chaine_mode_transport= 
"<IMG id=\"TRANSIT\" class=\"travmode\" SRC=\"traintra.gif\"  width=\"13%\">"
+ "<IMG id=\"WALKING\" class=\"travmode\" SRC=\"pietontra.gif\" width=\"13%\">"
+ "<IMG id=\"DRIVING\" class=\"travmode\" SRC=\"voituretra.gif\" width=\"13%\">"
+ "<IMG id=\"BICYCLING\" class=\"travmode\" SRC=\"velotra.gif\" width=\"13%\">";



//var chaine_input= "<input id=\"train\" input=\"\" src=\"traintra.jpg\"  width=\"7%\" onclick=\"getvehicule(1);getmonadresse()\" type=\"image\" /><input id=\"walk\" input=\"\" src=\"Marche.jpg\" width=\"7%\" onclick=\"getvehicule(3);getmonadresse()\" type=\"image\" />";
//+ "<a id=\"velo\" class=\"travmode\" width=\"12%\" type=\"image\" /><IMG SRC=\"velotra.gif\"></a>";
//+ "<div id=\"velo\" class=\"travmode\"><IMG SRC=\"velotra.gif\"></div>";


//Pagination
//calcul du nombre de pages (10 result par page)
nb_pages=Math.ceil(tabreq_ssdbl.length/10);

//alert("n pages:" + nb_pages)
num_page=1;
//on ajoute le form de la nouvelle recherche
//$("#saisie").remove();
//$("#saisie_nouvelle").remove();
//$("#saisie_nouvelle").append("Nouvelle recherche <input id=\"monadresse_new\" size=\"65\" maxlength=\"255\" style=\"font-size:70%;\" type=\"text\"/><input type=\"button\" style=\"font-size:70%;\" value=\"Chercher!\" onclick=\"getmonadresse();\">");


  
  //document.getElementById("contenuP").style.display="none";
  //document.getElementById("saisie_nouvelle").style.display="none";
  






Affiche_page();


	
}

function setDisplay(item_clicked) {
				var modeAffichage;
				
				$('#onglets li').each(function(rang) {

					modeAffichage = $(this).hasClass('actif') ? '' : 'none';
					$('.item').eq(rang).css('display', modeAffichage);
					google.maps.event.trigger(map, 'resize');
					
					
					var item_cur=$('.item').eq(rang).attr("id");
					if ((item_cur == "plan-item") && (item_clicked == "plan"))
					{
						//alert(item_cur);
						//recharge la map
						if (flag_reload == "true")
						{
							reloadMap();	
						}
					
					
					}
				});
}


function reloadMap() {
alert("reload");
flag_reload = "false";
if (prev_infowindow!="0")
 			 {prev_infowindow.close();}
 		 infowindow = new google.maps.InfoWindow();
  
  			infowindow.setContent('<div><strong>' + tabreq_ssdbl[lieu_cur].nom + '</strong><br>' + tabreq_ssdbl[lieu_cur].budget + '<br>' 
  			+ tab_color[tabreq_ssdbl[lieu_cur].guide[0]] + " " + tab_color[tabreq_ssdbl[lieu_cur].guide[1]] + " " + tab_color[tabreq_ssdbl[lieu_cur].guide[2]]+ " " + tab_color[tabreq_ssdbl[lieu_cur].guide[3]] + " " + tab_color[tabreq_ssdbl[lieu_cur].guide[4]]
  			+  tabreq_ssdbl[lieu_cur].adresse);
 		 //alert("infos");

			infowindow.open(map, markers[lieu_cur]);
			prev_infowindow = infowindow;
        center = map.getCenter();
    google.maps.event.trigger(map, 'resize');         // fixes map display
    map.setCenter(center);                            // centers map correctly
}



function Affiche_page(){

direction.setMap(null);
//Efface_marker();

$('#haut').css('display', 'none');


$('#titre2').css('display', 'inline-block');
$('#onglets').css('display', 'block');

google.maps.event.trigger(map, "resize");
document.getElementById("contenuP").style.display="inline-block";

document.getElementById("haut").style.display="none";
//document.getElementById("saisie_nouvelle").style.display="block";


//-----------Affichage map au premier lancement-----------------//
//$(actif).css('display', 'none');
//$('#contenu').height("280px");
$('#plan').addClass('actif').siblings().removeClass('actif');
setDisplay();
//var actif = $('.actif').attr('id');
//actif = actif + "-item";
//alert(actif);
//$('#plan').css('display', '');



//$("#saisie_nouvelle").child("input").remove;


lc_div = document.getElementById("contenu_gauche");
lc_div.innerHTML = "";


ls_div = document.getElementById("saisie");
lc_div.innerHTML = "";

//on ajoute le form de la nouvelle recherche
//$("#saisie_nouvelle").append("<input class=\"inputarea\" id=\"monadresse_new\" name=\"monadresse\" size=\"65\" maxlength=\"255\" style=\"font-size:70%;\" type=\"text\"/><button type=\"button\" name=\"\" class=\"css3button\" style=\"font-size:70%;\" onclick=\"getmonadresse();\">Chercher!</button>");



i_deb = num_page * 10 -10;


//on compare 

if (num_page == nb_pages){
i_fin = tabreq_ssdbl.length;
}
else{i_fin = i_deb +10;}




//alert("next page");
$("#contenu_gauche").ready(function() {
   for(var i=i_deb; i < tabreq_ssdbl.length-1; i++) {
    	var lieu= "#lieu" + i;
		var suite = "#suite" +i;

	var chainegenre = "";
	if (tabreq_ssdbl[i].genre !="")
	{var chainegenre= 	 "<span style=\"font-size:80%;line-height:2em;\">" + tabreq_ssdbl[i].genre + "</span>" + "<br>" ;}
	
	var chainetel="";
	if (tabreq_ssdbl[i].phone !="")
	{var chainetel= 	 "<IMG width=\"7%\" SRC=\"tel2.gif\">" + "<span style=\"font-size:80%;line-height:3em;\">" + ": " +  tabreq_ssdbl[i].phone + "</span>" + "<br>";}
     //alert(tabreq[i].lien);
     $("#contenu_gauche").append("<div class=elem_lieu><div class=elem_lieu_gauche><div id=\"lieu" + i + "\" class=\"lieu\">" + "<span style=\"font-weight:bold;\">" + tabreq_ssdbl[i].nom + "</span>" + "<span style=\"font-size:70%;color:#777777;font-style:oblique;\">" + " - " + tabreq_ssdbl[i].distance/1000 + " km" + "</span>" + "<span style=\"font-size:80%;\" align=\"right\">" + " " + tabreq_ssdbl[i].budget + "</span>"+"<br>" 
		+ "<span><a style=\"font-size:90%;color:" + tab_color[tabreq_ssdbl[i].guide[0]] +";font-style:font-weight:bold;\" target=\"_blank\" href=\"" + tabreq_ssdbl[i].lien[0] + "\">" + tabreq_ssdbl[i].award[0]+ "</a></span><span> </span>"
		+ "<span><a style=\"font-size:90%;color:" + tab_color[tabreq_ssdbl[i].guide[1]] +";font-style:font-weight:bold;\" target=\"_blank\" href=\"" + tabreq_ssdbl[i].lien[1] + "\">" + tabreq_ssdbl[i].award[1]+ "</a></span><span> </span>" 
		+ "<span><a style=\"font-size:90%;color:" + tab_color[tabreq_ssdbl[i].guide[2]] +";font-style:font-weight:bold;\" target=\"_blank\" href=\"" + tabreq_ssdbl[i].lien[2] + "\">" + tabreq_ssdbl[i].award[2] + "</a></span><span> </span>"
		+ "<span><a style=\"font-size:90%;color:" + tab_color[tabreq_ssdbl[i].guide[3]] +";font-style:font-weight:bold;\" target=\"_blank\" href=\"" + tabreq_ssdbl[i].lien[3] + "\">" + tabreq_ssdbl[i].award[3] + "</a></span><span> </span>" 
		+ "<span><a style=\"font-size:90%;color:" + tab_color[tabreq_ssdbl[i].guide[4]] +";font-style:font-weight:bold;\" target=\"_blank\" href=\"" + tabreq_ssdbl[i].lien[4] + "\">" + tabreq_ssdbl[i].award[4] + "</a></span><span> </span>"
		+ "<span><a style=\"font-size:90%;color:" + tab_color[tabreq_ssdbl[i].guide[5]] +";font-style:font-weight:bold;\" target=\"_blank\" href=\"" + tabreq_ssdbl[i].lien[5] + "\">" + tabreq_ssdbl[i].award[5] + "</a></span></span>" + "<br>"
		+ "</div><div id=\"suite" + i + "\" class=\"suite\" style=\"display: none; \">" 
		+ chainegenre
		+ "<span style=\"font-size:80%;\">" + tabreq_ssdbl[i].adresse + "</span>" + "<br>"
		+ chainetel 
		+ "<div style=\"text-align: center;\">" + chaine_mode_transport + "</div>" 
		+"</div></div></div>");



	//mise à blanc du tableau des 
	//vide_tab_guide();
	
	//affichage carte
		MarkLatLng(tabreq_ssdbl[i]);


   }


   
});

 //resize_div();
//var coucou = "coucouc";
	//	var h = $("#contenu_gauche").height();
	//	$("#contenu_Plan").height(h);

//$("IMG").click(alert("zouzou"));
// on modifie la hauteuir de plan en fonction de la hauteur de contenu_gauche

		

		
	p_suite_old = $(this).children(".elem_lieu_gauche").children(".suite");
	p_suite_old_id=$(this).children(".elem_lieu_gauche").children(".suite").attr('id');
	$(".elem_lieu").bind('click',function(){
		//alert("zouzou");
		p_suite = $(this).children(".elem_lieu_gauche").children(".suite");
		p_suite_id=$(this).children(".elem_lieu_gauche").children(".suite").attr('id');
				lieu_cur=p_suite_id.substr(5);

		//var lieu_cur = $(this).parent(".elem_lieu").attr('id');// on recup l'id du p contenant l'icone ex: suite1
		//lieu_cur = lieu_cur.substr(5);
	

	//$('#plan').addClass('actif').siblings().removeClass('actif');
	//setDisplay();
		//lieu_cur=tabreq_ssdbl[lieu_cur].adresse;
			
		
			

			
			
			
		if(p_suite_id != p_suite_old_id) {
		flag_reload = "true";
			$(p_suite_old).slideUp(400);
			$(p_suite).slideDown(400,function() {

		//Redimensionne();
		//$("#Plan").width("100%");
		//google.maps.event.trigger(map, "resize");
		//lt_div = document.getElementById("Panel");
		//lt_div.innerHTML = "";
		
		
		//fitMap(i_deb,i_fin);
  		});
  		

			
			
			
			}
			

		p_suite_old = p_suite;
		p_suite_old_id=p_suite_id;
		//alert(aaaa);






		})
	;



if (num_page != 1)
{$("#contenu_gauche").append("<span><button type=\"button\" class=\"css3button\" style=\"font-size:70%;\" onclick=\"clearMarkers();num_page--;Affiche_page(num_page);\">Page précédente</button><\span>");}


if (num_page != nb_pages)
{$("#contenu_gauche").append("<span><button type=\"button\" class=\"css3button\" style=\"font-size:70%;\" onclick=\"clearMarkers();num_page++;Affiche_page(num_page);\">Page suivante</button><\span>");}



Redimensionne();
	$("#Plan").width("100%");
google.maps.event.trigger(map, "resize");
fitMap(i_deb,i_fin);
				


	$(".travmode").bind('click',function(){
	
	//alert("showroute");

	//map.setCenter(new google.maps.LatLng(Monadresse.lat,Monadresse.lng));
	var mode_deplacement = $(this).attr("id");
	
	var zarrivee = $(this).parent("div").parent("div").attr('id');// on recup l'id du p contenant l'icone ex: suite1
	zarrivee = zarrivee.substr(5);
	//alert(zarrivee);
	zarrivee = tabreq_ssdbl[zarrivee].adresse;
	//var zarrivee = tabreq[zarrivee].adresse + " " + tabreq[zarrivee].cp;
    var depart = Monadresse_O.adresse;
	
	//alert("fffffff"+ mode_deplacement + "zarrivee" + zarrivee + "kjlj" + depart);
	
	ShowRoute(depart, zarrivee, mode_deplacement);
		
	})
	;


}

function Redimensionne() 
{
    	//var h = "260px";
		//alert(h);

		//var h_saisie = $("#saisie_nouvelle").height();
		//alert(h);


		//$("#Plan").height(h);
		//$("#Plan").height("100%");
		
}

function fitMap(deb,fin) 
{

    var bounds = new google.maps.LatLngBounds();
   
      /* Déclaration et remplissage du tableau qui contiendra nos points, objets LatLng. */
   var myPoints = [];
   j=0;
   /* Déclaration des options de la map */ 
   var options = {
    /*zoom : 7,
    center: latlng, */
    //  ici, ces 2 valeurs ne sont plus utiles car calculées automatiquement
    mapTypeId: google.maps.MapTypeId.ROADMAP
   }

   /* Ici, nous déclarons l'élément html ayant pour id "map" comme conteneur de la map *
	
   /* Boucle sur les points afin d'ajouter les markers à la map
   et aussi d'étendre ses limites (bounds) grâce à la méthode extend */ 
   for(var i=deb; i < fin; i++){
   //alert("i:" + i);
   	myPoints.push( new google.maps.LatLng(tabreq_ssdbl[i].lat,tabreq_ssdbl[i].lng));
   	//alert("2");
    bounds.extend(myPoints[j]);
    j++;
    //alert("2");
   	//MarkLatLng(tabreq_ssdbl[i]);

   }

   /* Ici, on ajuste le zoom de la map en fonction des limites  */ 
   map.fitBounds(bounds);
   map.setCenter(new google.maps.LatLng(Monadresse.lat,Monadresse.lng));

}


function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}



function ShowRoute(depart, arrivee, mode_deplacement){
//map = new google.maps.Map(document.getElementById("Plan"), mapOptions);
	


alert("showroute");
direction.setMap(null);

  //direction.suppressMarkers = true;
  //direction.setDirections({routes: []});
  //direction.set('directions', null);
    origin      = depart; // Le point départ
    destination = arrivee; // Le point d'arrivé
    //alert("dep" + origin + "arr" + destination);
    if(origin && destination){
        var request = {
            origin      : origin,
            destination : destination,
            travelMode  : google.maps.TravelMode[mode_deplacement],// + mode_deplacement
        }
        
 alert("stop8");       
        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            if(status == google.maps.DirectionsStatus.OK){
            
            	$("#Plan").width("64%");
	google.maps.event.trigger(map, "resize");
                //direction.setDirections(response);
                direction.setDirections(response);
                //direction.set('directions', null);
                direction.setMap(map); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
            	direction.setPanel(document.getElementById("Panel"));
            
            }
            else {alert("Itinéraire indiponible.");}
        });
    } 
    //http://code.google.com/intl/fr-FR/apis/maps/documentation/javascript/reference.html#DirectionsRequest
	
}

function affiche_lieu(lieu)
{
//alert("aff=iche liste verif moi" + Monadresse.nom);
//lc_div = document.getElementById("contenu_gauche");
//if (lc_div.innerHTML == ""){
//var D_itineraire = Calcul_distance(Monadresse,lieu);
lc_div.innerHTML += "<UL>" + lieu.nom + "<li>" + lieu.distance/1000 + "km" + "</li>" + "</UL>";
MarkLatLng(lieu);
// créer un lien vers une page qui affiche
}


function addThisMarker(point,m){
    var marker = new google.maps.Marker({position: point});
    return marker;
   }


function MarkLatLng(lieu) {
//document.write(nom);
var myLatlng = new google.maps.LatLng(lieu.lat,lieu.lng);
//var nom = addslashes(lieu.nom);
var marker = new google.maps.Marker({
							position: myLatlng,
							map: map,
							icon: "restaurant.png",
							title: lieu.nom
							}
							);
markers.push(marker);


  google.maps.event.addListener(marker, 'click', function() {
  if (prev_infowindow!="0")
  {prev_infowindow.close();}
  infowindow = new google.maps.InfoWindow();
  
  infowindow.setContent('<div><strong>' + lieu.nom + '</strong><br>' 
  						+ lieu.budget + '<br>' 
  						+ '<span style=\"font-style:italic\">' + tab_cor_guide[lieu.guide[0]] + " " + tab_cor_guide[lieu.guide[1]] + " " + tab_cor_guide[lieu.guide[2]] + " " 
  						+ tab_cor_guide[lieu.guide[3]] + " " + tab_cor_guide[lieu.guide[4]] + " " + tab_cor_guide[lieu.guide[5]] + '</span><br>'
   
  						+ lieu.adresse);
  //alert("infos");
	infowindow.open(map, marker);
	prev_infowindow = infowindow;

 
  });
}




function Initialise_Affichage_Tab()
{

	lc_div = document.getElementById("contenu_gauche");
	n_distance=nbre_lieux;
	//alert("nb lieux" +  nbre_lieux);
	var n=0;
	//calcul non google bloc à commenter si utilisation google
	while (n<=n_distance-1){
		//alert("n" + n);
		Calcul_distance(Monadresse_O,tabreq[n]);
		n=n+1;
		}
	trie_affiche_tableau("caca");
	//calcul google recursif
	//Calcul_distance_Google(Monadresse_O,tabreq[0]);
}

function Calcul_distance(depart,arrivee){
//calcule la distance et la met dans l'objet arrivée
//distance = Math.round(Math.sqrt((arrivee.lat - depart.lat)*(arrivee.lat - depart.lat)+(arrivee.lng - depart.lng)*(arrivee.lng - depart.lng))*1000);
distance = calDistance(depart.lat,depart.lng,arrivee.lat,arrivee.lng);
//alert(distance);
arrivee.ajout_distance(distance);
}



function convertRad(input){
        return (Math.PI * input)/180;
}
 
function calDistance(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre){
  //alert("dist");   
        R = 6378000; //Rayon de la terre en mètre
 
    lat_a = convertRad(lat_a_degre);
    lon_a = convertRad(lon_a_degre);
    lat_b = convertRad(lat_b_degre);
    lon_b = convertRad(lon_b_degre);
     
    d = R * (Math.PI/2 - Math.asin( Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)));
	d= Math.round(d);
    return d;
}


function VerifListeAction() {
	//modifie l'element selectionné dans la liste actions
	//document.write('toto');
	var ObjListe = document.getElementById('ListeAction');
	var SelIndex = ObjListe.selectedIndex;
	var SelValue = ObjListe.options[ObjListe.selectedIndex].value;
	//var SelText = ObjListe.options[ObjListe.selectedIndex].text;
	action = SelValue;
	aParams = {
		"type": "Action",
		"action": action,
		"distance": Distance
		};
	//document.write(action);
} //VerifListeDistance()


function VerifListeDistance() {
	//modifie l'element selectionné dans la liste actions
	//document.write('toto');
	var ObjListe = document.getElementById('ListeDistance');
	var SelIndex = ObjListe.selectedIndex;
	var SelValue = ObjListe.options[ObjListe.selectedIndex].value;
	var SelText = ObjListe.options[ObjListe.selectedIndex].text;
	Distance = SelValue;
	aParams = {
	"type": "Action",
	"action": action,
	"distance": Distance
	};
	//document.write(Distance);
}

function recupGPS()
{
alert('recupGPS');
zUrl = "RecupGPS.php";
//FScript.src = zUrl;
var DSLScript = document.createElement("script");
DSLScript.src = zUrl;
DSLScript.type = "text/javascript";
document.body.appendChild(DSLScript);
document.body.removeChild(DSLScript);
}

function ecrisGPS()
{
	var t=0;
	alert('ecrisGPS');
	zUrl = "PutGPS.php";
	//alert(m);
	//alert('crotte');
	//alert(tabreq[10]);
	while (tabreq[t].nom != "")
	{
	alert(tabreq[t].nom);
	//alert(tabreq[t].id);
	reqParams = {
	"nom": tabreq[t].nom,
	"lat": tabreq[t].lat,
	"lng": tabreq[t].lng,
	"id": tabreq[t].idbase
	};
	sendRq(zUrl,reqParams);
	//alert(tabreq[t].nom);
	t=t+1;
	}
	//alert('fin de boucle');
	//var DSLScript = document.createElement("script");
	//DSLScript.src = zUrl;
	//DSLScript.type = "text/javascript";
	//document.body.appendChild(DSLScript);
	//document.body.removeChild(DSLScript);
} 

function sendRq(sUrl, oParams) {
//alert("surl" + sUrl);
//alert(sUrl);
for (sName in oParams) {
	if (sUrl.indexOf("?") != -1) {
	sUrl += "&";
	} 
	else {
	sUrl += "?";
	}
	sUrl += encodeURIComponent(sName) + "=" + encodeURIComponent(oParams[sName]);
}
//sUrl = sUrl + "&" + dist;
//test l'url
//alert("construction url OK:" + sUrl);
//alert(sUrl);
$.ajax( {
		type: "GET",
		url: sUrl,
		success: function(data) {
		//response = data;
		//alert(data);
		tabreq = [];
		nbre_lieux = 0;
		//n_distance = //var lieu = xml.getElementsByTagName("lieu");
		//nom=lieu.item(0).firstChild.data;
		//alert("nomreq" + nom);
		var parser=new DOMParser();
		var docXML=parser.parseFromString(data.trim(),'text/xml');
		$(docXML).find('lieu').each( function()
						{
						//alert("ok dans parser");
						//nbre_lieux++;
						var id = $(this).find('id').text();
						var adresse = $(this).find('adresse').text();
						var nom = $(this).find('nom').text();
						var cp = $(this).find('cp').text();
						var lat = $(this).find('lat').text();
						var lng = $(this).find('lng').text();
						var phone = $(this).find('phone').text();
						var budget = $(this).find('budget').text();
						var action = $(this).find('action').text();
						var genre = $(this).find('genre').text();
						var award = $(this).find('award').text();
						var lien = $(this).find('lien').text();
						var numresto = $(this).find('numresto').text();
						var guide = $(this).find('guide').text();
						//alert("genre");
						tabreq[nbre_lieux]= new MonLieu(nom,adresse,id,cp,lat,lng,action,budget,phone,genre,null,award,lien,numresto,guide);
						//alert("result" + id + nom + adresse);
						nbre_lieux++;
						});
		//alert(nbre_lieux);
		Initialise_Affichage_Tab(); }
		});
}

function initialisation ()  {
tabreq = [];
tabreq_ssdbl = [];
tabreq_numresto = [];
markers = [];

}

function getmonadresse(address) {
initialisation();
//alert(address);
//address = document.forms["form1"].elements["monadresse"].value;
//Monadresse = document.forms["form1"].elements["monadresse"].value;
//address = document.getElementById('monadresse').value;
//Monadresse = document.getElementById('monadresse').value;

geocoder = new google.maps.Geocoder(); geocoder.geocode( { 'address': address,'region':'fr'}, function(results, status) 
	{
	if (status == google.maps.GeocoderStatus.OK) {
			var marker = new google.maps.Marker(
			{
			map: map,
			//center: position: results[0].geometry.location,
			title: "Ma place"
			}
			);
			Lat=results[0].geometry.location.lat();
			Lng=results[0].geometry.location.lng();
			//alert("codead" + Lat + Lng);
			var myLatlng = new google.maps.LatLng(Lat,Lng);
			//MarkLatLng(Lat,Lng,nom);
			//return myLatlng;
			var mapOptions = {
			mapTypeControl: true,
    		mapTypeControlOptions: {
        		style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        		position: google.maps.ControlPosition.TOP_RIGHT
    		},
    		zoomControl: true,
    		zoomControlOptions: {
        		style: google.maps.ZoomControlStyle.SMALL,
        		position: google.maps.ControlPosition.TOP_RIGHT
    		},
    		panControl: false,
			zoom: 14,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			map = new google.maps.Map(document.getElementById("Plan"), mapOptions);
			var depart = new google.maps.Marker
			({
			map: map,
			icon: 'flagman.png',
			title: "Je suis ici",
			position: new google.maps.LatLng(Lat, Lng),
			});
			//alert(Lat);
			aParams= {
			"type": "Action",
			"action": action,
			"distance": Distance,
			"monadresse_lat": Lat,
			"monadresse_lng": Lng
			};
			//alert("changé" + Lat); //sendRq(sUrl,aParams);
			Monadresse= {
			nom: "Moi",
			adresse: address,
			lat: Lat,
			lng: Lng
			};
			
			//crotte = results;
			//alert(results[0].address_components[0].street_address);
   

			//MonLieu(nom,adresse,idbase,cp,lat,lng,action,budget,phone,distance)
			Monadresse_O = new MonLieu(Monadresse.nom,Monadresse.adresse,null,null,Monadresse.lat,Monadresse.lng,null, null,null,null,null);
			//alert("obejt monadresse" + Monadresse_O.lat);
			sendRq(sUrl,aParams);
			} 
		else { // adresse non geolocalisable
		alert("Désolé, nous ne pouvons pas localiser cette adresse!");
		}
	});
}

function getvehicule(vehicule) {
//1 auto
//2 velo
//3 walk
alert("monadresse" + Monadresse);
	switch(vehicule)
	{
	case "voiture":
	//alert("travelmode:"+vehicule);
	travelmode = google.maps.DirectionsTravelMode.DRIVING
	break;
	case "velo":
	travelmode = google.maps.DirectionsTravelMode.BICYCLING
	break;
	case "pieton":
	travelmode = google.maps.DirectionsTravelMode.WALKING
	break; 
	case "train":
	travelmode = google.maps.DirectionsTravelMode.TRANSIT
	break; }
}


function resize_div(){
	//alert("resize");

	Redimensionne();

	
	fitMap(i_deb,i_fin);
	
}

	
	window.onresize=resize_div;

 		 google.maps.event.addDomListener(window, 'load', initialize_map);

		$(function() {
		var nom_item="";
			//$('#onglets').css('display', 'block');
			$('#onglets').click(function(event) {
				var actuel = event.target;

				
				
				if (!/li/i.test(actuel.nodeName) || actuel.className.indexOf('actif') > -1) {
					//alert(actuel.nodeName)
					//alert("idem");
					return;
				}
				
				$(actuel).addClass('actif').siblings().removeClass('actif');
				//alert($(actuel).attr('class'));
				nom_item=$(actuel).attr('id');
				
				alert("element clicke" + nom_item);
				//if (nom_item=="search")
				//	{$('#contenu').height("70%");}
				//else {$('#contenu').height("70%");}
			
				
				

				setDisplay(nom_item);
			});
			//alert("nom imtem" + nom_item);
			setDisplay(nom_item);
		});
		
		
		      function initialize() {
        var mappiOptions = {
          center: new google.maps.LatLng(2, 42),
          zoom: 8
        };
        var mappi = new google.maps.Map(document.getElementById("Plan"),
            mappiOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
		
