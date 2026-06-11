import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer';
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from '@/constants';

type WindowKey = keyof typeof WINDOW_CONFIG;

type WindowData = {
    id?: number;
    name?: string;
    kind?: string;
    children?: unknown[];
    [key: string]: unknown; // por si alguna ventana recibe datos extra
} | null;

interface WindowState {
    isOpen: boolean;
    zIndex: number;
    data: WindowData;
}

type WindowsMap = {
    [K in WindowKey]: WindowState;
};

interface WindowStore {
    windows: WindowsMap;
    nextZIndex: number;
    openWindow: (windowKey: WindowKey, data?: WindowData) => void;
    closeWindow: (windowKey: WindowKey) => void;
    focusWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(
    immer((set)=>({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey:WindowKey, data = null) =>
            set((state:any)=> {
                const win = state.windows[windowKey as WindowKey];
                //Defensive: if the windowKey is invalid, do nothing.
                if(!win) return;
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex++;
            }),

        closeWindow: (windowKey:WindowKey) =>
            set((state:any)=> {
                const win = state.windows[windowKey];
                //Defensive: if the windowKey is invalid, do nothing.
                if(!win) return;
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),

        focusWindow: (windowKey:WindowKey) =>
            set((state:any)=> {
                const win = state.windows[windowKey];
                win.zIndex = state.nextZIndex++;
            }),

        
}))
); 

export default useWindowStore;