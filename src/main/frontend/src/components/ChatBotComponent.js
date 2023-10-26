import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

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
    // floating: true,
    botDelay: 5000
};

function ChatBotComponent() {
    const steps = [
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            trigger: '3'
        },
        {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            end: true,
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