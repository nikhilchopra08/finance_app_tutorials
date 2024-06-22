import { boolean } from "drizzle-orm/mysql-core";
import {create} from "zustand";

type newAccountState = {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewAccounts = create<newAccountState>((set) => ({
    isOpen : false,
    onOpen: () => set({ isOpen : true}),
    onClose : () => set({ isOpen : false})
}))