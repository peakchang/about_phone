<div class="hidden md:block">
    <div
        class="flex justify-between items-center h-20 max_screen pretendard mx-auto"
    >
        <div>LOGO</div>
        <div>
            <ul class="flex gap-5 text-sm">
                <li>지역별 성지</li>
                <!-- <li>온라인 성지</li> -->
                <!-- <li>인터넷/TV</li> -->
                <li>구매후기</li>
                <li>커뮤니티</li>
                <li>마이페이지</li>
            </ul>
        </div>
    </div>
    <hr class="bg-gray-200 border-0" style="height: 1px;" />
    <div class="max_screen pretendard mx-auto mt-5">
        <slot></slot>
    </div>
</div>

<div class="block md:hidden px-3 pretendard">
    작은거!!!!
    <slot></slot>
</div>

<hr class="bg-gray-200 border-0 mt-14" style="height: 1px;" />
<div class="max_screen pretendard mx-auto mt-5 mb-10">
    푸터푸터
</div>