<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    let editor;

    onMount(() => {
        editor = SUNEDITOR.create("test", {
            // All of the plugins are loaded in the "window.SUNEDITOR" object in dist/suneditor.min.js file
            // Insert options
            // Language global object (default: en)
            lang: SUNEDITOR_LANG["ko"],
            width: "100%",
            minWidth: 400,
            height: "500px",

            buttonList: [
                ["undo", "redo", "font", "fontSize", "formatBlock"],
                ["bold"],
                ["fontColor", "hiliteColor", "textStyle"],
                // "/", // Line break
                ["align", "horizontalRule", "list", "lineHeight"],
                ["table", "link", "image", "video" /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                ["fullScreen", "showBlocks", "codeView"],
                /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
            ],
            callBackSave: function (contents, isChanged) {
                console.log(contents);
            },
        });
    });
</script>

<svelte:head>
    <link
        href="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/css/suneditor.min.css"
        rel="stylesheet"
    />
    <!-- <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/assets/css/suneditor.css" rel="stylesheet"> -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/suneditor@latest/assets/css/suneditor-contents.css" rel="stylesheet"> -->
    <script
        src="https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js"
    ></script>
    <!-- languages (Basic Language: English/en) -->
    <script
        src="https://cdn.jsdelivr.net/npm/suneditor@latest/src/lang/ko.js"
    ></script>
</svelte:head>

<textarea id="test">Hi</textarea>

<button
    on:click={() => {
        console.log(editor.getContents());
    }}
>
    gogogo
</button>

<style>
</style>
