<div class="border-b pb-2 text-right">
    <a href="/write">
        <button
            class="py-1 px-3 bg-blue-500 active:bg-blue-600 text-xs md:text-sm text-white rounded-md"
        >
            글 작성하기
        </button>
    </a>
</div>

<div class="flex flex-row pt-3">
    <div class="hidden md:block left-fix flex-shrink-0">
        <ul>
            <li class="mb-4">전체 글 보기</li>
            <li class="mb-4">자유게시판</li>
            <li class="mb-4">질문답변</li>
            <li class="mb-4">더싼폰 블로그</li>
        </ul>
    </div>
    <div class="w-full">
        <slot></slot>
    </div>
</div>

<style>
    .left-fix {
        position: sticky;
        align-self: flex-start;
        background: #fff;
        z-index: 10;
        top: 6rem;
        width: 18%;
        height: 100%;
    }
</style>
