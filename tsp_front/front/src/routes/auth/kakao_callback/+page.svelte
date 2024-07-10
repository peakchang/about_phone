<script>
    import { page } from "$app/stores";
    import axios from "axios";
    import { onMount } from "svelte";
    import { cleanPhoneNumber } from "$lib/lib";
    import Cookies from "js-cookie";
    import { goto } from "$app/navigation";
    import { Alert, Spinner } from "flowbite-svelte";
    import { user_info } from "$lib/store";
    import { back_api } from "$src/lib/const";

    let finalUrl;

    let email = "";
    let name = "";
    let phone = ""; 
    let phoneArea = "";

    let nickname;
    let nicknameArea;
    let nameArea;

    let thumbnail = "";

    // 인증 성공 상태를 나타냄
    let authSuccess = false;
    let authBool = true;
    let timerStr = "03:00";

    let authNumber;

    let randomNumber;
    let showBool = false;
    let kakaoPreSuccess = false;

    let renderingShow = Promise.resolve();

    let alertMessage;

    let phoneDuplicate = false;

    onMount(() => {
        const getCode = $page.url.searchParams.get("code");
        renderingShow = ssibalKakao(getCode);
    });

    async function ssibalKakao(code) {
        // 카카오에 토큰 정보 요청하기
        const baseUrl = "https://kauth.kakao.com/oauth/token";
        let userInfo;

        const config = {
            client_id: import.meta.env.VITE_KAKAO_RESTAPI,
            // client_secret: 'WEE91wyCpDKyQBmme6Ta8xV5FFfjfu1x',
            grant_type: "authorization_code",
            redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT,
            code: code,
        };

        const params = new URLSearchParams(config).toString();
        finalUrl = `${baseUrl}?${params}`;

        try {
            const res = await axios.post(finalUrl, {
                headers: {
                    "Content-type": "application/x-www-form-urlencoded", // 이 부분을 명시하지않으면 text로 응답을 받게됨
                },
            });
            const accessToken = res.data.access_token;
            if (accessToken) {
                const result = await axios.get(
                    "https://kapi.kakao.com/v2/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-type": "application/json",
                        },
                    },
                );
                userInfo = result.data;
            }

            email = userInfo.kakao_account.email;
            phone = userInfo.kakao_account.phone_number;
            nickname = userInfo.kakao_account.profile.nickname;
            thumbnail = userInfo.kakao_account.profile.profile_image_url;
            await axios
                .post(
                    `${back_api}/auth/kakaochk`,
                    {
                        email,
                        phone,
                        nickname,
                        name,
                        thumbnail,
                        type: "kakao",
                        work: "kakaochk",
                    },
                    { withCredentials: true },
                )
                .then((res) => {
                    kakaoPreSuccess = true;
                    $user_info = res.data.user_info;

                    if ($page.url.searchParams.get("state")) {
                        const getUrl = $page.url.searchParams.get("state");
                        goto(getUrl);
                    } else {
                        goto("/");
                    }
                })
                .catch((err) => {
                    console.error(err.message);
                });

            let tempStr = "";
            if (!name) {
                tempStr = tempStr + "이름 ";
            }
            if (!email) {
                tempStr = tempStr + "이메일 ";
            }
            if (!phone) {
                tempStr = tempStr + "휴대폰번호 ";
            }
            if (!nickname) {
                tempStr = tempStr + "닉네임 ";
            }

            if (!email || !phone || !nickname) {
                alertMessage =
                    tempStr +
                    "항목이 필요합니다. 항목을 채운 후 가입하기 버튼을 클릭해주세요.";
                if (!kakaoPreSuccess) {
                    showBool = true;
                }
            }

            if (email && phone && nickname) {
                await postKakaoLogin();
            }
        } catch (error) {
            alert("잘못된 요청입니다. 다시 시도해주세요");
            goto("/auth/login");
        }
    }

    async function kakaoSubmit() {
        if (phoneDuplicate) {
            alert("휴대폰 번호가 중복됩니다. 확인해주세요.");
            return false;
        }

        if (!authSuccess) {
            alert("휴대폰 인증이 완료되지 않았습니다. 인증을 완료해주세요.");
            return false;
        }

        await postKakaoLogin();
    }

    async function postKakaoLogin() {
        axios
            .post(
                `${back_api}/auth/kakaologin`,
                {
                    email,
                    phone,
                    nickname,
                    name,
                    thumbnail,
                    type: "kakao",
                    work: "kakaojoin",
                },
                { withCredentials: true },
            )
            .then((res) => {
                console.log(res.data);
                
                $user_info = res.data.user_info;
                goto("/");
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    async function chkAuthNum() {
        try {
            const res = await axios.post(
                `${back_api}/auth/join_phone_auth_chk`,
                {
                    randomNumber,
                },
            );

            if (
                res.data.status &&
                res.data.sel_auth_num.auth_num == authNumber
            ) {
                alert("인증 성공했습니다!");
                authSuccess = true;
                authBool = true;
                const res = await axios.post(
                    `${back_api}/auth/join_phone_auth_del`,
                    {
                        randomNumber,
                    },
                );
            } else {
                alert("인증 실패! 인증번호를 확인해주세요!");
            }
        } catch (error) {}
    }

    async function authPost() {
        if (!phone) {
            alert("전화번호 값이 입력되지 않았습니다. 확인해주세요");
            phoneArea.focus();
            return false;
        }

        const phoneNum = cleanPhoneNumber(phone);
        if (!phoneNum) {
            alert("전화번호 형식이 잘못되었습니다. 확인해주세요");
            phoneArea.focus();
            return false;
        }

        try {
            randomNumber = Math.floor(Math.random() * 900000) + 100000;
            console.log(randomNumber);
            
            const res = await axios.post(`${back_api}/auth/join_phone_chk`, {
                phoneNum,
                randomNumber,
            });
            if (res.data.duplicated) {
                phoneDuplicate = true;
                return false;
            }
        } catch (error) {
            console.error(error.message);
        }

        try {
            countdownTimer(onTimerEnd);
            authBool = false;

            const expirationDate = new Date(Date.now() + 180000);

            // axios
            //     .post("https://apis.aligo.in/send/", null, {
            //         params: {
            //             key: import.meta.env.VITE_ALIGO_KEY,
            //             user_id: import.meta.env.VITE_ALIGO_ID,
            //             sender: import.meta.env.VITE_ALIGO_SENDER,
            //             // receiver: receivers.join(','),
            //             receiver: phone,
            //             msg: `파인드분양 인증번호는 ${randomNumber} 입니다. 인증을 완료 해주세요.`,
            //             // 테스트모드
            //             testmode_yn: "Y",
            //         },
            //     })
            //     .then((res) => {
            //     })
            //     .catch((err) => {
            //     });
        } catch (error) {
            console.error(error.message);
        }
    }

    function countdownTimer(callback) {
        let totalSeconds = 3 * 60 - 1; // 3분을 초로 변환
        let intervalId = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(intervalId); // 카운트다운 종료
                callback();
            } else {
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const timeString = `${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
                timerStr = timeString;

                totalSeconds--;
            }

            if (authBool) {
                clearInterval(intervalId);
            }
        }, 1000); // 1초마다 감소
    }

    async function onTimerEnd() {
        timerStr = "시간 초과!";

        try {
            const res = await axios.post(
                `${back_api}/auth/join_phone_auth_del`,
                {
                    randomNumber,
                },
            );

            alert("입력시간 초과! 다시 시도해주세요!");
            authSuccess = false;
            authBool = true;
        } catch (error) {}
    }
</script>

{#await renderingShow}
    <div class="pt-32 flex justify-center">
        <Spinner size={"16"} />
    </div>
{:then value}
    {#if showBool}
        <div class="w-full max-w-sm mx-auto pt-5 suit-font">
            <div class="mb-1 text-center mx-auto">
                <a href="/">logo</a>
            </div>

            <form on:submit|preventDefault={kakaoSubmit}>
                <Alert>
                    <i class="fa-solid fa-circle-exclamation" />
                    {alertMessage}
                </Alert>
                <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <span
                            class="block text-gray-700 text-sm font-bold mb-2"
                        >
                            이메일
                        </span>
                        <input
                            type="email"
                            bind:value={email}
                            class="w-full border-gray-300 rounded-lg py-2 focus:ring-0 shadow-md"
                        />
                    </div>

                    <div class="mb-4">
                        <span
                            class="block text-gray-700 text-sm font-bold mb-2"
                        >
                            휴대폰번호
                        </span>
                        <div class="mb-4">
                            <div class="relative">
                                <input
                                    type="search"
                                    class="block w-full py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-0"
                                    placeholder="휴대폰 인증을 완료해주세요"
                                    bind:value={phone}
                                    bind:this={phoneArea}
                                    disabled={authSuccess}
                                    on:focus={() => {
                                        phoneDuplicate = false;
                                    }}
                                    class:bg-red-50={phoneDuplicate}
                                    class:text-red-600={phoneDuplicate}
                                />

                                {#if authBool}
                                    <button
                                        type="button"
                                        on:click={authPost}
                                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
                                        class:hidden={authSuccess}
                                    >
                                        인증발송
                                    </button>
                                {:else}
                                    <div
                                        class="text-white absolute right-2.5 bottom-2.5 bg-gray-500 font-medium rounded-lg text-sm px-3 py-1"
                                        class:hidden={authSuccess}
                                    >
                                        인증발송
                                    </div>
                                {/if}
                            </div>

                            {#if phoneDuplicate}
                                <div class="mt-2 ml-2 text-red-600 text-xs">
                                    이미 가입된 번호가 있습니다.
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="mb-4" class:hidden={authBool}>
                        <div class="relative">
                            <input
                                type="search"
                                class="block w-full py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-0"
                                placeholder="인증번호 입력 {timerStr}"
                                bind:value={authNumber}
                            />
                            <button
                                type="button"
                                class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-4 py-1"
                                on:click={chkAuthNum}
                            >
                                확인
                            </button>
                        </div>
                    </div>

                    <div class="">
                        <span
                            class="block text-gray-700 text-sm font-bold mb-2"
                        >
                            이름
                        </span>
                        <input
                            type="text"
                            bind:value={name}
                            bind:this={nameArea}
                            class="w-full border-gray-300 rounded-lg py-2 focus:ring-0 shadow-md"
                        />
                    </div>
                    <div class="mt-1 mb-4 ml-2 text-xs">
                        실명을 입력해주세요
                    </div>

                    <div class="mb-4">
                        <span
                            class="block text-gray-700 text-sm font-bold mb-2"
                        >
                            닉네임
                        </span>
                        <input
                            type="text"
                            bind:value={nickname}
                            bind:this={nicknameArea}
                            class="w-full border-gray-300 rounded-lg py-2 focus:ring-0 shadow-md"
                        />
                    </div>

                    <div class="mt-3">
                        <button
                            class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            가입하기
                        </button>
                    </div>
                </div>
            </form>
        </div>
    {/if}
{/await}