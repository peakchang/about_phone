<script>
    import Editor from "$components/Editor.svelte";

    function writeContent(e) {
        const title = e.detail.title;
        const contents = e.detail.contents;

        console.log(title);
        console.log(contents);
    }
</script>

<Editor on:writeContent={writeContent} />
