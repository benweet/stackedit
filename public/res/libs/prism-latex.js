Prism.languages.latex = {
    // A tex command e.g. \foo
	'keyword': /\\(?:[^a-zA-Z]|[a-zA-Z]+)/g,
    // Curly and square braces
	'lparen': /[[({]/g,
    // Curly and square braces
	'rparen': /[\])}]/g,
    // A comment. Tex comments start with % and go to 
    // the end of the line
	'comment': /%.*/g,
};
