import { Loader } from '@googlemaps/js-api-loader';

export interface CreateBlogDataProps {
    onSubmit: Function
    loader: Loader
    setCreateCoords: Function
    addContentHelper: Function
    addContent: Function
    html: any
}