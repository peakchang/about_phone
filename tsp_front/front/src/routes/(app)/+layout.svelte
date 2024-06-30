<script>
    import { fly, scale } from "svelte/transition";
    let y;
</script>

<svelte:window bind:scrollY={y} />

<div class="hidden md:block">
    <div
        class="fixed top-0 left-0 w-full bg-white nav-bar"
        class:shrink={y > 100}
    >
        <div
            class="flex justify-between items-center max_screen pretendard mx-auto h-full"
        >
            <div>
                <a href="/">LOGO</a>
            </div>
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
    </div>

    <div class="pt-20"></div>

    <div class="max_screen pretendard mx-auto mt-5">
        <slot></slot>
    </div>
</div>

<div class="block md:hidden px-3 pretendard">
    <div class="fixed top-0 left-0 w-full bg-white h-10" class:shrink={y > 100}>
        <div class="flex items-center max_screen pretendard mx-auto h-full">
            <div>
                <a href="/">LOGO</a>
            </div>
        </div>
        <hr class="bg-gray-200 border-0" style="height: 1px;" />
    </div>

    <div class="max_screen pretendard mx-auto mt-14">
        <slot></slot>
    </div>

    <div class="fixed left-0 bottom-0 w-full h-14 bg-white border-t">
        <ul class="flex justify-around text-xs py-1.5">
            <li class="flex flex-col justify-center items-center gap-1">
                <div class="w-6">
                    <svg
                        fill="#000000"
                        viewBox="0 0 846.66 846.66"
                        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                        version="1.1"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <defs>
                                <style type="text/css">
                                    .fil0 {
                                        fill: black;
                                        fill-rule: nonzero;
                                    }
                                </style>
                            </defs>
                            <g id="Layer_x0020_1">
                                <path
                                    class="fil0"
                                    d="M27.36 178.98l135.03 0c11.5,0 20.82,9.32 20.82,20.82l0 32.1 24.05 0 0 -44.87c0,-11.5 9.32,-20.82 20.82,-20.82l100.36 0c11.5,0 20.82,9.32 20.82,20.82l0 44.87 119.69 0c11.49,0 20.82,9.32 20.82,20.82l0 70.41 7.63 0 0 -44.87c0,-11.49 9.32,-20.82 20.82,-20.82l100.36 0c11.5,0 20.82,9.33 20.82,20.82l0 44.87 24.05 0 0 -32.09c0,-11.5 9.32,-20.82 20.82,-20.82l135.03 0c11.5,0 20.82,9.32 20.82,20.82l0 233.56c0,85.76 -70.09,155.85 -155.85,155.85 -11.5,0 -20.82,-9.32 -20.82,-20.82l0 -32.09 -285.74 0c-11.49,0 -20.82,-9.33 -20.82,-20.82l0 -70.42 -173.68 0 0 32.09c0,11.5 -9.32,20.82 -20.82,20.82 -85.76,0 -155.85,-70.08 -155.85,-155.85l0 -233.56c0,-11.5 9.32,-20.82 20.82,-20.82zm420.77 164.35l-58.57 0c-27.38,0 -27.38,-41.64 0,-41.64l58.57 0 0 -28.16 -119.69 0c-11.49,0 -20.82,-9.32 -20.82,-20.81l0 -44.88 -58.72 0 0 44.88c0,11.49 -9.32,20.81 -20.82,20.81l-44.87 0 0 221.13 264.92 0 0 -28.16 -58.57 0c-27.38,0 -27.38,-41.64 0,-41.64l58.57 0 0 -19.94 -58.57 0c-27.38,0 -27.38,-41.64 0,-41.64l58.57 0 0 -19.95zm41.64 21.44c0,50.24 0,100.47 0,150.71 0,11.5 -9.33,20.82 -20.82,20.82l-70.42 0 0 49.6 264.92 0 0 -221.13 -44.87 0c-11.5,0 -20.82,-9.32 -20.82,-20.82l0 -44.87 -58.72 0 0 44.87c0,11.5 -9.33,20.82 -20.82,20.82l-28.45 0zm308.71 -52.92l-93.39 0 0 325.04c53.74,-10.02 93.39,-57.43 93.39,-112.29l0 -212.75zm-656.91 -91.23l-93.39 0 0 212.74c0,54.86 39.65,102.27 93.39,112.29l0 -292.93 0 -32.1z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>
                지역별성지
            </li>
            <!-- <li class="flex flex-col justify-center items-center gap-1">
                <div class="w-6">
                    <svg
                        fill="#000000"
                        viewBox="0 0 846.66 846.66"
                        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                        version="1.1"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <defs>
                                <style type="text/css">
                                    .fil0 {
                                        fill: black;
                                        fill-rule: nonzero;
                                    }
                                </style>
                            </defs>
                            <g id="Layer_x0020_1">
                                <path
                                    class="fil0"
                                    d="M217.88 8.44l410.9 0c82.39,0 149.71,67.33 149.71,149.71l0 530.36c0,82.38 -67.32,149.71 -149.71,149.71l-410.9 0c-82.38,0 -149.71,-67.32 -149.71,-149.71l0 -530.36c0,-82.38 67.33,-149.71 149.71,-149.71zm-18.43 162.55l447.76 0c11.44,0 20.73,9.28 20.73,20.72l0 441.54c0,11.45 -9.29,20.73 -20.73,20.73l-447.76 0c-11.44,0 -20.72,-9.28 -20.72,-20.73l0 -441.54c0,-11.44 9.28,-20.72 20.72,-20.72zm427.03 41.45l-406.3 0 0 400.08 406.3 0 0 -400.08zm-209.42 -81.5c-27.26,0 -27.26,-41.46 0,-41.46l108.69 0c27.27,0 27.27,41.46 0,41.46l-108.69 0zm-55.84 635.83c-27.26,0 -27.26,-41.45 0,-41.45l124.22 0c27.26,0 27.26,41.45 0,41.45l-124.22 0zm267.56 -716.87l-410.9 0c-59.49,0 -108.25,48.76 -108.25,108.25l0 530.36c0,59.5 48.76,108.25 108.25,108.25l410.9 0c59.5,0 108.25,-48.75 108.25,-108.25l0 -530.36c0,-59.49 -48.75,-108.25 -108.25,-108.25z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>
                온라인성지
            </li> -->
            <!-- <li class="flex flex-col justify-center items-center gap-1">
                <div class="w-6">
                    <svg
                        fill="#000000"
                        viewBox="0 0 846.66 846.66"
                        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                        version="1.1"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <defs>
                                <style type="text/css">
                                    .fil0 {
                                        fill: black;
                                        fill-rule: nonzero;
                                    }
                                </style>
                            </defs>
                            <g id="Layer_x0020_1">
                                <path
                                    class="fil0"
                                    d="M179.3 370.53c-18.98,19.52 -48.66,-9.34 -29.67,-28.86 148.88,-152.56 394.43,-155.61 547,-6.72 19.51,18.98 -9.34,48.66 -28.86,29.67 -136.28,-132.99 -355.46,-130.38 -488.47,5.91zm-0.5 369.34c-27.3,0 -27.3,-41.51 0,-41.51l166.73 0 0 -58.36 -214.13 0c-67.79,0 -123.18,-55.39 -123.18,-123.18l0 -286.86c0,-67.79 55.39,-123.18 123.18,-123.18l583.86 0c67.79,0 123.19,55.39 123.19,123.18l0 286.86c0,67.79 -55.4,123.18 -123.19,123.18l-214.13 0 0 58.36 166.73 0c27.3,0 27.3,41.51 0,41.51 -163.02,0 -326.04,0 -489.06,0zm208.24 -99.87l0 58.36 72.58 0 0 -58.36 -72.58 0zm328.22 -491.7l-583.86 0c-44.87,0 -81.67,36.79 -81.67,81.66l0 286.86c0,44.87 36.8,81.67 81.67,81.67 194.62,0 389.24,0 583.86,0 44.88,0 81.67,-36.8 81.67,-81.67l0 -286.86c0,-44.87 -36.79,-81.66 -81.67,-81.66zm-387.38 367.23c-18.98,19.51 -48.66,-9.35 -29.68,-28.87 68.96,-70.66 182.75,-72.11 253.43,-3.14 19.52,18.98 -9.34,48.66 -28.86,29.68 -54.38,-53.08 -141.81,-52.08 -194.89,2.33zm-106.81 -106.54c111.28,-112.71 293.63,-114.45 407.01,-3.81 19.62,19.44 -9.79,48.75 -29.07,29.48 -97.2,-94.64 -253.19,-93.16 -348.49,3.42 -18.6,21.84 -51.24,-8.73 -29.45,-29.09z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>

                인터넷/TV
            </li> -->
            <li class="flex flex-col justify-center items-center gap-1">
                <div class="w-6">
                    <svg
                        fill="#000000"
                        viewBox="0 0 846.66 846.66"
                        style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                        version="1.1"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <defs>
                                <style type="text/css">
                                    .fil0 {
                                        fill: black;
                                        fill-rule: nonzero;
                                    }
                                </style>
                            </defs>
                            <g id="Layer_x0020_1">
                                <path
                                    class="fil0"
                                    d="M631.26 619.35c27.27,0 27.27,41.47 0,41.47l-113.9 0 0 94.47c0,11.45 -9.29,20.73 -20.73,20.73l-177.89 0c-11.45,0 -20.74,-9.28 -20.74,-20.73l0 -94.47 -152.85 0c-75.19,0 -136.63,-61.44 -136.63,-136.62l0 -316.94c0,-75.19 61.44,-136.62 136.63,-136.62l525.07 0c75.18,0 136.62,61.43 136.62,136.62l0 75.67c0,27.27 -41.46,27.27 -41.46,0l0 -75.67c0,-52.29 -42.87,-95.16 -95.16,-95.16l-525.07 0c-52.3,0 -95.16,42.87 -95.16,95.16l0 316.94c0,52.29 42.87,95.15 95.16,95.15 162.04,0 324.08,0 486.11,0zm-224.66 -353.29c-27.27,0 -27.27,-41.46 0,-41.46l229.95 0c27.27,0 27.27,41.46 0,41.46l-229.95 0zm-219.11 273.34c-27.27,0 -27.27,-41.46 0,-41.46l336.26 0c27.27,0 27.27,41.46 0,41.46l-336.26 0zm0 -86.77c-27.27,0 -27.27,-41.47 0,-41.47l336.26 0c27.27,0 27.27,41.47 0,41.47l-336.26 0zm219.11 -112.81c-27.27,0 -27.27,-41.46 0,-41.46l114.97 0c27.27,0 27.27,41.46 0,41.46l-114.97 0zm-227.78 -147.76l138.84 0c11.45,0 20.73,9.28 20.73,20.73l0 138.84c0,11.45 -9.28,20.73 -20.73,20.73l-138.84 0c-11.45,0 -20.74,-9.28 -20.74,-20.73l0 -138.84c0,-11.45 9.29,-20.73 20.74,-20.73zm118.1 41.46l-97.37 0 0 97.38 97.37 0 0 -97.38zm178.97 427.3l-136.42 0 0 73.74 136.42 0 0 -73.74zm320.69 -126.68l36.85 46.69c16.82,21.28 -15.58,46.87 -32.39,25.59l-36.85 -46.68c-15.98,8.47 -34.21,13.28 -53.57,13.28 -63.21,0 -114.46,-51.25 -114.46,-114.47 0,-63.22 51.24,-114.48 114.46,-114.48 63.22,0 114.48,51.26 114.48,114.48 0,28.97 -10.77,55.43 -28.52,75.59zm-85.96 -148.6c-40.32,0 -73,32.69 -73,73.01 0,40.32 32.68,73 73,73 40.32,0 73.01,-32.68 73.01,-73 0,-40.32 -32.69,-73.01 -73.01,-73.01z"
                                ></path>
                            </g>
                        </g>
                    </svg>
                </div>
                구매후기
            </li>
            <li class="flex flex-col justify-center items-center gap-1">
                <div class="w-6">
                    <svg
                        viewBox="0 0 28 28"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                            <title>ic_fluent_people_team_28_regular</title>
                            <desc>Created with Sketch.</desc>
                            <g
                                id="🔍-Product-Icons"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                            >
                                <g
                                    id="ic_fluent_people_team_28_regular"
                                    fill="#212121"
                                    fill-rule="nonzero"
                                >
                                    <path
                                        d="M17.2540247,11 C18.4966654,11 19.5040247,12.0073593 19.5040247,13.25 L19.5040247,19.4989513 C19.5040247,22.5370966 17.0411213,25 14.002976,25 C10.9648308,25 8.50192738,22.5370966 8.50192738,19.4989513 L8.50192738,13.25 C8.50192738,12.0073593 9.5092867,11 10.7519274,11 L17.2540247,11 Z M17.2540247,12.5 L10.7519274,12.5 C10.3377138,12.5 10.0019274,12.8357864 10.0019274,13.25 L10.0019274,19.4989513 C10.0019274,21.7086695 11.7932579,23.5 14.002976,23.5 C16.2126942,23.5 18.0040247,21.7086695 18.0040247,19.4989513 L18.0040247,13.25 C18.0040247,12.8357864 17.6682382,12.5 17.2540247,12.5 Z M4.25,11 L8.40645343,11.000271 C8.01177565,11.4116389 7.72426829,11.9266236 7.58881197,12.5003444 L4.25,12.5 C3.83578644,12.5 3.5,12.8357864 3.5,13.25 L3.5,18.49876 C3.5,20.1562991 4.8437009,21.5 6.50123996,21.5 C6.94210796,21.5 7.36077379,21.4049412 7.73785924,21.2342019 C7.87129592,21.7236075 8.06231805,22.1898881 8.30186513,22.6257307 C7.75085328,22.8662539 7.14166566,23 6.50123996,23 C4.01527377,23 2,20.9847262 2,18.49876 L2,13.25 C2,12.0073593 3.00735931,11 4.25,11 Z M23.75,11 C24.9926407,11 26,12.0073593 26,13.25 L26,18.5 C26,20.9852814 23.9852814,23 21.5,23 C20.8609276,23 20.2529701,22.8667819 19.7023824,22.6266008 L19.7581025,22.5253735 C19.9721624,22.119151 20.1444731,21.6875096 20.2693267,21.2361575 C20.6437791,21.4056508 21.0608713,21.5 21.5,21.5 C23.1568542,21.5 24.5,20.1568542 24.5,18.5 L24.5,13.25 C24.5,12.8357864 24.1642136,12.5 23.75,12.5 L20.4171401,12.5003444 C20.2816838,11.9266236 19.9941764,11.4116389 19.5994986,11.000271 L23.75,11 Z M14,3 C15.9329966,3 17.5,4.56700338 17.5,6.5 C17.5,8.43299662 15.9329966,10 14,10 C12.0670034,10 10.5,8.43299662 10.5,6.5 C10.5,4.56700338 12.0670034,3 14,3 Z M22.0029842,4 C23.6598384,4 25.0029842,5.34314575 25.0029842,7 C25.0029842,8.65685425 23.6598384,10 22.0029842,10 C20.3461299,10 19.0029842,8.65685425 19.0029842,7 C19.0029842,5.34314575 20.3461299,4 22.0029842,4 Z M5.99701582,4 C7.65387007,4 8.99701582,5.34314575 8.99701582,7 C8.99701582,8.65685425 7.65387007,10 5.99701582,10 C4.34016157,10 2.99701582,8.65685425 2.99701582,7 C2.99701582,5.34314575 4.34016157,4 5.99701582,4 Z M14,4.5 C12.8954305,4.5 12,5.3954305 12,6.5 C12,7.6045695 12.8954305,8.5 14,8.5 C15.1045695,8.5 16,7.6045695 16,6.5 C16,5.3954305 15.1045695,4.5 14,4.5 Z M22.0029842,5.5 C21.1745571,5.5 20.5029842,6.17157288 20.5029842,7 C20.5029842,7.82842712 21.1745571,8.5 22.0029842,8.5 C22.8314113,8.5 23.5029842,7.82842712 23.5029842,7 C23.5029842,6.17157288 22.8314113,5.5 22.0029842,5.5 Z M5.99701582,5.5 C5.16858869,5.5 4.49701582,6.17157288 4.49701582,7 C4.49701582,7.82842712 5.16858869,8.5 5.99701582,8.5 C6.82544294,8.5 7.49701582,7.82842712 7.49701582,7 C7.49701582,6.17157288 6.82544294,5.5 5.99701582,5.5 Z"
                                        id="🎨-Color"
                                    >
                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                커뮤니티
            </li>
            <li class="flex flex-col justify-center items-center gap-1">
                <div class="w-6">
                    <svg
                        viewBox="0 0 64 64"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke-width="3"
                        stroke="#000000"
                        fill="none"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier"
                            ><circle cx="32" cy="18.14" r="11.14"></circle><path
                                d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z"
                            ></path></g
                        >
                    </svg>
                </div>
                마이페이지
            </li>
        </ul>
    </div>
</div>

<hr class="bg-gray-200 border-0 mt-14" style="height: 1px;" />
<div class="max_screen pretendard mx-auto mt-5 mb-10">푸터푸터</div>

<style>
    .nav-bar {
        height: 5rem; /* 20 in tailwind units */
        transition: height 0.3s ease;
    }

    .nav-bar.shrink {
        height: 3rem; /* 14 in tailwind units */
    }
</style>
