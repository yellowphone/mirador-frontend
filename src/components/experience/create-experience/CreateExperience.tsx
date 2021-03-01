import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { Input, 
        Box,
        NumberInput,
        NumberInputField,
        NumberInputStepper,
        NumberIncrementStepper,
        NumberDecrementStepper, 
        Select,
        Center,
        Textarea,
        Text
    } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { Search } from '../../shared/Google/Search'
import { DifficultyType } from "../../shared/media/Badges/Badges.types";
import { CreateExperienceDataProps } from './CreateExperience.types'
import { SelectTag } from "../../shared/media/Tags/SelectTag";

export const CreateExperience: FC<CreateExperienceDataProps> = ({ onSubmit, setCreateCoords, setAddedTags, addedTags, loader, onUploadInputChange }) => {

    const { register, handleSubmit, errors } = useForm();

    return (
        <>
            <NavigationBar/>
            <Box maxW='xl'>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Input name="title" placeholder="Title" ref={register} />
                    <Textarea name="summary" placeholder="Summary" ref={register} />

                    <SelectTag setAddedTags={setAddedTags} addedTags={addedTags}/>

                    <NumberInput name="miles" defaultValue={5} precision={1} step={0.1} ref={register}>
                    <NumberInputField name="miles" ref={register}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <NumberInput name="elevation" defaultValue={500} ref={register}>
                    <NumberInputField name="elevation" ref={register}/>
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>

                    <Select name="difficulty" placeholder="Select difficulty" ref={register}>
                        <option value={DifficultyType.EASY}>Easy</option>
                        <option value={DifficultyType.MODERATE}>Moderate</option>
                        <option value={DifficultyType.HARD}>Hard</option>
                    </Select>

                    <Text>Add photos to your experience</Text>
                    <Input type="file" required onChange={onUploadInputChange} multiple />

                    <Search loader={loader} setCoords={setCreateCoords} refetch={() => {}} />
                    <Button type="submit">Create</Button>
                </form>
            </Box> 
        </>
    )
}
