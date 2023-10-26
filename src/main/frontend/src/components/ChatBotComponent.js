import React, { useEffect, useState } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { fetchChatGPTResponse } from "../api/GptApi";

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

function ResponseComponent({ steps, triggerNextStep }) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState('');

    useEffect(() => {
        async function fetchResponse() {
            // 이미 로딩 중이면 함수를 호출하지 않음
            if (loading) {
                const response = await fetchChatGPTResponse(steps['2'].value);
                setResult(response);
                setLoading(false);
            }
        }

        fetchResponse();
    }, [steps, loading]); // loading 상태 추가

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
