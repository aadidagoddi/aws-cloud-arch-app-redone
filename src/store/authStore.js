import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  hasAWSLinked: false,
  awsCredentials: null,

  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      hasAWSLinked: false,
      awsCredentials: null,
    }),

  linkAWS: (credentials) =>
    set({
      hasAWSLinked: true,
      awsCredentials: credentials,
    }),

  updateUser: (userData) =>
    set((state) => ({
      user: { ...state.user, ...userData },
    })),
}));
