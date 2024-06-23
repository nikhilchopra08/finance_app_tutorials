import { boolean } from "drizzle-orm/mysql-core";
import {create} from "zustand";

type newCategoryState = {
    isOpen: boolean,
    onOpen: () => void;
    onClose: () => void;
};

export const UseNewCategorys = create<newCategoryState>((set) => ({
    isOpen : false,
    onOpen: () => set({ isOpen : true}),
    onClose : () => set({ isOpen : false})
}))