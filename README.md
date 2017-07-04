# bibtex-citations

Takes a BibTEX citation list as a string, a DOM node that contains some HTML with references and a target DOM node for
the references. It is designed to be used as part of a workflow to create academic style pdfs from html.

    <body>
        <p>Some text that is referenced <a href='#GULSHAN2016'>(Gulshan et al 2016)</a>
        <p>Some more text that is referenced with 2 things <a href='#BLOIS1980,AFZAL2017'>(ref)</a>.
        <div id='citations'></div>
    </body>

will be converted into something like

    <body>
        <p>Some text that is referenced <sup>[<a href="#GULSHAN2016">1</a>]</sup>
        </p><p>Some more text that is referenced with 2 things <sup>[<a href="#BLOIS1980">2</a>,<a href="#AFZAL2017">3</a>]</sup>.
        </p><div id="citations">
            <cite id="GULSHAN2016">[1]. Gulshan, Varun and Peng, Lily and Coram, Marc and Stumpe, ....
            <cite id="BLOIS1980">[2]. Blois, Marsden S.. 1980. Clinical Judgment and Computer. <em>New England Journal of Med ...
            <cite id="AFZAL2017">[3]. Afzal, Naveed and Sohn, Sunghwan and Abram, Sara and Scott, Christopher G. and Chaudhry ...
        </div>
    </body>