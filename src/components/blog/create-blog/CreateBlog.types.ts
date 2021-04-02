import { Loader } from '@googlemaps/js-api-loader';
import { SubmitHandler } from 'react-hook-form';

export interface CreateBlogDataProps {
    onSubmit: SubmitHandler<Record<string, any>>
    loader: Loader
    setCreateCoords: Function
    addElement: Function
    renderElements: Function
    setAddedTags: Function
    addedTags: Object[]
}

export interface ElementDataProps {
    type: string
    content: string
}