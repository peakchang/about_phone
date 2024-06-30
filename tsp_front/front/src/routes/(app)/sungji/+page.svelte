<script>
    let sampleEach = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26,
    ];
</script>

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
    <div>
        {#each sampleEach as each}
            <!-- 세트 -->
            <div class="flex w-full gap-2 min-h-16">
                <div
                    class=" h-16 w-20 bg-[url('/sample_img/3sldjfliwjef.png')] bg-cover bg-center bg-no-repeat border rounded-md flex-shrink-0"
                />

                <div class="flex flex-col justify-between">
                    <div class="text-xs text-gray-600 mb-1">
                        <span
                            class="py-0.5 px-1.5 rounded-md bg-emerald-500 text-white"
                            >서울</span
                        >
                        <span
                            class="py-0.5 px-1.5 rounded-md bg-emerald-500 text-white"
                            >광진구</span
                        >
                    </div>

                    <div>
                        <div
                            class="w-fit flex-grow line-clamp text-sm h-5 mb-2"
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Optio quas quaerat, ipsam ipsa natus delectus,
                            aliquam, id quibusdam laudantium incidunt debitis
                            magni odio dolores est quo? Nesciunt quibusdam vel
                            et?
                        </div>
                        <div class="text-xs text-gray-600">
                            <div class="inline-block mr-1.5">
                                <i class="fa fa-user" aria-hidden="true"></i>
                                <span>관리자</span>
                            </div>

                            <div class="inline-block mr-1.5">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                <span>24/06/09</span>
                            </div>

                            <div class="inline-block">
                                <i class="fa fa-eye" aria-hidden="true"></i>
                                <span>2408</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 세트 끝 -->
            <hr class="my-3" />
        {/each}

        <div>pagination</div>
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

    .line-clamp {
        display: -webkit-box;
        word-break: break-word;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
