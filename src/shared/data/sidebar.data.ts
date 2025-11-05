import { PAGES } from "@/shared/constants.ts";

export interface SidebarMenuItem {
  name: string;
  href: string;
}

export const SIDEBAR_MENU_LINKS: Array<SidebarMenuItem> = [
  { name: "Дашборд", href: PAGES.DASHBOARD },
  { name: "Мои записи", href: PAGES.ENTRIES },
  { name: "Создать запись", href: PAGES.CREATE_ENTRY },
  { name: "Методологии", href: PAGES.METHODOLOGIES },
];
