import React, { useEffect, useState } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { fetchChatGPTResponse } from "../api/GptApi";
import { fetchChatGPTDelete } from "../api/GptDeleteApi"

// Creating our own theme
const theme = {
    background: '#ffffff',
    headerBgColor: '#aebaff',
    headerFontSize: '20px',
    botBubbleColor: '#EFF2FFFF',
    headerFontColor: 'white',
    botFontColor: 'black',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};

// Set some properties of the bot
const config = {
    botAvatar: require('../assets/robot.png'),
    botDelay: 1000,
    floating: true
};

var count = 0;
function ResponseComponent({ steps, triggerNextStep }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState('');


    useEffect(() => {
        async function fetchResponse() {
            // 이미 로딩 중이면 함수를 호출하지 않음
            if (loading) {
                const userInput = steps['2'].value;
                if (userInput.charAt(0) === '!') {
                    try {
                        const response = await fetch(`http://localhost:8080/book/search?keyword=${userInput.slice(1)}`);

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const data = await response.json();
                        console.log(data);
                        setResult(
                            <div>
                                제목: {data[0].bookTitle}
                                <br />
                                저자: {data[0].author}
                                <br />
                                출판연도: {data[0].publishedDate}
                                <br />
                                츨판사: {data[0].publisher}
                                <br />
                                장르: {data[0].category}
                                <br />
                                위치: {data[0].floor}층
                            </div>
                        )
                        setLoading(false);
                    } catch (error) {
                        console.error('Error searching books: ', error);
                        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
                    }
                } else {
                    count = count + 1;
                    console.log(count);
                    if (count === 6) { // 6번째 질문에 대화 초기화
                        const response = await  fetchChatGPTDelete();
                        console.log(response);
                    }
                    const response = await fetchChatGPTResponse(userInput);
                    setResult(<div>{response}</div>);
                    setLoading(false);
                }
            }
        }

        fetchResponse();
    }, [steps, loading]);

    useEffect(() => {
        if (!loading) {
            triggerNextStep();
        }
    }, [loading, triggerNextStep]);

    return loading ? <Loading /> : <div>{result}</div>;
}

function ChatBotComponent() {
    const steps = [
        {
            id: '1',
            message: '무엇이 궁금하신가요?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3'
        },
        {
            id: '3',
            component: <ResponseComponent />,
            waitAction: true,
            trigger: '1'
        },
    ];


    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ChatBot
                    steps={steps}
                    theme={theme}
                    {...config}
                />
            </ThemeProvider>
        </div>
    );
}

export default ChatBotComponent;
