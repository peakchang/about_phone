<div class="flex flex-row pt-3">
    <div class="hidden md:block left-fix flex-shrink-0">
        <div class="border-b filter_menu" style="">지역 필터</div>

        <div class="border-b mt-3 filter_menu">
            <div class="mb-2">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                선택 지역
            </div>
            <div class="mb-2">
                <div
                    class=" inline-block text-xs bg-emerald-500 text-white py-1 px-2 rounded-md mb-1"
                >
                    서울
                </div>
            </div>
            <button
                class="w-full text-sm text-center text-white bg-blue-400 active:bg-blue-500 py-1 rounded-md"
            >
                선택지역 변경
            </button>
        </div>

        <div class="border-b mt-3 filter_menu">
            <div class="mb-2">
                <i class="fa fa-dot-circle-o" aria-hidden="true"></i>
                선택 도시
            </div>
            <div class="mb-2">
                <div
                    class=" inline-block text-xs bg-emerald-500 text-white py-1 px-2 rounded-md mb-1"
                >
                    서울
                </div>
            </div>
            <button
                class="w-full text-sm text-center text-white bg-blue-400 active:bg-blue-500 py-1 rounded-md"
            >
                선택도시 변경
            </button>
        </div>
    </div>
    <div class="w-full">
        <slot></slot>
    </div>
</div>

<style>
    .filter_menu {
        padding-bottom: 10px;
        margin-right: 20px;
    }
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
