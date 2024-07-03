<script>
    import { onDestroy, onMount } from "svelte";
    import { browser } from "$app/environment";
    import { dataURItoBlob } from "$lib/lib";
    import axios from "axios";
    import { back_api } from "$src/lib/const";

    let type = "write";
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

        editor.onImageUploadBefore = function (
            files,
            info,
            core,
            uploadHandler,
        ) {
            console.log("resizing start?!??!?!?!");
            try {
                ResizeImage(files, uploadHandler);
            } catch (err) {
                uploadHandler(err.toString());
            }
        };
    });

    onDestroy(() => {
        if (browser) {
            let editorArea = document.querySelector(".sun-editor");
            console.log(editorArea);
            if (editorArea) {
                editorArea.remove();
            }
        }
    });

    async function writeContent() {
        const sampleContent = extractAndReplaceBase64(editor.getContents());
        for (let i = 0; i < sampleContent.base64Codes.length; i++) {
            const imgCon = dataURItoBlob(sampleContent.base64Codes[i]);
            let imgForm = new FormData();

            const timestamp = new Date().getTime();
            const fileName = `${timestamp}${Math.random()
                .toString(36)
                .substring(2, 11)}.webp`;
            imgForm.append("editorimg", imgCon, fileName);
            try {
                getImgUrl = await axios.post(
                    `${back_api}/editor/editor_img_upload`,
                    imgForm,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    },
                );
            } catch (error) {
                alert("에러가 발생했습니다. 다시 시도해주세요");
                loading = false;
                return false;
            }
        }
    }

    function extractAndReplaceBase64(htmlContent) {
        // 정규식으로 base64 코드를 찾기
        const base64Regex = /<img\s+[^>]*src="(data:[^"]*)"[^>]*>/g;
        let base64Codes = [];
        let match;

        // HTML 내용에서 base64 이미지를 찾고 배열에 저장
        while ((match = base64Regex.exec(htmlContent)) !== null) {
            base64Codes.push(match[1]);
        }

        // base64 코드를 "업로드한 이미지"로 대체
        const updatedHtmlContent = htmlContent.replace(
            base64Regex,
            '<img src="업로드한 이미지" alt="" />',
        );

        return { updatedHtmlContent, base64Codes };
    }

    // image resize
    function ResizeImage(files, uploadHandler) {
        const uploadFile = files[0];
        const img = document.createElement("img");
        const canvas = document.createElement("canvas");
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
            img.onload = function () {
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const MAX_WIDTH = 200;
                const MAX_HEIGHT = 100;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    function (blob) {
                        uploadHandler([new File([blob], uploadFile.name)]);
                    },
                    uploadFile.type,
                    1,
                );
            };
        };

        reader.readAsDataURL(uploadFile);
    }
</script>

<div class="mb-3">
    <input
        type="text"
        class="w-full border p-2 focus:outline-none focus:border-blue-400 text-sm"
        placeholder="제목을 입력해주세요"
    />
</div>

<textarea id="test" placeholder="글을 작성해주세요"></textarea>

<div class="mt-3 text-center">
    {#if type == "write"}
        <button
            class="bg-blue-500 py-2 px-6 text-white rounded-md"
            on:click={writeContent}
        >
            작성 완료하기
        </button>
    {:else}
        <button on:click={writeContent}> gogogo </button>
    {/if}
</div>

<style>
</style>
