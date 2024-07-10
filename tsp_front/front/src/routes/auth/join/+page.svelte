<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { user_info } from "$lib/store";
    import { Modal, Button } from "flowbite-svelte";
    import {
        isStrongPassword,
        cleanPhoneNumber,
        isValidEmail,
        isValidPhoneNumber,
    } from "$lib/lib";
    import { back_api } from "$lib/const";

    onMount(() => {
        if ($user_info) {
            alert("이미 로그인 되어 있습니다.");
            goto("/");
            return;
        }
        emailArea.focus();
    });

    // 기본 value 모음

    let email = "";
    let phone = "";
    let emailAuthNumber = "";
    let phoneAuthNumber = "";
    let nickname = "";
    let password = "";

    // 부가정보 (전체동의 및 기타 동의동 checked)
    let allAgree;
    let usageContent;
    let persnamInfo;
    let fourteen;

    // 각 동의항목 안내사항 modal boolean
    let usageContentModal = false;
    let persnamInfoModal = false;

    // 각 input창들 focus를 위한 element
    let emailArea;
    let phoneArea;
    let nicknameArea;
    let passwordArea;

    // 인증번호 보내기
    let randomNumber;
    let emailTimerStr = "03:00";
    let phoneTimerStr = "03:00";
    let emailAuthBool = true;
    let phoneAuthBool = true;
    let emailAuthSuccess = false;
    let phoneAuthSuccess = false;

    // 항목들 중 중복된 항목이 있을경우를 대비해서~~
    let emailDuplicate = false;
    let phoneDuplicate = false;
    let nicknameDuplicate = false;


    let intervalId;

    // 동의 항목 체크시 전체동의가 되느냐~ 마느냐~
    $: {
        if (usageContent && persnamInfo && fourteen) {
            allAgree = true;
        } else {
            allAgree = false;
        }
    }

    // 1. 이메일 인증버튼 클릭! (비어있으면 에러! / 이메일 형식 아니면 에러! / 중복된 값 있을경우 인증 창 안나오고 경고메세지!)
    async function emailAuthPost() {
        if (!email) {
            alert("이메일 값이 입력되지 않았습니다. 확인해주세요");
            emailArea.focus();
            return false;
        }

        const emailChk = isValidEmail(email);
        if (!emailChk) {
            alert("이메일 형식이 잘못되었습니다. 확인해주세요");
            emailArea.focus();
            return false;
        }

        // 랜덤 넘버 만들어서 백에 전송 / 백에서 랜덤 넘버 DB 입력 후 문자 발송
        try {
            randomNumber = Math.floor(Math.random() * 900000) + 100000;
            const res = await axios.post(`${back_api}/auth/join_email_chk`, {
                email,
                randomNumber,
            });
            if (res.data.duplicated) {
                emailDuplicate = true;
                return false;
            }
        } catch (error) {
            console.error(error.message);
        }

        try {
            emailAuthBool = false;
            countdownTimer(emailOnTimerEnd, emailAuthBool, "email");
        } catch (error) {
            console.error(error.message);
        }
    }

    // 2. 이메일 인증 확인 창!!!
    async function emailChkAuthNum() {
        try {
            const res = await axios.post(
                `${back_api}/auth/join_email_auth_chk`,
                {
                    email,
                    authNumber: emailAuthNumber,
                },
            );

            // 인증 성공시 인증창 닫고 이메일 못바꾸게 변경
            if (
                res.data.status &&
                res.data.auth_info.at_authnum == emailAuthNumber
            ) {
                alert("이메일 인증 성공했습니다!");
                emailAuthSuccess = true;
                emailAuthBool = true;
            } else {
                alert(res.data.message);
            }
        } catch (error) {}
    }

    // 3. 휴대폰 인증 하기~~~~~~~~~~~~

    async function phoneAuthPost() {
        if (!phone) {
            alert("휴대폰 번호가 입력되지 않았습니다. 확인해주세요");
            phoneArea.focus();
            return false;
        }

        const phoneChk = isValidPhoneNumber(phone);
        if (!phoneChk) {
            alert("휴대폰 번호가 잘못되었습니다. 확인해주세요");
            phoneArea.focus();
            return false;
        }

        const cleanPhoneNum = cleanPhoneNumber(phone);

        // 랜덤 넘버 만들어서 백에 전송 / 백에서 랜덤 넘버 DB 입력 후 문자 발송
        try {
            randomNumber = Math.floor(Math.random() * 900000) + 100000;
            console.log(randomNumber);
            const res = await axios.post(`${back_api}/auth/join_phone_chk`, {
                cleanPhoneNum,
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
            console.log("여기는 오니??");
            phoneAuthBool = false;

            countdownTimer(phoneOnTimerEnd, phoneAuthBool, "phone");
        } catch (error) {
            console.error(error.message);
        }
    }

    // 4. 휴대폰 인증 확인 창!!!
    async function phoneChkAuthNum() {
        const cleanPhoneNum = cleanPhoneNumber(phone);
        try {
            const res = await axios.post(
                `${back_api}/auth/join_phone_auth_chk`,
                {
                    cleanPhoneNum,
                    authNumber: phoneAuthNumber,
                },
            );

            // 인증 성공시 인증창 닫고 이메일 못바꾸게 변경
            if (
                res.data.status &&
                res.data.auth_info.at_authnum == phoneAuthNumber
            ) {
                alert("휴대폰 번호 인증 성공했습니다!");
                phoneAuthSuccess = true;
                phoneAuthBool = true;
                clearInterval(intervalId)
            } else {
                alert(res.data.message);
            }
        } catch (error) {}
    }

    // 닉네임 입력 후 포커스 아웃 시 닉네임 체크
    async function nicknameChk() {
        try {
            const res = await axios.post(`${back_api}/auth/join_nick_chk`, {
                nickname,
            });
            if (res.data.duplicated) {
                nicknameDuplicate = true;
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleSubmit() {
        if (nicknameDuplicate) {
            alert("중복되는 닉네임 입니다. 확인해주세요");
            emailArea.focus();
            return false;
        }

        if (!email) {
            alert("이메일을 입력해주세요");
            emailArea.focus();
            return false;
        } else if (!emailAuthSuccess) {
            alert("이메일 인증이 완료되지 않았습니다. 인증을 완료해주세요");
            emailArea.focus();
            return false;
        } else if (!nickname) {
            alert("닉네임을 입력해주세요");
            nicknameArea.focus();
            return false;
        } else if (!password) {
            alert("비밀번호를 입력해주세요");
            passwordArea.focus();
            return false;
        } else if (!isStrongPassword(password)) {
            alert(
                "비밀번호 형식이 맞지 않습니다. 숫자 / 문자 / 특수문자 혼합 6자리 이상으로 만들어주세요",
            );
            passwordArea.focus();
            return false;
        } else if (!usageContent || !persnamInfo || !fourteen) {
            alert("약관에 동의하셔야 합니다.");
            return false;
        }

        try {
            const res = await axios.post(`${back_api}/auth/join`, {
                mb_email: email,
                mb_nick: nickname,
                mb_pwd: password,
            });
            if (res.data.status) {
                alert("회원가입 성공! 로그인 해주세요!");
                goto("/auth/login");
            } else {
                alert(res.data.message);
            }
        } catch (error) {}
    }

    // 여기는~~~~ 카카오 로그인~~
    const kakao_login = () => {
        const kakaoInfo = {
            // kakao_restapi: "e6c8c90ba06c8dcbe1825e0785679d30",
            kakao_restapi: import.meta.env.VITE_KAKAO_RESTAPI,
            kakao_redirect: import.meta.env.VITE_KAKAO_REDIRECT,
        };
        location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoInfo.kakao_restapi}&redirect_uri=${kakaoInfo.kakao_redirect}&response_type=code`;
    };

    // ******************* lib

    

    function countdownTimer(callback, authBool, type) {
        // let totalSeconds = 3 * 60 - 1; // 3분을 초로 변환
        let totalSeconds = 10;
        intervalId = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(intervalId); // 카운트다운 종료
                callback();
            } else {
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const timeString = `${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

                if (type == "email") {
                    emailTimerStr = timeString;
                } else {
                    phoneTimerStr = timeString;
                }

                totalSeconds--;
                // console.log(totalSeconds);
            }

            if (authBool) {
                clearInterval(intervalId);
            }
        }, 1000); // 1초마다 감소
    }

    async function emailOnTimerEnd() {
        emailTimerStr = "시간 초과!";

        try {
            const res = await axios.post(
                `${back_api}/auth/email_auth_over_time`,
                {
                    email,
                    randomNumber,
                },
            );

            if (res.status) {
                alert("입력시간 초과! 다시 시도해주세요!");
                emailAuthSuccess = false;
                emailAuthBool = true;
                emailTimerStr = "03:00";
            }
        } catch (error) {}
    }

    async function phoneOnTimerEnd(timerStr) {
        phoneTimerStr = "시간 초과!";
        const cleanPhoneNum = cleanPhoneNumber(phone);
        try {
            const res = await axios.post(
                `${back_api}/auth/phone_auth_over_time`,
                {
                    cleanPhoneNum,
                    randomNumber,
                },
            );

            if (res.status) {
                alert("입력시간 초과! 다시 시도해주세요!");
                phoneAuthSuccess = false;
                phoneAuthBool = true;
                phoneTimerStr = "03:00";
            }
        } catch (error) {}
    }
</script>

<!-- class="w-full max-w-sm mx-auto suit-font pt-12" -->
<div class="w-full max-w-sm mx-auto pt-12 pretendard">
    <div class="mb-5 text-center mx-auto h-7">
        <a href="/">
            <img src="/logo.png" alt="" class="mx-auto h-full" />
        </a>
    </div>

    <form on:submit|preventDefault={handleSubmit}>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    이메일
                </span>
                <div class="mb-4">
                    <div class="relative">
                        <input
                            type="search"
                            class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="이메일 인증을 완료해주세요"
                            bind:value={email}
                            bind:this={emailArea}
                            disabled={emailAuthSuccess}
                            on:focus={() => {
                                emailDuplicate = false;
                            }}
                            class:bg-red-50={emailDuplicate}
                            class:text-red-600={emailDuplicate}
                        />

                        {#if emailAuthBool}
                            <button
                                type="button"
                                on:click={emailAuthPost}
                                class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
                                class:hidden={emailAuthSuccess}
                            >
                                인증발송
                            </button>
                        {:else}
                            <div
                                class="text-white absolute right-2.5 bottom-2.5 bg-gray-500 font-medium rounded-lg text-sm px-3 py-1"
                                class:hidden={emailAuthSuccess}
                            >
                                인증발송
                            </div>
                        {/if}
                    </div>

                    {#if emailDuplicate}
                        <div class="mt-2 ml-2 text-red-600 text-xs">
                            이미 가입된 이메일이 있습니다.
                        </div>
                    {/if}
                </div>
            </div>

            <div class="mb-4" class:hidden={emailAuthBool}>
                <div class="relative">
                    <input
                        type="search"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                        placeholder="인증번호 입력 {emailTimerStr}"
                        bind:value={emailAuthNumber}
                    />
                    <button
                        type="button"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-4 py-1"
                        on:click={emailChkAuthNum}
                    >
                        확인
                    </button>
                </div>
            </div>

            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    휴대폰
                </span>
                <div class="mb-4">
                    <div class="relative">
                        <input
                            type="search"
                            class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="휴대폰 인증을 완료해주세요"
                            bind:value={phone}
                            bind:this={phoneArea}
                            disabled={phoneAuthSuccess}
                            on:focus={() => {
                                emailDuplicate = false;
                            }}
                            class:bg-red-50={phoneDuplicate}
                            class:text-red-600={phoneDuplicate}
                        />

                        {#if phoneAuthBool}
                            <button
                                type="button"
                                on:click={phoneAuthPost}
                                class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1"
                                class:hidden={phoneAuthSuccess}
                            >
                                인증발송
                            </button>
                        {:else}
                            <div
                                class="text-white absolute right-2.5 bottom-2.5 bg-gray-500 font-medium rounded-lg text-sm px-3 py-1"
                                class:hidden={phoneAuthSuccess}
                            >
                                인증발송
                            </div>
                        {/if}
                    </div>

                    {#if phoneDuplicate}
                        <div class="mt-2 ml-2 text-red-600 text-xs">
                            이미 가입된 휴대폰 번호가 있습니다.
                        </div>
                    {/if}
                </div>
            </div>

            <div class="mb-4" class:hidden={phoneAuthBool}>
                <div class="relative">
                    <input
                        type="search"
                        class="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                        placeholder="인증번호 입력 {phoneTimerStr}"
                        bind:value={phoneAuthNumber}
                    />
                    <button
                        type="button"
                        class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 active:bg-blue-600 font-medium rounded-lg text-sm px-4 py-1"
                        on:click={phoneChkAuthNum}
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
                    bind:value={nickname}
                    bind:this={nicknameArea}
                    on:focus={() => {
                        nicknameDuplicate = false;
                    }}
                    on:focusout={nicknameChk}
                    class:bg-red-50={nicknameDuplicate}
                    class:text-red-600={nicknameDuplicate}
                    class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />

                {#if nicknameDuplicate}
                    <div class="mt-2 ml-2 text-red-600 text-xs">
                        이미 사용중인 닉네임 입니다.
                    </div>
                {/if}
            </div>

            <div class="mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">
                    비밀번호
                </span>
                <input
                    type="password"
                    bind:value={password}
                    bind:this={passwordArea}
                    placeholder="숫자 / 문자 / 특수문자 혼합 6자리 이상"
                    class="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div class="border-b border-gray-200 pb-3">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={allAgree}
                        on:click={(e) => {
                            usageContent = !allAgree;
                            persnamInfo = !allAgree;
                            fourteen = !allAgree;
                        }}
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="font-medium">전체 동의</span>
                </label>
            </div>

            <div class="py-2 flex justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={usageContent}
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="text-sm">(필수) 이용 약관 동의</span>
                </label>
                <button
                    type="button"
                    class="text-sm"
                    on:click={() => {
                        usageContentModal = true;
                    }}
                >
                    보기
                </button>
            </div>

            <div class="py-2 flex justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={persnamInfo}
                        class="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0 mr-2 text-blue-400 bg-gray-300 before-chkeck"
                    />
                    <span class="text-sm"
                        >(필수) 개인정보 수집 및 이용 동의</span
                    >
                </label>
                <button
                    type="button"
                    class="text-sm"
                    on:click={() => {
                        persnamInfoModal = true;
                    }}
                >
                    보기
                </button>
            </div>

            <div class="py-2 flex justify-between">
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={fourteen}
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
                    on:click={kakao_login}
                >
                    <img src="/kakao-logo.png" alt="" style="height: 24px;" />
                    <span>카카오톡 간편 회원가입</span>
                </button>
            </div>
        </div>
    </form>
</div>

<Modal
    title="Terms of Service"
    bind:open={usageContentModal}
    autoclose
    outsideclose
>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new
        consumer privacy laws for its citizens, companies around the world are
        updating their terms of service agreements to comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes
        into effect on May 25 and is meant to ensure a common set of data rights
        in the European Union. It requires organizations to notify users as soon
        as possible of high-risk data breaches that could personally affect
        them.
    </p>
</Modal>

<Modal
    title="Terms of Service"
    bind:open={persnamInfoModal}
    autoclose
    outsideclose
>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new
        consumer privacy laws for its citizens, companies around the world are
        updating their terms of service agreements to comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes
        into effect on May 25 and is meant to ensure a common set of data rights
        in the European Union. It requires organizations to notify users as soon
        as possible of high-risk data breaches that could personally affect
        them.
    </p>
</Modal>

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }

    .before-chkeck {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    }
</style>
