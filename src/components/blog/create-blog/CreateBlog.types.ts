import { Dispatch, SetStateAction } from 'react';
import { Tag } from '../../shared/media/Tags/Tag.types';

export interface CreateBlogDataProps {
  onSubmit: (input: { summary: string; title: string }) => void;
  addElement: (type: string, content: string) => void;
  renderElements: () => JSX.Element | undefined;
  setAddedTags: Dispatch<SetStateAction<Tag[]>>;
  addedTags: Tag[];
}
