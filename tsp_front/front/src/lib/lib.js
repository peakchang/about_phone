import Cookies from "js-cookie";
import axios from "axios";
import { back_api } from "./const";
import { goto } from "$app/navigation";



export const isStrongPassword = (password) => {
    // 비밀번호가 6자리 이상이고, 숫자, 문자, 특수문자가 혼합되었는지 확인하는 정규표현식
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W).{6,}$/;
    return regex.test(password);
}


export const cleanPhoneNumber = (phoneNumber) => {
    // 전화번호에서 하이픈(-)을 제거하여 숫자만 남깁니다.
    const cleanedNumber = phoneNumber.replace(/-/g, "");

    // 010으로 시작하는 11자리 숫자인지 확인합니다.
    const regex = /^010\d{8}$/; // 010으로 시작하고, 뒤에 8자리 숫자가 오는지 확인하는 정규표현식
    const isValidPhoneNumber = regex.test(cleanedNumber);

    // 유효한 전화번호일 경우 숫자만 남긴 값(cleanedNumber)을 반환하고, 그렇지 않을 경우 false를 반환합니다.
    return isValidPhoneNumber ? cleanedNumber : false;
}

export const isEmptyObj = (obj) => {

    let result = true;

    try {
        if (obj.constructor === Object
            && Object.keys(obj).length === 0) {
            result = false;
        }
    } catch (error) {
        result = false;
    }



    return result;
}


export const formatDate = (date, yearBool) => {
    let returnDate;
    const year = date.getFullYear().toString().slice(2); // '23'
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로
    const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로
    const hours = String(date.getHours()).padStart(2, '0'); // 시를 2자리로
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 분을 2자리로
    if (yearBool) {
        returnDate = `${year}.${month}.${day} ${hours}:${minutes}`
    } else {
        returnDate = `${month}.${day} ${hours}:${minutes}`
    }
    return returnDate
}

export const cookiesExpireAtMidnight = (name, value) => {
    var now = new Date();

    // 현재 날짜를 설정
    now.setHours(0, 0, 0, 0);

    // 당일 자정에 만료될 쿠키를 설정하기 위해
    // 날짜를 하루 뒤로 설정
    now.setDate(now.getDate() + 1);
    now.setHours(now.getHours() + 9);

    // 쿠키 설정
    Cookies.set(name, value, { expires: now });
}


export const isValidEmail = (email) => {
    // 이메일 유효성 검사를 위한 정규 표현식
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // 정규 표현식을 사용하여 이메일 주소 검사
    return emailRegex.test(email);
}



export const dataURItoBlob = (dataURI) => {
    const bytes =
        dataURI.split(",")[0].indexOf("base64") >= 0
            ? atob(dataURI.split(",")[1])
            : unescape(dataURI.split(",")[1]);
    const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const max = bytes.length;
    const ia = new Uint8Array(max);
    for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
    return new Blob([ia], { type: mime });
};


export const moveToMiddle = (target) => {
    const clientRect = target.getBoundingClientRect();
    const relativeTop = clientRect.top;
    const scrolledTopLength = window.pageYOffset;
    const absoluteTop = scrolledTopLength + relativeTop - 150;
    window.scrollTo({
        top: absoluteTop,
        behavior: "smooth",
    });

    setTimeout(() => {
        target.focus();
    }, 300)
}

export const arrangeJobList = (list) => {
    for (let i = 0; i < list.length; i++) {
        const date = new Date(list[i].st_created_at);
        const year = date.getFullYear().toString().slice(2); // '23'
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // '07'
        const day = date.getDate().toString().padStart(2, "0"); // '14'
        list[i]["date_str"] = `${year}.${month}.${day}`;

        if (list[i]['st_img']) {
            list[i]["img_arr"] = JSON.parse(list[i]['st_img'])
            list[i]['main_img'] = list[i]['img_arr'][0]['baseUrl']
        }

        if (list[i]['st_ad_badge_list']) {
            list[i]['badgeArr'] = list[i]['st_ad_badge_list'].split(',')
        }
    }
}

export const returnObjOtherVal = (obj, inpKey, inpVal, outKey) => {
    // @ts-ignore
    for (const itj of obj) {
        if (itj[inpKey] === inpVal) {
            return itj[outKey]
        }
    }
}


export const getRandomNumbers = (maxCount, count) => {
    const randomNumbers = [];

    if (maxCount < count) {
        // maxCount가 count보다 작을 경우, 가능한 범위 내에서 모든 값을 사용합니다.
        for (let i = 0; i <= count; i++) {
            const randomNumber = Math.floor(Math.random() * (maxCount + 1));
            randomNumbers.push(randomNumber);
        }
    } else {
        // maxCount가 count 이상이면 중복 없이 랜덤 값을 생성합니다.
        while (randomNumbers.length < count) {
            const randomNumber = Math.floor(Math.random() * (maxCount + 1));

            // 중복된 값이 아니면 배열에 추가
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
            }
        }
    }
    return randomNumbers;
}




// export const goToBoardViewAddCount = async (data: any) => {
//     try {
//         await axios.post(`${back_api}/board/plus_view_count`, {
//             boId: data.bo_id,
//         });
//     } catch (error) { }

//     goto(`/community/${data.bo_category}/${data.bo_id}`);
// }

// export const goToJobViewAddCount = async (data: any) => {
//     try {
//         await axios.post(`${back_api}/findjob/plus_view_count`, {
//             stId: data.st_id,
//         });
//     } catch (error) { }

//     goto(`/findjob/${data.st_id}`);

// }