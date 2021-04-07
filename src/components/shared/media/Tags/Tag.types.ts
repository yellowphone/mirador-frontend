export interface TagDataProps {
  tag: string;
  add: boolean;
  close: boolean;
}

export interface Tag {
  pktag: number;
  tag: string;
}

export interface TagGridDataProps {
  tags: Tag[];
}
