import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  Input,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Spinner,
  Textarea,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Search } from '../../shared/Google/Search';
import { DifficultyType } from '../../shared/media/Badges/Badges.types';
import { CreateExperienceDataProps } from './CreateExperience.types';
import { SelectTag } from '../../shared/media/Tags/SelectTag';
import { Tag } from '../../shared/media/Tags/Tag.types';

export const CreateExperience: FC<CreateExperienceDataProps> = ({
  onSubmit,
  setAddedTags,
  addedTags,
  onUploadInputChange,
  spin,
}) => {
  const { register, handleSubmit } = useForm();

  const renderExperienceInput = () => {
    return (
      <>
        {addedTags.map((value: Tag, index: number) => {
          switch (value.tag) {
            case 'HIKING':
              return (
                <div key={index}>
                  <NumberInput
                    name="miles"
                    defaultValue={5}
                    precision={1}
                    step={0.1}
                    ref={register}
                  >
                    <NumberInputField name="miles" ref={register} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <NumberInput
                    name="elevation"
                    defaultValue={500}
                    ref={register}
                  >
                    <NumberInputField name="elevation" ref={register} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <Select
                    name="difficulty"
                    placeholder="Select difficulty"
                    ref={register}
                  >
                    <option value={DifficultyType.EASY}>Easy</option>
                    <option value={DifficultyType.MODERATE}>Moderate</option>
                    <option value={DifficultyType.HARD}>Hard</option>
                  </Select>
                </div>
              );
            case 'CLIMBING':
              return (
                <Input
                  name="climbing"
                  placeholder="5.10a"
                  maxLength={5}
                  ref={register}
                />
              );
            case 'MUSEUM':
              return (
                <InputGroup>
                  <InputLeftElement pointerEvents="none">$</InputLeftElement>
                  <Input
                    placeholder="Enter amount"
                    name="cost"
                    ref={register}
                  />
                </InputGroup>
              );
            case 'CAMPING':
              return (
                <InputGroup>
                  <InputLeftElement pointerEvents="none">$</InputLeftElement>
                  <Input
                    placeholder="Enter amount per night"
                    name="cost"
                    ref={register}
                  />
                </InputGroup>
              );
          }
        })}
      </>
    );
  };

  return (
    <>
      <Box maxW="xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="title" placeholder="Title" ref={register} />
          <Textarea name="summary" placeholder="Summary" ref={register} />

          <SelectTag setAddedTags={setAddedTags} addedTags={addedTags} />

          {renderExperienceInput()}

          <Text>Add photos to your experience</Text>
          <Input type="file" required onChange={onUploadInputChange} multiple />

          <Search />
          <Button type="submit">Create</Button>
          {spin && <Spinner />}
        </form>
      </Box>
    </>
  );
};
