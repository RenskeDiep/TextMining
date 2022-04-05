// Angular script for sending/retrieving SPARQL data (copy-changed from below)
angular.module('K&DApplication', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http){

	$scope.startStreamultis= function(){
    document.getElementById("NetflixResults>tbody").innerHTML = "";
    document.getElementById("HuluResults>tbody").innerHTML = "";
    document.getElementById("DisneyPlusResults>tbody").innerHTML = "";
    document.getElementById("PrimeVideoResults>tbody").innerHTML = "";

    // Sparql Endpoint for Querying
		$scope.mySparqlEndpoint = $scope.myInputEndPoint ;

    if ($scope.myTitle){
      $scope.mySparqlTitle = "stream:" + $scope.myTitle ;
    } else {
      $scope.mySparqlTitle = " ?title " ;
    };

    if ($scope.myActor){
      $scope.mySparqlActor = "stream:" + $scope.myActor ;
    } else {
      $scope.mySparqlActor = " ?actor " ;
    };

    if ($scope.myAgeRestriction) {
      $scope.mySparqlAgeRestriction = "stream:"+ $('input[name="ageRestriction"]:checked').val();
    } else {
      $scope.mySparqlAgeRestriction = " ?ageRestriction " ;
    };

    if ($scope.myGenre) {
      $scope.mySparqlGenre = "stream:" + $('input[name="genres"]:checked').val();
    } else {
      $scope.mySparqlGenre = " ?genre " ;
    };

    // Netflix Creating sparql query based on selected filters
    $scope.myInputQuery = [
      "PREFIX mapper: <http://www.ontotext.com/mapper/>",
      "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
      "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
      "PREFIX geo: <http://www.opengis.net/ont/geosparql#>",
      "PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
      "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>",
      "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>",
      "PREFIX stream: <http://www.semanticweb.org/eliseProjectOntology3>",
      "PREFIX dbo: <http://dbpedia.org/ontology/>",
      "SELECT ?title ?genre ?ageRestriction ?actor", // + $scope.myTitle + " " + $scope.myActor,
      "WHERE {",
        "stream:Netflix stream:contains " + $scope.mySparqlTitle,
        $scope.mySparqlTitle + " stream:hasGenre " + $scope.mySparqlGenre,
        $scope.mySparqlTitle + " stream:hasAgeRestriction " + $scope.mySparqlAgeRestriction,
        $scope.mySparqlTitle + " stream:hasActor " + $scope.mySparqlActor,
      "} limit 5"
    ].join(" ");
		$scope.mySparqlQuery = encodeURI($scope.myInputQuery).replace(/#/g, '%23');

    // Send GET request with inserted SPARQLEndpoint by user + query created conforming the selected filters
		$http( {
			method: "GET",
			url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
		} )
    //insert data into table
    .success(function(data, status ) {

			// now iterate on the results
      angular.forEach(data.results.bindings, function(val) {
        $("#NetflixResults>tbody").append(`
              <tr>
                <td><b>${val.title.value}</b></td>
                <td>${val.genre.value}</td>
                <td>${val.ageRestriction.value}</td>
                <td>${val.actor.value}</td>
              </tr>
        `)};
      });
    })
		.error(function(error ){
			console.log('Error during query retrieval!'+error);
		});

    // Hulu Creating sparql query based on selected filters
    $scope.myInputQuery = [
      "PREFIX mapper: <http://www.ontotext.com/mapper/>",
      "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
      "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
      "PREFIX geo: <http://www.opengis.net/ont/geosparql#>",
      "PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
      "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>",
      "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>",
      "PREFIX stream: <http://www.semanticweb.org/eliseProjectOntology3>",
      "PREFIX dbo: <http://dbpedia.org/ontology/>",
      "SELECT ?title ?genre ?ageRestriction ?actor", // + $scope.myTitle + " " + $scope.myActor,
      "WHERE {",
        "stream:Hulu stream:contains " + $scope.mySparqlTitle,
        $scope.mySparqlTitle + " stream:hasGenre " + $scope.mySparqlGenre,
        $scope.mySparqlTitle + " stream:hasAgeRestriction " + $scope.mySparqlAgeRestriction,
        $scope.mySparqlTitle + " stream:hasActor " + $scope.mySparqlActor,
      "} limit 5"
    ].join(" ");
		$scope.mySparqlQuery = encodeURI($scope.myInputQuery).replace(/#/g, '%23');

    // Send GET request with inserted SPARQLEndpoint by user + query created conforming the selected filters
		$http( {
			method: "GET",
			url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
		} )
    //insert data into table
    .success(function(data, status ) {

			// now iterate on the results
      angular.forEach(data.results.bindings, function(val) {
        $("#HuluResults>tbody").append(`
              <tr>
                <td><b>${val.title.value}</b></td>
                <td>${val.genre.value}</td>
                <td>${val.ageRestriction.value}</td>
                <td>${val.actor.value}</td>
              </tr>
        `)};
      });
    })
		.error(function(error ){
			console.log('Error during query retrieval!'+error);
		});

    // Disney Plus Creating sparql query based on selected filters
    $scope.myInputQuery = [
      "PREFIX mapper: <http://www.ontotext.com/mapper/>",
      "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
      "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
      "PREFIX geo: <http://www.opengis.net/ont/geosparql#>",
      "PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
      "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>",
      "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>",
      "PREFIX stream: <http://www.semanticweb.org/eliseProjectOntology3>",
      "PREFIX dbo: <http://dbpedia.org/ontology/>",
      "SELECT ?title ?genre ?ageRestriction ?actor", // + $scope.myTitle + " " + $scope.myActor,
      "WHERE {",
        "stream:DisneyPlus stream:contains " + $scope.mySparqlTitle,
        $scope.mySparqlTitle + " stream:hasGenre " + $scope.mySparqlGenre,
        $scope.mySparqlTitle + " stream:hasAgeRestriction " + $scope.mySparqlAgeRestriction,
        $scope.mySparqlTitle + " stream:hasActor " + $scope.mySparqlActor,
      "} limit 5"
    ].join(" ");
		$scope.mySparqlQuery = encodeURI($scope.myInputQuery).replace(/#/g, '%23');

    // Send GET request with inserted SPARQLEndpoint by user + query created conforming the selected filters
		$http( {
			method: "GET",
			url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
		} )
    //insert data into table
    .success(function(data, status ) {

			// now iterate on the results
      angular.forEach(data.results.bindings, function(val) {
        $("#DisneyPlusResults>tbody").append(`
              <tr>
                <td><b>${val.title.value}</b></td>
                <td>${val.genre.value}</td>
                <td>${val.ageRestriction.value}</td>
                <td>${val.actor.value}</td>
              </tr>
        `)};
      });
    })
		.error(function(error ){
			console.log('Error during query retrieval!'+error);
		});

    // Prime Video Creating sparql query based on selected filters
    $scope.myInputQuery = [
      "PREFIX mapper: <http://www.ontotext.com/mapper/>",
      "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>",
      "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
      "PREFIX geo: <http://www.opengis.net/ont/geosparql#>",
      "PREFIX foaf: <http://xmlns.com/foaf/0.1/>",
      "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>",
      "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>",
      "PREFIX stream: <http://www.semanticweb.org/eliseProjectOntology3>",
      "PREFIX dbo: <http://dbpedia.org/ontology/>",
      "SELECT ?title ?genre ?ageRestriction ?actor", // + $scope.myTitle + " " + $scope.myActor,
      "WHERE {",
        "stream:PrimeVideo stream:contains " + $scope.mySparqlTitle,
        $scope.mySparqlTitle + " stream:hasGenre " + $scope.mySparqlGenre,
        $scope.mySparqlTitle + " stream:hasAgeRestriction " + $scope.mySparqlAgeRestriction,
        $scope.mySparqlTitle + " stream:hasActor " + $scope.mySparqlActor,
      "} limit 5"
    ].join(" ");
		$scope.mySparqlQuery = encodeURI($scope.myInputQuery).replace(/#/g, '%23');

    // Send GET request with inserted SPARQLEndpoint by user + query created conforming the selected filters
		$http( {
			method: "GET",
			url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
		} )
    //insert data into table
    .success(function(data, status ) {

			// now iterate on the results
      angular.forEach(data.results.bindings, function(val) {
        $("#PrimeVideoResults>tbody").append(`
              <tr>
                <td><b>${val.title.value}</b></td>
                <td>${val.genre.value}</td>
                <td>${val.ageRestriction.value}</td>
                <td>${val.actor.value}</td>
              </tr>
        `)};
      });
    })
		.error(function(error ){
			console.log('Error during query retrieval!'+error);
		});

	};

};
