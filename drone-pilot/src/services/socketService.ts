import { io, Socket } from "socket.io-client";

type EventCallback<T> = (data: T) => void;
type ErrorCallback = (error: Error) => void;
type DisconnectCallback = () => void;

class SocketService {
  private socket: Socket | null = null;
  private errorCallback?: ErrorCallback;
  private disconnectCallback?: DisconnectCallback;

  connect(url: string): void {
    if (!this.socket) {
      this.socket = io(url, { transports: ["polling"] });

      this.socket.on("connect", () => {
        console.log("Socket connected, id:", this.socket);
      });

      this.socket.on("connect_error", (err) => {
        console.error("Socket connect error:", err);
        this.errorCallback?.(err instanceof Error ? err : new Error(String(err)));
      });

      this.socket.on("disconnect", (reason) => {
        console.warn("Socket disconnected:", reason);
        this.disconnectCallback?.();
      });
    }
  }

  subscribe<T>(event: string, callback: EventCallback<T>): void {
    this.socket?.on(event, callback);
  }

  unsubscribe(event: string): void {
    this.socket?.off(event);
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  onError(callback: ErrorCallback) {
    this.errorCallback = callback;
  }

  onDisconnect(callback: DisconnectCallback) {
    this.disconnectCallback = callback;
  }
}

export const socketService = new SocketService();
