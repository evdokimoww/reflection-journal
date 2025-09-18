import { PAGES } from "@/shared/config/pages.config";

export interface ISidebarMenuItem {
  name: string;
  href: string;
}

export const SIDEBAR_MENU_LINKS: Array<ISidebarMenuItem> = [
  { name: "Дашборд", href: PAGES.DASHBOARD },
  { name: "Мои записи", href: PAGES.ENTRIES },
  { name: "Создать запись", href: PAGES.CREATE_ENTRY },
  { name: "Методологии", href: PAGES.METHODOLOGIES },
];
