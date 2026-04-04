import { StreamVideoClient} from '@stream-io/video-react-sdk';

const apiKey=import.meta.env.VITE_STREAM_API_KEY;
let client=null;

export const initializeStreamClient= async (user,token) => {

    if(client && client?.user?.id===user.id) return client;

    if(client){
        await  disconnectStreamClient()
    }  if(!apiKey) throw new console.error("api not foun or provided");

    client=new StreamVideoClient({
        apiKey,
        user,
        token
    })
            return client
}

export const disconnectStreamClient= async()=>{
    if(client){
        try {
            await client.disconnectUser()
            client = null
        } catch (error) {
            console.error("error isconnecting stream client ",error)
        }
    }
}