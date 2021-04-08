export interface ExperienceTag {
  tags: Tag;
}
export interface TagGridDataProps {
  tags: ExperienceTag[];
}

export interface TagDataProps {
  tag: string;
  add: boolean;
  close: boolean;
}

export interface Tag {
  pktag: number;
  tag: string;
}
