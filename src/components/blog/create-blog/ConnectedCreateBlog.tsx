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

export const ConnectedCreateBlog = (): React.ReactFragment => {
  const [cookie] = useCookies(['user']);

  const [createCoords, setCreateCoords] = useState({ lat: 0, lng: 0 });

  const [addedTags, setAddedTags] = useState<TSFixMe[]>([]);

  const [createBlog] = useMutation(CREATE_BLOG);

  // JSON state object to store HTML metadata
  const [jsonContent, setJsonContent] = useState<TSFixMe[]>([]);
  // HTML state object to display as blog is being created
  const [html, setHtml] = useState<TSFixMe[]>([]);

  const history = useHistory();

  const loader = new Loader({
    apiKey: `${process.env.MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  });

  const onSubmit = (input: TSFixMe) => {
    console.log(input);
    const tags: number[] = [];
    addedTags.map((item: TSFixMe) => {
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
