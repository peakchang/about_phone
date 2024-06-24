<div class="w-full max-w-sm mx-auto pt-20 pretendard">
    <div class="mb-5 text-center mx-auto h-7">
        <a href="/">
            <img src="/logo.png" alt="" class="mx-auto h-full" />
        </a>
    </div>
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form>
            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    이메일
                </span>
                <input
                    type="text"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 shadow-md"
                    name="email"
                />
            </div>
            <div>
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    비밀번호
                </span>
                <input
                    type="password"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 shadow-md"
                    name="password"
                />
            </div>

            <div class="mb-4" />

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
            <button class="inline-block align-baseline text-sm">
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
