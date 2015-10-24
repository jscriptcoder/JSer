export const JSER_STYLES = `
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

    .jser_$uid {}

    .jser_$uid pre {}

    .jser_$uid .jser-wrapper {
        width: 100%;
        height: 100%;
        font-family: $font-family;
        font-size: $font-size;
        background-color: $background-color;
        color: $font-color;
    }

    .jser_$uid .jser-output {}

    .jser_$uid .jser-prompt {}

    .jser_$uid .jser-prompt-symbol {}

    .jser_$uid .jser-prompt-input {}

    .jser_$uid .jser-prompt-cursor {}

    .jser_$uid .jser-prompt-cursor.blink {
        -webkit-animation: jser_$uid-blink 1s infinite steps(1);
        animation: jser_$uid-blink 1s infinite steps(1);
    }

`;

export const JSER_TMPL = `
    <div class="jser-wrapper">
        <div class="jser-output"></div>
        <div class="jser-prompt">
            <span class="jser-prompt-symbol">$prompt-symbol</span>
            <span class="jser-prompt-input">
                <span class="jser-prompt-cursor blink">&nbsp;</span>
            </span>
        </div>
    <div>
`;