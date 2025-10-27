import { create } from "zustand";

interface UserState {
    name: string | null;
    token: string | null;
    setUser: (name: string, token: string) => void;
    logout: () => void;
}

const loadFromStorage = () => {
    if(typeof window === "undefined") return { name: null, token: null};
    return {
        name: localStorage.getItem("trullo_name"),
        token: localStorage.getItem("trullo_token"),
    };
};

const initial = loadFromStorage();

export const useUserStore = create<UserState>((set) => ({
    name: initial.name,
    token: initial.token,
    setUser: (name: string, token: string) => {
        if(typeof window !== "unfined") {
            localStorage.setItem("trullo_name", name);
            localStorage.setItem("trullo_token", token);
        }
        set({ name, token });
    },
    logout: () => {
        if(typeof window !== "unfined") {
            localStorage.removeItem("trullo_name");
            localStorage.removeItem("trullo_token");
        }
        set({ name: null, token: null });
    },
}));