import { Loader } from '@googlemaps/js-api-loader';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Tag } from '../../shared/media/Tags/Tag.types';

export interface ExperienceInput {
  title: string;
  summary: string;
  miles: string;
  elevation: string;
  difficulty: string;
}
export interface CreateExperienceDataProps {
  onSubmit: (input: ExperienceInput) => void;
  setAddedTags: Dispatch<SetStateAction<Tag[]>>;
  addedTags: Tag[];
  loader: Loader;
  onUploadInputChange: (e: FormEvent<HTMLInputElement>) => void;
  spin: boolean;
}
