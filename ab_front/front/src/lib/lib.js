
export function isValidEmail(email) {
    // 이메일을 검사할 정규 표현식
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}