interface IStep {
  id: string;
  value: string;
  step_id: string;
}

export interface ITag {
  id: string;
  value: string;
}

interface EntryResponseTag {
  tag: ITag;
}

interface IEntriesResponseItem {
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

export type EntriesResponseArray = IEntriesResponseItem[];

export interface IEntryListItem {
  id: string;
  created_at: string;
  title: string;
  methodology: string;
  tags: string[];
}

export interface IEntry {
  id: string;
  title: string;
  tags: ITag[];
  steps: {
    [key: string]: string;
  };
}

export interface IEntryResponseItem {
  id: string;
  title: string;
  methodology: { id: string };
  tags: EntryResponseTag[];
  steps: IStep[];
}

export interface IEntryRequestData {
  id?: string;
  title: string;
  methodologyId: string;
  tags: { id?: string; value: string }[];
  steps: { id: string; value: string }[];
}
