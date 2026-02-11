import useUserStore from "@/storage/use-userstore";
import React, { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { refreshToken } from "./api";
interface WSService {
    initializeSocket: () => void;
    emit: (event: string, data?: any) => void;
    on: (event: string, callback: (data: any) => void) => void;
    off: (event: string, callback: (data: any) => void) => void;
    removeAllListeners: (event: string) => void;
    updateAccessToken: (token: string) => void;
    disconnect: () => void;
}


const wsContext = createContext<WSService>(undefined as any);

export const WSProvider = ({ children }: { children: React.ReactNode }) => {

    const [socketAccessToken, setSocketAccessToken] = useState<string | null>(null);

    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        // const token = tokenStorage.getString("AccessToken");
        const token = useUserStore.getState().token;

        setSocketAccessToken(token);
    }, [])

    useEffect(() => {
        if (socketAccessToken) {
            if (socket.current) {
                socket.current.disconnect();
            }
        }

        socket.current = io(process.env.EXPO_PUBLIC_WS_URL!, {
            transports: ["websocket"],
            withCredentials: true,
            extraHeaders: {
                accessToken: socketAccessToken || "",
            }
        });

        socket.current.on("connection_err", (err) => {
            if (err.message === "Authentication error") {
                console.error("WebSocket authentication failed. Please check the access token.", err.message);
                refreshToken()
            }
        });

        return () => {
            socket.current?.disconnect();
        }
    }, [socketAccessToken])


    const emit = (event: string, data?: any) => {
        socket.current?.emit(event, data);
    };

    const on = (event: string, callback: (data: any) => void) => {
        socket.current?.on(event, callback);
    };

    const off = (event: string, callback: (data: any) => void) => {
        socket.current?.off(event, callback);
    };

    const removeAllListeners = (event: string) => {
        socket.current?.removeAllListeners(event);
    }

    const updateAccessToken = (token: string) => {
        setSocketAccessToken(token);
    };

    const disconnect = () => {
        socket.current?.disconnect();
    }

    const SocketService: WSService = {
        initializeSocket: () => {
            if (socket.current && !socket.current.connected) {
                socket.current.connect();
            }
        },
        emit,
        on,
        off,
        removeAllListeners,
        updateAccessToken,
        disconnect,
    }
    return (
        <wsContext.Provider value={SocketService}>
            {children}
        </wsContext.Provider>
    );

}


export const useWS = () => {
    const context = React.useContext(wsContext);
    if (!context) {
        throw new Error("useWS must be used within a WSProvider");
    }
    return context;
};


