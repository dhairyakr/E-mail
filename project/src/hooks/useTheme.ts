import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}));