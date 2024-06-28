export const back_api = `${import.meta.env.VITE_SERVER_URL}/api/v9`

export const boardCategoryList = [
    { name: '자유게시판', link: 'free' },
    { name: '분양 질문/답변', link: 'land_qna' },
    { name: '청약 질문/답변', link: 'sub_qna' },
    { name: '유머게시판', link: 'humor' },
]

// export const category_list = [
//     {link : 'health', name : '건강'},
//     {link : 'news', name : '뉴스'},
//     {link : 'estate', name : '분양'},
//     {link : 'etc', name : '기타'},
// ]

export const category_list = [
    { link: 'free', name: '자유게시판' },
    { link: 'land_qna', name: '분양 질문/답변' },
    { link: 'sub_qna', name: '청약 질문/답변' },
    { link: 'humor', name: '유머게시판' },
]

export const siteName = "올댓분양"