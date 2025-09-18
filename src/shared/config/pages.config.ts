export const PAGES = {
  DASHBOARD: "/",
  ENTRIES: "/entries",
  CREATE_ENTRY: "/create",
  ENTRY: (id: string) => `/entries/${id}`,
  METHODOLOGIES: "/methodologies",
  PROFILE: "/profile",
  AUTH: "/auth",
  FORGOT_PASSWORD: "/auth/forgot-password",
  UPDATE_PASSWORD: "/auth/update-password",
};

export const PAGES_WITHOUT_AUTH = ["/auth", "/auth/forgot-password"];
