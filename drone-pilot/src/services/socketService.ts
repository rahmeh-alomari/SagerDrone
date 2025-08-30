import { io, Socket } from "socket.io-client";

type EventCallback<T> = (data: T) => void;
type ErrorCallback = (error: Error) => void;
type DisconnectCallback = (reason: string) => void;

interface Subscription {
  event: string;
  callback: EventCallback<unknown>;
}

export class SocketService {
  private socket: Socket | null = null;
  private errorCallback?: ErrorCallback;
  private disconnectCallback?: DisconnectCallback;
  private subscriptions: Subscription[] = [];

  connect(url: string): void {
    if (this.socket && this.socket.connected) {
      console.log("Socket already connected:", this.socket.id);
      return;
    }

    this.socket = io(url, {
      transports: ["polling"], 
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected, id:", this.socket?.id);
    });

    this.socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err);
      this.errorCallback?.(err instanceof Error ? err : new Error(String(err)));
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
      this.disconnectCallback?.(reason);

      this.socket?.removeAllListeners();
      this.socket = null;
    });

    this.subscriptions.forEach(({ event, callback }) => {
      this.socket?.on(event, callback as EventCallback<any>);
    });
  }

  subscribe<T>(event: string, callback: EventCallback<T>): void {
    if (this.socket) {
      this.socket.on(event, callback);
    }
    this.subscriptions.push({ event, callback: callback as EventCallback<unknown> });
  }

  unsubscribe(event: string): void {
    if (this.socket) {
      this.socket.off(event);
    }
    this.subscriptions = this.subscriptions.filter((sub) => sub.event !== event);
  }

  disconnect(): void {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket.removeAllListeners();
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
