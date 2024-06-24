<script>
    import { isValidEmail } from "$lib/lib";

    let userEmail = "";
    let emailValidation = true;
    let emailAuthStatus = false;
    function getEmailFunc(e) {
        emailValidation = isValidEmail(userEmail);
        console.log(emailValidation);
    }
</script>

<!-- class="w-full max-w-sm mx-auto suit-font pt-12" -->
<div class="w-full max-w-sm mx-auto pt-12 pretendard">
    <div class="mb-5 text-center mx-auto h-7">
        <a href="/">
            <img src="/logo.png" alt="" class="mx-auto h-full" />
        </a>
    </div>

    <form>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    이메일
                </span>
                <div class="mb-4">
                    <div class="relative">
                        <input
                            type="search"
                            class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="이메일 인증을 완료해주세요"
                            bind:value={userEmail}
                            on:input={getEmailFunc}
                        />

                        {#if emailValidation && userEmail}
                            <button
                                class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
                            >
                                인증발송
                            </button>
                        {:else}
                            <div
                                class="text-white absolute right-2.5 bottom-2.5 bg-gray-500 font-medium rounded-lg text-sm px-3 py-1"
                            >
                                인증발송
                            </div>
                        {/if}
                    </div>

                    {#if !emailValidation}
                        <div class="mt-2 ml-2 text-red-600 text-xs">
                            이메일 형식을 확인해주세요
                        </div>
                    {:else if emailValidation && userEmail && !emailAuthStatus}
                        <div class="mt-2 ml-2 text-blue-600 text-xs">
                            인증을 완료 해주세요
                        </div>
                    {/if}
                </div>
            </div>

            <div class="mb-4">
                <div class="relative">
                    <input
                        type="search"
                        class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                        placeholder="인증번호 입력"
                    />
                    <button
                        type="button"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-4 py-1"
                    >
                        확인
                    </button>
                </div>
            </div>

            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    닉네임
                </span>
                <input
                    type="text"
                    class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                />

                <div class="mt-2 ml-2 text-red-600 text-xs">
                    이미 사용중인 닉네임 입니다.
                </div>
            </div>

            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    비밀번호
                </span>
                <input
                    type="password"
                    placeholder="숫자 / 문자 / 특수문자 혼합 6자리 이상"
                    class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                />
            </div>

            <div class="border-b border-gray-200 pb-3">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="font-medium">전체 동의</span>
                </label>
            </div>

            <div class="py-2 flex justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="text-sm">(필수) 이용 약관 동의</span>
                </label>
                <button type="button" class="text-sm"> 보기 </button>
            </div>

            <div class="py-2 flex justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="text-sm"
                        >(필수) 개인정보 수집 및 이용 동의</span
                    >
                </label>
                <button type="button" class="text-sm" on:click={() => {}}>
                    보기
                </button>
            </div>

            <div class="py-2 flex justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="text-sm">(필수) 14세 이상입니다</span>
                </label>
            </div>

            <div class="mt-3">
                <button
                    class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    가입하기
                </button>
                <button
                    type="button"
                    class="mt-3 bg-yellow-200 active:bg-yellow-300 font-bold py-2 px-4 rounded w-full flex gap-2 justify-center"
                >
                    <img src="/kakao-logo.png" alt="" style="height: 24px;" />
                    <span>카카오톡 간편 회원가입</span>
                </button>
            </div>
        </div>
    </form>
</div>

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }

    .before-chkeck {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
</style>
