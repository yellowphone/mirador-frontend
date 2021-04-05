import { Loader } from '@googlemaps/js-api-loader';
import { TSFixMe } from '../../../types/global';

export interface CreateExperienceDataProps {
  onSubmit: TSFixMe;
  setCreateCoords: TSFixMe;
  setAddedTags: TSFixMe;
  addedTags: TSFixMe[];
  loader: Loader;
  onUploadInputChange: TSFixMe;
  spin: TSFixMe;
}
