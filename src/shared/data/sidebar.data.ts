import { PAGES } from "@/config/pages.config";

export interface ISidebarMenuItem {
  name: string;
  href: string;
}

export const SIDEBAR_MENU_LINKS: Array<ISidebarMenuItem> = [
  { name: "Дашборд", href: PAGES.DASHBOARD },
  { name: "Мои записи", href: PAGES.NOTES },
  { name: "Создать запись", href: PAGES.CREATE_NOTE },
  { name: "Методологии", href: PAGES.METHODOLOGIES },
];
