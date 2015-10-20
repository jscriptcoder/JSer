export const JSER_STYLES = `
    @keyframes jser-cursor-blink {
        0%, 100% {
            background-color: @font-color;
            color: @background-color;
        }
        50% {
            background-color: @background-color;
            color: @font-color;
        }
    }
    @-webkit-keyframes jser-cursor-blink {
        0%, 100% {
            background-color: @font-color;
            color: @background-color;
        }
        50% {
            background-color: @background-color;
            color: @font-color;
        }
    }
    @-ms-keyframes jser-cursor-blink {
        0%, 100% {
            background-color: @font-color;
            color: @background-color;
        }
        50% {
            background-color: @background-color;
            color: @font-color;
        }
    }
    @-moz-keyframes jser-cursor-blink {
        0%, 100% {
            background-color: @font-color;
            color: @background-color;
        }
        50% {
            background-color: @background-color;
            color: @font-color;
        }
    }
`;

export const JSER_TMPL = `
    <div class="jser">
        <div class="jser-output"></div>
        <div class="jser-prompt">
            <span class="jser-prompt-symbol"></span>
            <span class="jser-prompt-input">
                <span class="jser-prompt-cursor">&nbsp;</span>
            </span>
        </div>
    <div>
`;