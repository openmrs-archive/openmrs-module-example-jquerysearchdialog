(function($) {
	

	var _elements;

	
	/***************************************************************************
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * 
	 * This plugin allows to bind a button to a dialog with an embedded dataTable
	 * with two callbacks. This plugin return a reference to itself for chaining
	 * as used frequently in JQuery plugins.
	 * 
	 * Usage example:
	 * 
	 * <openmrs:htmlInclude 	file="/moduleResources/yourmodule/scripts/jquery-1.4.2.js" />
     * <openmrs:htmlInclude	file="/moduleResources/yourmodule/scripts/jquery.dataTables.js" />
 	 * <openmrs:htmlInclude	file="/moduleResources/yourmodule/css/dataTables.css" />
	 * <openmrs:htmlInclude	file="/moduleResources/yourmodule/scripts/jquery.searchdialog.js" />
	 * <openmrs:htmlInclude	file="/moduleResources/yourmodule/css/jquerysearchdialog.css" />
	 * <script src="<openmrs:contextPath/>/dwr/interface/DWRConceptService.js"></script>
	 * 
	 * <script type="text/javascript">
	 * $j = jQuery.noConflict();
     * $j(document).ready(function() {
     * 
	 * // Concepts search
	 * $j('#conceptSearchButton').jquerysearchdialog(
	 * 	function(searchTerm, callback){
	 *
	 * 		DWRConceptService.findConcepts(searchTerm, false, null, null, null, null, false,  objectsFound);
	 * 
	 * 		function objectsFound(concepts) {
	 *
	 *			if (typeof(concepts[0]) == "string" ) {
	 *				callback([]);
	 *				return;
	 * 			}
	 *			var allData = new Array();
	 * 			for (x = 0; x < concepts.length; x++) {
	 *				var fila = new Array();
	 *  			fila[0] = concepts[x].conceptId.toString();
	 * 				fila[1]  =  concepts[x].name; 
	 *				allData[x] = fila;
	 * 			}
  	 * 			callback(allData);
	 * 		}
	 * }, 
	 * function(selectedRow) { // here you have the selected row
	 * 		$j("#conceptIdTextField").val(selectedRow[0]);
	 *		$j("#conceptNameTextField").val(selectedRow[1]);
	 * }, { 
	 *		oTitles : ["concept id", "concept name"],
	 *		oHiddenCols : [0], 
	 *		oPosition: "relative" // will appear next to the button
	 *	   });
	 *	});
	 *
	 *
	 * </script> 
	 * 
	 * <button id="conceptSearchButton">Search Concepts</button>
	 * concept id:  <input id="conceptIdTextField" /> 
	 * concept name: <input id="conceptNameTextField" />
	 *
	 * ****************
	 * Options:
	 * 
	 *  { 
	 * 		width : 300,
	 *		dataTableLanguage: { // language to pass to dataTable, see reference below 
	 *			
	 *		},
   	 *		oLanguage: {
	 *   		"sClose" :"Close",
	 *  		"sSearchDialog":"Search Dialog"
	 * 		
	 *		},
	 *		oTitles  : ["col1", "col2"], // the titles of columsn,  IMPORTANT an array of titles, the data passed to searchRealized
	 *      updateCallback needs to have the same number of items that the
	 *      number of titles
	 *		oHiddenCols : [], // columns to hide in the dataTable, an array of integer from
	 *      zero to hide some cols
	 *		oPosition: "centered", // other options: relative, custom 
	 *		oXPosition: 400, // needed if oPosition is custom
	 *		oYPosition: 400 // needed is oPosition is custom
	 *	}
	 *
	 * 
	 * @see http://www.datatables.net/plug-ins/i18n
	 * 
	 *  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 */
	
	
	$.fn.jquerysearchdialog = function(searchRealized, successSearch, options) {
		
	    var _suffixes = {
	    		searchDialogId : "_jquerySearchDialog",
	    		searchInputId : "_searchInput",
	    		closeButtonId : "_closeButton",
	    		searchTableId : "_searchTable"
	    };
	    
	    var opts = $.extend({}, $.fn.jquerysearchdialog.defaults, options);
	    
	    
	    
	    return this.each(function() {
	    	
	    	var something = this;
	    	var element = $(something);
	    	  
	    	  // build element specific options
	    	  var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
	    	  

		// TODO A javascript error has occurred: No data received from server, sometimes when losing focus

		// TODO sometimes the description of a field jumps to another field after refreshing

	  	// TODO there is some sort of race condition with the ajax answers, thus refreshing when fast typing is bad

		
	    var elementId = element.attr('id');
	    
	    if (elementId == '') {
	    	elementId = String((new Date()).getTime()).replace(/\D/gi,'');
	    }
	    		
	    
	    /** *** creating the table *** */
	    var tableString = '<div id="' + elementId + _suffixes.searchDialogId +  '" class="jquerysearchDialogTopDiv">' + 
		'<fieldset><legend>' + opts.oLanguage.sSearchDialog + '</legend> <input type="text"' +
			'id="' +elementId + _suffixes.searchInputId +'" />' + 
		'<button type="button" id="' +elementId + _suffixes.closeButtonId +'" class="jquerySearchDialogCloseButton">' + opts.oLanguage.sClose+ '</button>' + 
		'<table id="' +elementId + _suffixes.searchTableId +'" class="jquerySearchDialogSearchTable">' + 
			'<thead>' + 
				'<tr>'; 
	    
	    for(i = 0; i < opts.oTitles.length ;i++) {
	    	tableString += '<th>'+ opts.oTitles[i] +'</th>';
	    }
	    
		tableString += '</tr>' +
				'</thead>' +
				'<tbody>';
				tableString += '</tbody>' +  
			'</table> ' + 
			'</fieldset>' +
		'</div>';
		
		/** ******* adding it to the dom ****** */
	    element.after(tableString);
	    
	    
	    
	    /**
		 * **************** creating elements with id and suffixees
		 * ***********************
		 */
	    var searchDialogElement  = $("#" + elementId + _suffixes.searchDialogId);
	    var searchInputElement  = $("#" +elementId + _suffixes.searchInputId);
	    var closeDialogElement  = $("#" +elementId + _suffixes.closeButtonId );
	    var searchTableId  = $("#" +elementId + _suffixes.searchTableId  );
	    
	    
	    
	  
	    /** ***** stylish and positioning ********** */
	    
		searchDialogElement.css(
	 			   {
	 				   "display": "none",
	 				   "min-width": "300px",
	 				   "position" : "absolute",
	 			   }
	 			   
	 	   );
	    
	    if(opts.oPosition ==  "centered") {

	    	searchDialogElement.centerInClient({ container: window, forceAbsolute: true });
	    } else if (opts.oPosition ==  "relative") {
	    	
	 	   var buttonOffsets =element.offset();
	 	   
	 	   searchDialogElement.css({
	 		   "left": (buttonOffsets.left + element.width()),
	 		   "top": (buttonOffsets.top + element.height())
 		   
	 	   });
    	
	    } else if (opts.oPosition ==  "custom") {
	    	
			   searchDialogElement.css({
		 		   "left": opts.oXPosition,
		 		   "top": opts.oYPosition
	 		   
		 	   });
			
	    } else {
	    	alert("positioning option is not correct, correcto options are: centered, relative, custom");
	    	return;
	    }
	    	
		element.click(function(){
			if(!isDialogOpened()){
				searchDialogElement.css({"display": "block"});
				searchInputElement.focus();
			}
		});
		
	   
	   closeDialogElement.click(function() {
		   searchDialogElement.css({"display": "none"});
	   });
	    
	   /** ******** creating the dataTable ****** */
		var oTable = searchTableId.dataTable({
				"oLanguage" : opts.dataTableLanguage,
				"fnDrawCallback": function() {
				searchTableId.find("td").click(toReturnData ); // check this
				},
				// "bAutoWidth": false,
				"bFilter": false
		
			});
		
		searchTableId.css({"width": opts.width});
		
		/** ******** will be used on sucess ********** */
		var toReturnData = function () {
			
			// TODO verify that the table has something actually
			var aData = oTable.fnGetData();
			if (aData.length == 0) {
				   return; // don't do anything
			}
			   
	        var aPos = oTable.fnGetPosition( this );
	        // var aData = oTable.fnGetData( aPos[0] );
	        
	        successSearch(aData[aPos[0]]);     
	        
	        searchDialogElement.css({"display": "none"}); 
		} 
	    

		
		 /** ********** hidding cols passed as options ********* */
	    for(i = 0; i < opts.oHiddenCols.length ;i++) {
	    	 oTable.fnSetColumnVis( opts.oHiddenCols[i] , false );
	    }
	    oTable.fnDraw();
	    
	    
		// string[][], task: fill the table
		var callbackToFillTable = function(data) {
	    	oTable.fnClearTable( 0 );
			oTable.fnAddData( data);
			oTable.fnDraw();
		}

		// TODO only dispatch this event on change, and filter characters
		searchInputElement.keyup(function() {

			searchRealized(searchInputElement.val(), callbackToFillTable);
		});
		
		
		searchInputElement.keypress(function(ev) {
			
			if(ev.keyCode == 27) {
				searchDialogElement.hide();
			};
		
		});
		
		$(document).keydown( function( ev ) {		  
			  if(ev.keyCode == 27) {		  
			        if (searchDialogElement.css("display") == 'block') {	  
			        	searchDialogElement.css({"display":"none"});
			        }
			    }
		}); 
	    });
	};
	
	
	$.fn.jquerysearchdialog.defaults = {
			width : 300,
			dataTableLanguage: {
				
			},
			oLanguage: {
	    		"sClose" :"Close",
	    		"sSearchDialog":"Search Dialog"
	    		
			},
			oTitles  : ["col1", "col2"],
			oHiddenCols : [],
			oPosition: "centered",
			oXPosition: 400,
			oYPosition: 400
	
	};
	
	

	/**
	 * Private function
	 */
	function isDialogOpened() {
		
		var allElements = $(document).find(".searchDialogTopDiv")
		for (x = 0; x < allElements.length ; x++) {
			if ($(allElements[x]).css("display") == 'block'){
				return true;
			};			
		}
		return false;
	}
	
	// create a function of our own with public access because of the namespace
	// 	$.fn.hilight.format = function(txt) {'
	// return '<strong>' + txt + '</strong>';
	// };
	
})(jQuery);