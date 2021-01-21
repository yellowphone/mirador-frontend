import { Loader } from '@googlemaps/js-api-loader';
import { SubmitHandler } from 'react-hook-form';

export interface CreateBlogDataProps {
    onSubmit: SubmitHandler<Record<string, any>>
    loader: Loader
    setCreateCoords: Function
    addContentHelper: SubmitHandler<Record<string, any>>
    addContent: Function
    html: Object
}