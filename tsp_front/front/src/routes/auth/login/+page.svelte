<script>
    import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
    import axios from "axios";
    import { onMount } from "svelte";
    import { user_info } from "$lib/store";
    import { page } from "$app/stores";
    import { back_api } from "$src/lib/const";

    let capsLockMessage;

    onMount(() => {
        if ($user_info) {
            alert("이미 로그인 되어 있습니다.");
            goto("/");
            return;
        }
    });

    // 로그인 함수
    const request_login = async (e) => {
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            alert("아이디와 비밀번호를 입력해주세요!");
            return;
        }

        try {
            const res = await axios.post(
                `${back_api}/auth/login`,
                { email, password },
                { withCredentials: true },
            );

            console.log(res.data);

            if (res.data.status) {
                $user_info = res.data.user_info;
                const moveUrl = $page.url.searchParams.get("url");

                if (moveUrl) {
                    goto(moveUrl);
                } else {
                    goto("/");
                }
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert("에러가 발생했습니다. 다시 시도해주세요");
        }
    };

    const kakao_login = () => {
        const kakaoInfo = {
            kakao_restapi: import.meta.env.VITE_KAKAO_RESTAPI,
            kakao_redirect: import.meta.env.VITE_KAKAO_REDIRECT,
        };

        let moveUrl = "";
        const getMoveUrl = $page.url.searchParams.get("url");
        if (getMoveUrl) {
            moveUrl = getMoveUrl;
        }

        location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoInfo.kakao_restapi}&redirect_uri=${kakaoInfo.kakao_redirect}&response_type=code&state=${moveUrl}`;
    };

    async function searchPwd() {
        goto("/auth/searchpwd");
    }

    function checkCapsLock(e) {
        if (e.getModifierState("CapsLock")) {
            capsLockMessage = "Caps Lock이 활성화된 상태입니다.";
        } else {
            capsLockMessage = "";
        }
    }
</script>

<div class="w-full max-w-sm mx-auto pt-20 pretendard">
    <div class="mb-5 text-center mx-auto h-7">
        <a href="/">
            <img src="/logo.png" alt="" class="mx-auto h-full" />
        </a>
    </div>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form on:submit|preventDefault={request_login}>
            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    이메일
                </span>
                <input
                    type="text"
                    class="w-full p-3 shadow-md text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    name="email"
                />
            </div>
            <div>
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    비밀번호
                </span>
                <input
                    type="password"
                    class="w-full p-3 shadow-md text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    name="password"
                    on:keyup={checkCapsLock}
                />
            </div>

            {#if capsLockMessage}
                <div class="mt-1 mb-4 text-red-700 text-sm">
                    {capsLockMessage}
                </div>
            {:else}
                <div class="mb-4" />
            {/if}

            <div class="">
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
                >
                    이메일 로그인
                </button>
            </div>
        </form>
        <div class="mt-3 flex justify-center gap-2">
            <button
                class="inline-block align-baseline text-sm"
                on:click={searchPwd}
            >
                비밀번호 찾기
            </button>
            <span>|</span>
            <a href="/auth/join">
                <button class="inline-block align-baseline text-sm">
                    회원가입
                </button>
            </a>
        </div>

        <div class="mt-3">
            <button
                type="button"
                class="mt-3 bg-yellow-200 active:bg-yellow-300 font-bold py-2 px-4 rounded w-full flex gap-2 justify-center"
                on:click={kakao_login}
            >
                <img src="/kakao-logo.png" alt="" style="height: 24px;" />
                <span>카카오로 시작하기</span>
            </button>
        </div>
    </div>
</div>

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }
</style>
