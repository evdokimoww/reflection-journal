export const PAGES = {
  DASHBOARD: "/",
  NOTES: "/notes",
  CREATE_NOTE: "/create",
  METHODOLOGIES: "/methodologies",
  PROFILE: "/profile",
  AUTH: "/auth",
  NOTE: (id: string) => `/notes/${id}`,
};
