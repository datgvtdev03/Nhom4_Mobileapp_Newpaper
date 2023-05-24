import { create } from "zustand";

const useStore = create((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  logout: () => set({ userInfo: null }), // Phương thức đăng xuất
}));

export default useStore;
