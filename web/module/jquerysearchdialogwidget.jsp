<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/template/include.jsp"%>
<%@ include file="/WEB-INF/template/header.jsp"%>

<openmrs:htmlInclude
	file="/moduleResources/jquerysearchdialog/scripts/jquery-1.4.2.js" />
<openmrs:htmlInclude
	file="/moduleResources/jquerysearchdialog/scripts/jquery.dataTables.js" />
<openmrs:htmlInclude
	file="/moduleResources/jquerysearchdialog/css/dataTables.css" />


<openmrs:htmlInclude
	file="/moduleResources/jquerysearchdialog/scripts/jquery.centerinclient.js" />


<openmrs:htmlInclude
	file="/moduleResources/jquerysearchdialog/scripts/jquery.searchdialog.js" />
<openmrs:htmlInclude
	file="/moduleResources/jquerysearchdialog/css/jquerysearchdialog.css" />
<script src="<openmrs:contextPath/>/dwr/interface/DWRConceptService.js"></script>
<script src="<openmrs:contextPath/>/dwr/interface/DWRPatientService.js"></script>
<script
	src="<openmrs:contextPath/>/dwr/interface/DWRConceptByClassService.js"></script>



<script type="text/javascript">
$j = jQuery.noConflict();
$j(document).ready(function() {


	// Concepts search
	$j('#conceptSearchButton').jquerysearchdialog(function(searchTerm, callback){
		DWRConceptByClassService.FindConceptsByClass(searchTerm, $j("#selectedClass").val(), true, objectsFound);
		function objectsFound(concepts) {

			if (typeof(concepts[0]) == "string" ) {
				callback([]);
				return;
			}
			var allData = new Array();
			for (x = 0; x < concepts.length; x++) {
				var fila = new Array();
				fila[0] = concepts[x].conceptId.toString();
				fila[1]  =  concepts[x].name; 
			
				allData[x] = fila;
			}
			callback(allData); // send it to the table through its callback
		}
	}, function(selectedRow) { // on success
		$j("#foo").val(selectedRow[0]);
		$j("#zas").val(selectedRow[1]);
	}, { 
		oTitles : ["concept id", "concept name"],
		oHiddenCols : [0], 
		oPosition: "relative" // also supports: centered and custom 
		}

	);

});


</script>


<fieldset><legend>Find concepts by class name</legend> Select class name: <select
	id="selectedClass">

	<c:forEach items="${classes}" var="item">
		<option value="${item.name }">${item.name }</option>
	</c:forEach>
</select>

<button id="conceptSearchButton">search concepts</button>
</fieldset>

<fieldset><legend>Result</legend> <label>concept
id: </label> <input id="foo" /> <label>concept name: </label> <input id="zas" />
</fieldset>