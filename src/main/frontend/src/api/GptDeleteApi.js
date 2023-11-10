// src/api/GptApiDelete.js
export const fetchChatGPTDelete = async () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    try {
        const response = await fetch('http://localhost:5001/api/gpt/delete' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userInfo.userId,
            }),
        });

        return "삭제 완료";

    } catch (error) {
        console.error('삭제 실패: ', error);
        return '삭제 실패';
    }
};
