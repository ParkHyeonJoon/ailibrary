// src/api/GptApi.js
export const fetchChatGPTResponse = async (userInput) => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    try {
        const response = await fetch('http://ec2-15-164-252-94.ap-northeast-2.compute.amazonaws.com:5001/api/gpt' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userInfo.userName,
                text: userInput,
            }),
        });

        const data = await response.json();
        return data.response;

    } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        return 'Sorry, I couldn\'t understand that.';
    }
};
