var bibtex = require('bibtex-parser');
// var $ = require('jquery');

function layoutCitation(href, div, cite, index) {

	var newCite = div.ownerDocument.createElement('cite');
    newCite.setAttribute('id', href);

	var out = "<span class='refnumber'>["+index+"]. </span>"+cite.AUTHOR + ". "
		+ cite.YEAR + ". "
		+ cite.TITLE.substring(1,cite.TITLE.length-2) +". "
		+"<em>"+cite.JOURNAL +"</em> "
		+cite.VOLUME+"("+cite.NUMBER+") "
		+cite.PAGES;

	newCite.innerHTML = out;
	return newCite;
}

// a jquery anchor that is a reference
function layoutReference(anchor, cites, indexLookup) {
	var targets = anchor.hash.substring(1).toUpperCase().split(",");
	if (!anchor.text.match(/^\(?[ref|cite]\)?$/)) {
        var tmp = anchor.text + "&nbsp;[";
    } else {
        var tmp = "[";
	}

	var found = false
	targets.forEach( (t,j) => {
		if (indexLookup.has(t)) {
            var i = indexLookup.get(t);
            found = true;
        } else {
			var i="?"
		}
		if (j>0) { tmp+="," };
		tmp += "<a href=#"+t+">"+i+"</a>";
	});

	tmp += "]";
	if (found) anchor.outerHTML = tmp; //otherwise do not alter link
}

var BibtexCites = new Object();

/**
 * Takes a bibtex string, a html node that contains the references that need citing, and a div to put the resulting citations
 */
BibtexCites.process = function(citations, referenceDiv, citationsDiv) {
	var cites = bibtex(citations);
	
	// exclude bibtex entries with empty id.
	// exclude bibtex entries that are not liked to in this document
	
	//console.log(cites);

	var links = referenceDiv.getElementsByTagName('a');
	var linksArray = Array.from(links);
	var linkStrings = new Array();
	Array.from(links).filter(a => a.hash).forEach(a => {
		var linkString = a.hash.substring(1).toUpperCase().split(",");
        linkStrings = linkStrings.concat(linkString);
	});

	var filteredKeys = Object
		.keys(cites)
		.filter(e => (e != ""))
		.filter(e => linkStrings.includes(e));

    //console.log(filteredKeys);

	var sortedFilteredKeys = new Map();
	var i=1;
	linkStrings
		.forEach(a => {
			if (filteredKeys.includes(a) && !sortedFilteredKeys.has(a)) {
				sortedFilteredKeys.set(a,i);
				i++;
			}
		});
	
	sortedFilteredKeys
		.forEach( (v,k,m) => {
            //add formatted citation to list
            citationsDiv.appendChild(layoutCitation(k, citationsDiv, cites[k], v));
        });

	linksArray
		.forEach( a =>
			layoutReference( a , cites, sortedFilteredKeys)
		);
}

module.exports = BibtexCites;