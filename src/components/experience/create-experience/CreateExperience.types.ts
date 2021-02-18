import { Loader } from '@googlemaps/js-api-loader';

export interface CreateExperienceDataProps {
    onSubmit: Function
    setCreateCoords: Function
    setAddedTags: Function
    addedTags: Object[]
    loader: Loader
}