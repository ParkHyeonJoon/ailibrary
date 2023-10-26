
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
    {
        id: '0',
        message: '반갑습니다. 저는 도서관 챗봇입니다. 도서관에 관련된 질문이나 도움이 필요한 내용이 있으면 언제든지 물어보세요. 저는 최대한 도움을 드리겠습니다.',
        trigger: '1',
    }, {
        id: '1',
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',

        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [

            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },

        ],
        end: true
    }
];

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
    floating: true,
};

function ChatBotComponent() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ChatBot

                    // This appears as the header
                    // text for the chat bot
                    headerTitle="LBot"
                    steps={steps}
                    {...config}

                />
            </ThemeProvider>
        </div>
    );
}

export default ChatBotComponent;