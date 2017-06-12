var bibtex = require('bibtex-parser');
var $ = require('jquery');

function layoutCitation(cite) {
	var out = cite.AUTHOR + ". "
		+ cite.YEAR + ". "
		+ cite.TITLE +". "
		+"<em>"+cite.JOURNAL +"</em> "
		+cite.VOLUME+"("+cite.NUMBER+") "
		+cite.PAGES;
	return out;
}

// a jquery anchor that is a reference
function layoutReference(anchor, index) {
	var target = a.attr('href').substring(1);
	
}

/**
 * Takes a bibtex string and a jquery style selector to populate with 
 */
function BibtexCites.process(citations, selector) {
	var cites = bibtex(citations);
	
	// exclude bibtex entries with empty id.
	// exclude bibtex entries that are not liked to in this document
	
	var filteredKeys = Object
		.keys(cites)
		.filter(e => (e != ""))
		.filter(e => $("a[href='#"+e+"']").length > 0);
	
	var sortedFilteredKeys = new Array();
	$("a")
		.filter(a => a.attr('href'))
		.each(a => {
			var target = a.attr('href').substring(1);
			if (filteredKeys.contains(target) && !sortedFilteredKeys.contains(target)) {
				sortedFilteredKeys.push(target); 
			}
		});
	
	var i = 1;
	sortedFilteredKeys
		.forEach( e => {
			//add formatted citation to list
			$(selector).append( 
					$( "<cite id='"+e+"'/>" )
					.html( layoutCitation(cites[e]) )
				);
			//find references and replace them with formatted reference
			$("a[href='#"+e+"']").replaceWith( layoutReference(this, i) ); //fix citation numbers not supported by css3 target-counter
			i++;
		});
}

module.exports = BibtexCites;