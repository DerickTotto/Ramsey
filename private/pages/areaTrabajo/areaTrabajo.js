
(function(){
    setupEditorHtml();
    setupEditorCss();
    setupEditorJs();
    editor();
})();
function update(editor){
    var idoc = document.getElementById('iframe').contentWindow.document;
    console.log(editor);
	idoc.open();
	idoc.write(editor);
	idoc.close();
}

function setupEditorHtml(){
    window.html = ace.edit("editorHtml");
    html.setTheme("ace/theme/monokai");
    html.getSession().setMode("ace/mode/html");
  //html.session.setUseSoftTabs(true);//

    html.setValue(``); //1 = moves cursor to end
    html.getSession().on('change', function() {
        editor();
    });
  html.focus();
  html.setOptions({
    fontSize: "10pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible:false,
    enableBasicAutocompletion: true
  });

  html.setShowPrintMargin(false);
  html.setBehavioursEnabled(false);
}

//===================Editor Css==============================
function setupEditorCss(){
    window.css = ace.edit("editorCss");
    css.setTheme("ace/theme/monokai");
    css.getSession().setMode("ace/mode/css");
    css.setValue(``); //1 = moves cursor to end
    css.getSession().on('change', function() {
        editor();
    });
    
    css.setOptions({
        fontSize: "10pt",
        showLineNumbers: true,
        showGutter: true,
        vScrollBarAlwaysVisible:false,
        enableBasicAutocompletion: true
  });
    css.setShowPrintMargin(false);
    css.setBehavioursEnabled(false);
}
//===================Editor JavaScript==============================    
function setupEditorJs(){
    window.js = ace.edit("editorJs");
    js.setTheme("ace/theme/monokai");
    js.getSession().setMode("ace/mode/javascript");
    //js.setValue(``); //1 = moves cursor to end
    
    js.getSession().on('change', function() {
        editor();
    });
    js.setOptions({
    fontSize: "10pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible:false,
    enableBasicAutocompletion: true
  });

    js.setShowPrintMargin(false);
    js.setBehavioursEnabled(false);
}

function editor(){
    var editor = (`
    <!DOCTYPE html> 
    <html> 
        <head>
            <style>
                ${css.getValue()}
            </style>
        </head> 
        <body>
            ${html.getValue()}
            <script>
                ${js.getValue()}
            </script>
        </body> 
    </html>
    `);
    update(editor);
}

/*setupEditorHtml();
setupEditorCss();
setupEditorJs();*/

  