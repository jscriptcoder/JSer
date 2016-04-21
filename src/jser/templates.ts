/**
 * Custom styles
 */
export const JSER_STYLES_TMPL: string = `
@-webkit-keyframes jser_$uid-blink {
	0%, 100% {
		background-color: $font-color;
		color: $background-color;
	}
	50% {
		background-color: $background-color;
		color: $font-color;
	}
}
@-moz-keyframes jser_$uid-blink {
	0%, 100% {
		background-color: $font-color;
		color: $background-color;
	}
	50% {
		background-color: $background-color;
		color: $font-color;
	}
}
@-ms-keyframes jser_$uid-blink {
	0%, 100% {
		background-color: $font-color;
		color: $background-color;
	}
	50% {
		background-color: $background-color;
		color: $font-color;
	}
}
@-o-keyframes jser_$uid-blink {
	0%, 100% {
		background-color: $font-color;
		color: $background-color;
	}
	50% {
		background-color: $background-color;
		color: $font-color;
	}
}
@keyframes jser_$uid-blink {
	0%, 100% {
		background-color: $font-color;
		color: $background-color;
	}
	50% {
		background-color: $background-color;
		color: $font-color;
	}
}

@-webkit-keyframes jser_$uid-spin {
	12.5% { transform: rotate(45deg); }
	25%   { transform: rotate(90deg); }
	37.5% { transform: rotate(135deg); }
	50%   { transform: rotate(180deg); }
	62.5% { transform: rotate(225deg); }
	75%   { transform: rotate(270deg); }
	87.5% { transform: rotate(315deg); }
	100%  { transform: rotate(360deg); }
}
@-moz-keyframes jser_$uid-spin {
	12.5% { transform: rotate(45deg); }
	25%   { transform: rotate(90deg); }
	37.5% { transform: rotate(135deg); }
	50%   { transform: rotate(180deg); }
	62.5% { transform: rotate(225deg); }
	75%   { transform: rotate(270deg); }
	87.5% { transform: rotate(315deg); }
	100%  { transform: rotate(360deg); }
}
@-ms-keyframes jser_$uid-spin {
	12.5% { transform: rotate(45deg); }
	25%   { transform: rotate(90deg); }
	37.5% { transform: rotate(135deg); }
	50%   { transform: rotate(180deg); }
	62.5% { transform: rotate(225deg); }
	75%   { transform: rotate(270deg); }
	87.5% { transform: rotate(315deg); }
	100%  { transform: rotate(360deg); }
}
@-o-keyframes jser_$uid-spin {
	12.5% { transform: rotate(45deg); }
	25%   { transform: rotate(90deg); }
	37.5% { transform: rotate(135deg); }
	50%   { transform: rotate(180deg); }
	62.5% { transform: rotate(225deg); }
	75%   { transform: rotate(270deg); }
	87.5% { transform: rotate(315deg); }
	100%  { transform: rotate(360deg); }
}
@keyframes jser_$uid-spin {
	12.5% { transform: rotate(45deg); }
	25%   { transform: rotate(90deg); }
	37.5% { transform: rotate(135deg); }
	50%   { transform: rotate(180deg); }
	62.5% { transform: rotate(225deg); }
	75%   { transform: rotate(270deg); }
	87.5% { transform: rotate(315deg); }
	100%  { transform: rotate(360deg); }
}

.jser_$uid {}

.jser_$uid pre { margin: 0; }

.jser_$uid .jser-wrapper {
	width: 100%;
	height: 100%;
	overflow-y: scroll;
	font-family: $font-family;
	font-size: $font-size;
	background-color: $background-color;
	color: $font-color;
}

.jser_$uid .jser-output {}

.jser_$uid .jser-output .info { color: $info-color; }
.jser_$uid .jser-output .warn { color: $warn-color; }
.jser_$uid .jser-output .error { color: $error-color; }

.jser_$uid .jser-prompt {}

.jser_$uid .jser-prompt-symbol {}

.jser_$uid .jser-prompt-input {}

.jser_$uid .jser-prompt-cursor { display: inline-block; }

.jser_$uid .jser-prompt-cursor.blink {
	-webkit-animation: jser_$uid-blink 1s infinite steps(1);
	-moz-animation: jser_$uid-blink 1s infinite steps(1);
	-ms-animation: jser_$uid-blink 1s infinite steps(1);
	-o-animation: jser_$uid-blink 1s infinite steps(1);
	animation: jser_$uid-blink 1s infinite steps(1);
}

.jser_$uid .jser-prompt-cursor.spin {
	background-color: $font-color;
	color: $background-color;

	-webkit-animation: jser_$uid-spin 1s infinite steps(1);
	-moz-animation: jser_$uid-spin 1s infinite steps(1);
	-ms-animation: jser_$uid-spin 1s infinite steps(1);
	-o-animation: jser_$uid-spin 1s infinite steps(1);
	animation: jser_$uid-spin 1s infinite steps(1);
}

.jser_$uid .CodeMirror {
	font-family: $font-family;
	font-size: $font-size;
	height: 100%;
	color: white;
	background-color: $background-color;
}

.jser_$uid .CodeMirror-selected { background: #3a3432; }

.jser_$uid .CodeMirror-line::selection, 
.jser_$uid .CodeMirror-line > span::selection, 
.jser_$uid .CodeMirror-line > span > span::selection { background: rgba(58, 52, 50, .99); }

.jser_$uid .CodeMirror-line::-moz-selection, 
.jser_$uid .CodeMirror-line > span::-moz-selection, 
.jser_$uid .CodeMirror-line > span > span::-moz-selection { background: rgba(58, 52, 50, .99); }

.jser_$uid .CodeMirror-gutters {
	background: $background-color;
	border-right: 0px;
}
.jser_$uid .CodeMirror-guttermarker { color: #db2d20; }
.jser_$uid .CodeMirror-guttermarker-subtle { color: #5c5855; }
.jser_$uid .CodeMirror-linenumber { color: $linenumber-color; }

.jser_$uid .CodeMirror-cursor {
    border-left: 1px solid $caret-color;
    background: $font-color;
}

.jser_$uid span.cm-comment { color: $comment-color; }
.jser_$uid span.cm-atom { color: $boolean-color; }
.jser_$uid span.cm-number { color: $number-color; }

.jser_$uid span.cm-property, 
.jser_$uid span.cm-attribute { color: $property-color; }

.jser_$uid span.cm-keyword { color: $keyword-color; }
.jser_$uid span.cm-string { color: $string-color; }
.jser_$uid span.cm-string-2 { color: $string2-color; }

.jser_$uid span.cm-variable { color: $variable-color; }
.jser_$uid span.cm-variable-2 { color: $variable2-color; }
.jser_$uid span.cm-def { color: $definition-color; }
.jser_$uid span.cm-bracket { color: $bracket-color; }
.jser_$uid span.cm-tag { color: #db2d20; }
.jser_$uid span.cm-link { color: #a16a94; }
.jser_$uid span.cm-error {
	background: #db2d20;
	color: #807d7c;
}

.jser_$uid .CodeMirror-activeline-background { background: $activeline-color; }
.jser_$uid .CodeMirror-matchingbracket {
	text-decoration: underline;
	color: white !important;
}

.jser_$uid .CodeMirror-dialog {
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;
}

.jser_$uid .CodeMirror-dialog input {
    border: 0;
    outline: none;
    padding: 0;
	font-family: $font-family;
	font-size: $font-size;
	background-color: $background-color;
	color: white;
}
`;

/**
 * JSer template
 */
export const JSER_TMPL: string = `
<div class="jser-wrapper">
    <div class="jser-output"></div>
    <div class="jser-prompt">
        <span class="jser-prompt-symbol" data-symbol="$prompt-symbol">
            $prompt-symbol
        </span>
        <span class="jser-prompt-input">
            <span class="jser-prompt-cursor blink">&nbsp;</span>
        </span>
    </div>
</div>
`;

/**
 * Editor template
 */
export const EDITOR_TMPL: string = `
<textarea autofocus>
/**
 * Created with JSer
 * $date
 * @author $user
 */
</textarea>
`;