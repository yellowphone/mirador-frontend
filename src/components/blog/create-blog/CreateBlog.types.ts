import { Loader } from '@googlemaps/js-api-loader';
import { SubmitHandler } from 'react-hook-form';
import { TSFixMe } from '../../../types/global';

export interface CreateBlogDataProps {
  onSubmit: SubmitHandler<Record<string, TSFixMe>>;
  loader: Loader;
  setCreateCoords: TSFixMe;
  addContentHelper: SubmitHandler<Record<string, TSFixMe>>;
  addContent: (type: string, content: Record<string, unknown>) => void;
  html: TSFixMe;
  setAddedTags: TSFixMe;
  addedTags: TSFixMe[];
}
