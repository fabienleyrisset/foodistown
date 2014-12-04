

<?php 	
		
		header('Content-Type: text/html; charset=utf-8');
		$type = $_GET['type'];
		$action = $_GET['action'];
		$distance = $_GET['distance'];
		$malat = $_GET['monadresse_lat'];
		$malng = $_GET['monadresse_lng'];
		$nombre_answer = $_GET['nombre'];
		$distance_max = $_GET['distance_max'];
		//$debug ="debugtot";
					
		$serveur = "localhost";
		$nom_base = "Imout";
		$login = "root";
		$pwd = "root";
		
		mysql_connect ($serveur,$login,$pwd) or die ('ERREUR '.mysql_error());
		mysql_set_charset( 'utf8' );
		// sélection de la base de données
		mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error()); 
		// sélection de la base de données
		mysql_select_db ($nom_base) or die ('ERREUR '.mysql_error()); 
	
		$distance=$distance/1000;
		//$req1 = "SELECT * FROM lieuxgetm WHERE ( 6371 * acos( cos( radians( $malat ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( $malng ) ) + sin( radians( $malat  ) ) * sin( radians( latitude) ) ) )  < $distance  AND $type LIKE '%$action%'";

		//$req1 = "SELECT TOP 6 FROM lieuxgetm ORDER BY ( 6371 * acos( cos( radians( $malat ) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( $malng ) ) + sin( radians( $malat  ) ) * sin( radians( latitude) ) ) )  < $distance  AND $type LIKE '%$action%'";
		
		
		//distance entre A et B
		//distance au carré=(latitude-malat)²+(longitude-malng)²
		
		//les 10 plus proches à vol d'oiseau
		$req1 = "SELECT * FROM lieufab ORDER BY ((latitude-$malat)*(latitude-$malat)+(longitude-$malng)*(longitude-$malng)) LIMIT 60";

		
		//ajouter ORDER BY
		$result1 = mysql_query($req1);
		
		//$nbreLignes = mysql_num_rows($result1);
		//header("Content-type: text/xml");
		$xml = '<?xml version="1.0" encoding="UTF-8"?>';
		$xml .= '<lieux>';
		
		
		while ($ligne = mysql_fetch_array($result1)){
	
		$xml .= '<lieu>';
		$xml .= '<id>' . $ligne["id"] . '</id>';
		$xml .= '<numresto>' . $ligne["numresto"] . '</numresto>';
		$xml .= '<nom>' . $ligne["Nom"] . '</nom>';
		$xml .= '<adresse>' . $ligne["Adresse"] . '</adresse>';
		$xml .= '<phone>' . $ligne["Phone"] . '</phone>';
		$xml .= '<budget>' . $ligne["Budget"] . '</budget>';
		$xml .= '<genre>' . $ligne["Genre"] . '</genre>';
		$xml .= '<action>' . $ligne["Action"] . '</action>';
		$xml .= '<award>' . $ligne["Award"] . '</award>';
		$xml .= '<lien>' . $ligne["Lien"] . '</lien>';
		$xml .= '<cp>' . $ligne["cp"] . '</cp>';
		$xml .= '<lat>' . $ligne["latitude"] . '</lat>';
		$xml .= '<lng>' . $ligne["longitude"] . '</lng>';
		$xml .= '<ville>' . $ligne["Ville"] . '</ville>';
		$xml .= '<guide>' . $ligne["Guide"] . '</guide>';
		$xml .= '</lieu>';
		
		

		}
		$xml .= '</lieux>';
		$file = 'people.xml';
		// Ouvre un fichier pour lire un contenu existant
		$current = file_get_contents($file);
		// Ajoute une personne
		$current .= $xml;
		// Écrit le résultat dans le fichier
		//file_put_contents($file, $current);
		
		echo $xml;
		?>