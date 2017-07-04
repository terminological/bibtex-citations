const jsdom = require("jsdom");
const { JSDOM } = jsdom;

JSDOM.fromFile('./test/test.html' , {}).then( dom => {

	//console.log(dom.serialize());

    global.window = dom.window;
    global.document = dom.window.document;

	var fs = require('fs');

    var tmpCss = fs.readFileSync('./style.css', 'utf8');
    var styleEl = document.createElement("style");
    styleEl.textContent = tmpCss;
    document.head.appendChild(styleEl);

	var data = fs.readFileSync('./test/test.bib', 'utf8');

	//console.log(data);

	var BibtexCites = require('./index.js');

	//console.log(window.document.getElementById("citations").outerHTML);

	BibtexCites.process(data, window.document.body, window.document.getElementById("citations"));

    console.log(dom.serialize());

    window.close();
	
}).catch(error => {
	  console.log(error,'Promise error');
});

;
