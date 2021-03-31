import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_EXPERIENCE } from '../../../graphql/mutations/experienceMutation';
import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { CreateExperience } from './CreateExperience';
import { Loader } from '@googlemaps/js-api-loader';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';

export const ConnectedCreateExperience = (): React.ReactNode => {
  // const [cookie, setCookie] = useCookies(['user'])

  const [createCoords, setCreateCoords] = useState({ lat: 0, lng: 0 });

  const [spin, setSpin] = useState(false);

  // TODO: fix this type
  const [files, setFiles] = useState([]);

  const [createExperience, { data }] = useMutation(CREATE_EXPERIENCE);

  // TODO: fix this type
  const [addedTags, setAddedTags] = useState([]);

  const history = useHistory();

  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  const onUploadInputChange = (e: FormEvent<HTMLInputElement>) => {
    setFiles(files => [...files, e.target.files]);
  };

  const onSubmit = (input: any) => {
    setSpin(true);
    console.log(input);
    const tags: number[] = [];
    // TODO: fix this type
    // eslint-disable-next-line prettier/prettier
        addedTags.map((item: any) => {
      tags.push(item.pktag);
    });
    try {
      createExperience({
        variables: {
          title: input['title'],
          summary: input['summary'],
          miles: parseFloat(input['miles']),
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
