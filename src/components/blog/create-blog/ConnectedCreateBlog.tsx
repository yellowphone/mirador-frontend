import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BLOG } from '../../../graphql/mutations/blogMutation';
import { useHistory } from 'react-router-dom';
import { CreateBlog } from './CreateBlog';
import { Paths } from '../../../utils/paths';
import { Loader } from '@googlemaps/js-api-loader';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { SimpleGrid, Center, Text, Image } from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';
import { TSFixMe } from '../../../types/global';
import { Tag } from '../../shared/media/Tags/Tag.types';

// @TODO: Geo look at this!
export type JsonContent = {
  type: string;
  content: string;
};

export const ConnectedCreateBlog = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [createCoords, setCreateCoords] = useState({ lat: 0, lng: 0 });

  const [addedTags, setAddedTags] = useState<Tag[]>([]);

  const [createBlog] = useMutation(CREATE_BLOG);

  // JSON state object to store HTML metadata
  const [jsonContent, setJsonContent] = useState<JsonContent[]>([]);
  // HTML state object to display as blog is being created
  const [html, setHtml] = useState<TSFixMe[]>([]);

  const history = useHistory();

  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  const onSubmit = (input: { summary: string; title: string }) => {
    console.log({ input });
    const tags: number[] = [];
    addedTags.map((item: Tag) => {
      tags.push(item.pktag);
    });
    createBlog({
      variables: {
        title: input['title'],
        summary: input['summary'],
        content: {
          content: jsonContent,
        },
        pkuser: cookie['user']['pkuser'],
        lat: createCoords['lat'],
        lng: createCoords['lng'],
        tags: tags,
      },
    }).then(data => {
      history.push(
        Paths.SingleBlog + '/' + data.data['createBlog']['public_identifier']
      );
    });
  };

  // TODO: Geo!
  const renderBlogComponents = (type: string, content: TSFixMe) => {
    switch (type) {
      case 'image':
        return <Image src={content} />;
      case 'text':
        return <Text>{content}</Text>;
      case 'experience':
        return (
          <Center>
            <BlogExperienceCard public_identifier={content} />
          </Center>
        );
    }
  };

  // TODO: Geo!
  const addContent = (type: string, content: TSFixMe) => {
    setJsonContent(jsonContent => [
      ...jsonContent,
      { type: type, content: content },
    ]);
    setHtml(html => [
      ...html,
      <SimpleGrid columns={1} key="grid">
        {renderBlogComponents(type, content)}
      </SimpleGrid>,
    ]);
    console.log(jsonContent);
  };

  // TODO Geo!
  const addContentHelper = (input: TSFixMe) => {
    console.log(input);
    if (input['type'] != 'two_col') {
      addContent(input['type'], input['content']);
    }
  };

  return (
    <>
      {!cookie['user'] && <NoLogin />}
      {cookie['user'] && (
        <CreateBlog
          onSubmit={onSubmit}
          addContentHelper={addContentHelper}
          addContent={addContent}
          html={html}
          setCreateCoords={setCreateCoords}
          loader={loader}
          setAddedTags={setAddedTags}
          addedTags={addedTags}
        />
      )}
    </>
  );
};
