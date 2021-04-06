import { Loader } from '@googlemaps/js-api-loader';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { LatLng, TSFixMe } from '../../../types/global';
import { Tag } from '../../shared/media/Tags/Tag.types';

export interface CreateBlogDataProps {
  onSubmit: (input: { summary: string; title: string }) => void;
  loader: Loader;
  setCreateCoords: Dispatch<SetStateAction<LatLng>>;
  // TODO: Geo!
  addContentHelper: SubmitHandler<Record<string, TSFixMe>>;
  addContent: (type: string, content: Record<string, unknown>) => void;
  html: TSFixMe;
  // END TODO!
  setAddedTags: Dispatch<SetStateAction<Tag[]>>;
  addedTags: Tag[];
}
