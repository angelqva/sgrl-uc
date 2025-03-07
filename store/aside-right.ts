import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  isOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

export const useSidebarRightStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
      openSidebar: () => set({ isOpen: true }),
      closeSidebar: () => set({ isOpen: false }),
    }),
    {
      name: "sidebar-right-storage", // Key for localStorage
    },
  ),
);
