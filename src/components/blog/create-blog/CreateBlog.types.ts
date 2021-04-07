import { Loader } from '@googlemaps/js-api-loader';
import { SubmitHandler } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { LatLng, TSFixMe } from '../../../types/global';
import { Tag } from '../../shared/media/Tags/Tag.types';


export interface CreateBlogDataProps {
    onSubmit: (input: { summary: string; title: string }) => void;
    loader: Loader;
    setCreateCoords: Dispatch<SetStateAction<LatLng>>;
    addElement: (type: string, content: string) => void;
    renderElements: TSFixMe
    setAddedTags: Dispatch<SetStateAction<Tag[]>>;
    addedTags: Tag[];
}
