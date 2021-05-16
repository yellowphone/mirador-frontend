import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_EXPERIENCE } from '../../../graphql/mutations/experienceMutation';
import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { CreateExperience } from './CreateExperience';
import { Loader } from '@googlemaps/js-api-loader';
import { NoLogin } from '../../shared/no-login/NoLogin';
import { useCookies } from 'react-cookie';
import { Tag } from '../../shared/media/Tags/Tag.types';
import { ExperienceInput } from './CreateExperience.types';

export const ConnectedCreateExperience = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [createCoords, setCreateCoords] = useState({ lat: 0, lng: 0 });

  const [spin, setSpin] = useState(false);

  const [files, setFiles] = useState<FileList[]>([]);

  const [createExperience] = useMutation(CREATE_EXPERIENCE);

  const [addedTags, setAddedTags] = useState<Tag[]>([]);

  const history = useHistory();

  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  const onUploadInputChange = (e: FormEvent<HTMLInputElement>) => {
    const newFiles = (e.target as HTMLInputElement).files as FileList;
    setFiles((files: FileList[]) => [...files, newFiles]);
  };

  const onSubmit = (input: ExperienceInput) => {
    setSpin(true);
    console.log(input);
    const tags: number[] = [];
    addedTags.map((item: Tag) => {
      tags.push(item.pktag);
    });
    try {
      createExperience({
        variables: {
          title: input['title'],
          summary: input['summary'],
          miles: parseFloat(input['miles']),
          climbing: input['climbing'],
          cost: parseFloat(input['cost']),
          elevation: parseInt(input['elevation']),
          difficulty: input['difficulty'],
          pkuser: cookie['user']['pkuser'],
          lat: createCoords['lat'],
          lng: createCoords['lng'],
          tags: tags,
          images: files,
        },
      }).then(data => {
        console.log(data);
        setSpin(false);
        history.push(
          Paths.SingleExperience +
            '/' +
            data.data['createExperience']['public_identifier']
        );
      });
    } catch (err) {
      setSpin(false);
      console.error(err);
    }
  };

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && (
        <CreateExperience
          onSubmit={onSubmit}
          setCreateCoords={setCreateCoords}
          loader={loader}
          setAddedTags={setAddedTags}
          addedTags={addedTags}
          onUploadInputChange={onUploadInputChange}
          spin={spin}
        />
      )}
    </>
  );
};
