import { METHODOLOGIES } from "@/shared/data/methodolodies.data";
import { REFLECTION_ENTRIES } from "@/shared/data/reflection-entries.data";

export interface ITableSortFilterItem {
  label: string;
  value: string;
}

enum SortVariants {
  Newest = "newest",
  Latest = "latest",
}

export enum FilterVariants {
  Methodology = "methodology",
  Tag = "tag",
  Date = "date",
}

export const TABLE_SORT_ITEMS: ITableSortFilterItem[] = [
  { label: "Сначала новее", value: SortVariants.Newest },
  { label: "Сначала старее", value: SortVariants.Latest },
];

export const TABLE_FILTER_ITEMS: ITableSortFilterItem[] = [
  {
    label: "отсутствует",
    value: "none",
  },
  {
    label: "по методологии",
    value: FilterVariants.Methodology,
  },
  { label: "по тегу", value: FilterVariants.Tag },
  { label: "по дате", value: FilterVariants.Date },
];

export const TABLE_FILTER_METHODOLOGY_ITEMS: ITableSortFilterItem[] =
  METHODOLOGIES.reduce(
    (acc, m) => {
      acc.push({
        label: m.title,
        value: m.id,
      });
      return acc;
    },
    [
      {
        label: "не выбрано",
        value: "none",
      },
    ] as ITableSortFilterItem[],
  );

// todo backend service
const TagsSet = new Set<string>();
REFLECTION_ENTRIES.forEach((entry) => {
  entry.tags.forEach((tag) => {
    TagsSet.add(tag);
  });
});
export const TABLE_FILTER_TAGS_ITEMS: ITableSortFilterItem[] = [
  {
    label: "не выбрано",
    value: "none",
  },
  ...Array.from(TagsSet).map((tag) => ({
    label: tag,
    value: tag,
  })),
];

export const TABLE_FILTERS_OPTIONS = {
  [FilterVariants.Methodology]: TABLE_FILTER_METHODOLOGY_ITEMS,
  [FilterVariants.Tag]: TABLE_FILTER_TAGS_ITEMS,
};
