import { TagItem } from "@/shared/types";

export interface EntryStep {
  id: string;
  value: string;
  step_id: string;
}

interface EntryResponseTag {
  tag: TagItem;
}

interface EntriesResponseItem {
  id: string;
  created_at: string;
  title: string;
  methodology: { title: string };
  tags: {
    tag: {
      value: string;
    };
  }[];
}

export type EntriesResponseArray = EntriesResponseItem[];

export interface EntryListItem {
  id: string;
  created_at: string;
  title: string;
  methodology: string;
  tags: string[];
}

export interface EntryItem {
  id: string;
  title: string;
  tags: TagItem[];
  steps: {
    [key: string]: string;
  };
}

export interface EntryResponseItem {
  id: string;
  title: string;
  methodology: { id: string };
  tags: EntryResponseTag[];
  steps: EntryStep[];
}

export interface EntryRequestData {
  id?: string;
  title: string;
  methodologyId: string;
  tags: Partial<TagItem>[];
  steps: Omit<EntryStep, "step_id">[];
}
