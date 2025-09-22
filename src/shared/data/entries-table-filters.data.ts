import { IFilterItem } from "@/shared/types/types";

export enum SortingDirection {
  Newest = "newest",
  Latest = "latest",
}

export enum FiltrationType {
  None = "none",
  Methodology = "methodology",
  Tag = "tag",
  Date = "date",
}

export const TABLE_SORT_ITEMS: IFilterItem[] = [
  { label: "Сначала новее", value: SortingDirection.Newest },
  { label: "Сначала старее", value: SortingDirection.Latest },
];

export const TABLE_FILTER_ITEMS: IFilterItem[] = [
  {
    label: "отсутствует",
    value: FiltrationType.None,
  },
  {
    label: "по методологии",
    value: FiltrationType.Methodology,
  },
  { label: "по тегу", value: FiltrationType.Tag },
  { label: "по дате", value: FiltrationType.Date },
];

export const STATE_FIELDS_BY_FILTRATION_TYPE: Record<FiltrationType, string> = {
  [FiltrationType.None]: "",
  [FiltrationType.Methodology]: "changedMethodologyFilterValue",
  [FiltrationType.Tag]: "changedTagFilterValue",
  [FiltrationType.Date]: "changedDateFilterValue",
};
