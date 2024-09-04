import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {Conversation} from '../chat/Conversation';
import {Footer} from '../chat/Footer';
import {Box, CircularProgress} from '@mui/material';
import {Header} from './Header';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {getToken} from '../../utils/cookies';
import jwt_decode from 'jwt-decode';
import {backendUrl, HttpMethod, sendRequest} from '../../utils/axios';
import {BackendUrls} from '../../utils/backend-urls';
import {catchRequestError, toFormData} from '../../utils/functions';
import useSound from 'use-sound';
import {useSelector} from "react-redux";
import {State} from "../../redux/reducers";

type Message = {
    text: string;
    guest: boolean;
    author: string;
    date: string | Date;
    loading?: boolean;
    fileId?: number;
};

type MessageData = {
    from_user: { first_name: string; last_name: string };
    content: string;
    timestamp: string;
    is_employer: boolean;
    file: string | null;
};

interface ChatProps {
    DrawerVisible: Dispatch<SetStateAction<boolean>>;
    conversationId?: string;
    projectName?: string;
    projectLogo?: string;
    loading: boolean;
    isImployer?: boolean;
}

export const Chat = (props: ChatProps): JSX.Element => {
    const [newMessage, setNewMessage] = useState<string>('');
    const [data, setData] = useState<Array<Message>>([]);
    const [messageLoading, setMessageLoading] = useState<boolean>(true);
    const [opened, setOpened] = useState<boolean>(false);
    const [sendLoading, setSentLoading] = useState<boolean>(false)
    const token = getToken();
    const profile: any = jwt_decode(token !== null ? token : '');
    const chatAccess = useSelector((state: State) => state.accesses).includes("chat_access");

    const soketUrl = `${process.env.NEXT_PUBLIC_SOCKET_URL}/chat/${props.conversationId}/?token=${getToken()}`;
    const [play] = useSound('/sounds/notification.mp3', {volume: 1});

    const setContent = (item: MessageData): string => {
        if (item.file !== null && item.file)
            return decodeURI(item.file).split('?')[0].split('/').at(-1) as string;
        else return item.content;
    };

    const sortMessage = (item: MessageData, content: string, echo: boolean) => {
        return {
            author: item.from_user.first_name + ' ' + item.from_user.last_name,
            text: content,
            file: item.file,
            guest: props.isImployer ? !item.is_employer : item.is_employer,
            date: item.timestamp,
        };
    };

    const {readyState, sendJsonMessage} = useWebSocket(soketUrl, {
        onMessage: (e) => {
            const temp = JSON.parse(e.data);

            switch (temp.type) {
                case 'last_50_messages':
                    const messages: any = [];
                    temp.messages.map((item: MessageData) => {
                        let content = setContent(item);
                        messages.push(sortMessage(item, content, false));
                    });
                    setData(messages.reverse());
                    setMessageLoading(false);
                    break;
                case 'chat_message_echo':
                    let content = setContent(temp.message);
                    const historyMessages = sortMessage(temp.message, content, true);
                    setData((data) => [...data, historyMessages]);
                    setOpened((r) => !r);
                    if (temp.message.from_user.id !== profile.user_id) play();
                    break;
                default:
                    break;
            }
        },
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const sendMessage = () => {
        sendJsonMessage({
            type: 'chat_message',
            message: newMessage,
        });
        setNewMessage('');
    };

    const sendFileMessage = (e: File) => {
        setSentLoading(true)
        let fileId = Math.random() * (1000000000 - 1) + 1;
        let author = '';
        data.map((item) => {
            if (!item.guest) {
                author = item.author;
            }
        });
        setData((r) => [
            ...r,
            {
                author,
                date: new Date(),
                guest: false,
                text: e.name,
                loading: true,
                fileId,
            },
        ]);
        sendRequest<{
            id: string;
        }>(
            BackendUrls.create_file_message,
            HttpMethod.POST,
            toFormData({
                file: e,
                conversation: props.conversationId,
            }),
        )
            .then((res) => {
                sendJsonMessage({
                    type: 'file',
                    id: res.data.id,
                });
                setData(data.filter((item) => item.fileId !== fileId));
            })
            .catch(catchRequestError)
            .finally(() => setSentLoading(false))

    };

    useEffect(() => {
        if (connectionStatus === 'Open') {
            sendJsonMessage({
                type: 'read_messages',
            });
        }
    }, [connectionStatus, sendJsonMessage]);

    return (
        <Box sx={{width: {md: '500px', xs: '100%'}}}>
            <Header
                loading={props.loading}
                title={props.projectName}
                profileIcon={props.projectLogo}
                DrawerVisible={props.DrawerVisible}
            />
            {messageLoading ? (
                <Box
                    sx={{
                        height: chatAccess ? 'calc(100vh - 120px)' : 'calc(100vh - 60px)',
                        overflowY: 'auto',
                        padding: '30px 0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress/>
                </Box>
            ) : (
                <Conversation data={data}/>
            )}
            {chatAccess && <Footer
                setMessage={setNewMessage}
                onSend={sendMessage}
                message={newMessage}
                sendFile={sendFileMessage}
                sendLoading={sendLoading}
            />}
        </Box>
    );
};
