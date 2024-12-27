import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

if (
    !process.env.NEXT_PUBLIC_PUSHER_APP_ID ||
    !process.env.NEXT_PUBLIC_PUSHER_APP_KEY ||
    !process.env.NEXT_PUBLIC_PUSHER_SECRET ||
    !process.env.NEXT_PUBLIC_PUSHER_CLUSTER
) {
    console.log('Missing Pusher environment variables.');
    throw new Error('Pusher environment variables are missing');
}

export const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true,
});

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    channelAuthorization: {
        endpoint: '/api/pusher/auth',
        transport: 'ajax',
    },
});
