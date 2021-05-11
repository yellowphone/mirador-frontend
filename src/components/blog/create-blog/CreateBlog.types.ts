import { Loader } from '@googlemaps/js-api-loader';
import { Dispatch, SetStateAction } from 'react';
import { LatLng } from '../../../types/global';
import { Tag } from '../../shared/media/Tags/Tag.types';

export interface CreateBlogDataProps {
  onSubmit: (input: { summary: string; title: string }) => void;
  loader: Loader;
  setCreateCoords: Dispatch<SetStateAction<LatLng>>;
  addElement: (type: string, content: string) => void;
  renderElements: () => (JSX.Element | undefined)[];
  setAddedTags: Dispatch<SetStateAction<Tag[]>>;
  addedTags: Tag[];
}
