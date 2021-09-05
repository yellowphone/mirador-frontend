import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  useEditableControls,
} from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import { grey0 } from '../../utils/styles/colors';
import { spacer24 } from '../../utils/styles/constants';
import { DeleteDialog } from '../shared/trip/DeleteDialog';
import { TripType } from './BaseActiveTrip';

export const BaseActiveTripHeader = ({
  id,
  mongoId,
  title,
  type,
  updateTitle,
}: {
  id: string;
  mongoId: string;
  title: string;
  type: string;
  updateTitle?: (title: string) => void;
}): ReactElement => {
  const [alertOpen, setAlertOpen] = useState(false);
  const EditableControls = () => {
    const { isEditing, getEditButtonProps } = useEditableControls();
    return !isEditing ? (
      <EditIcon marginLeft={2} w="4" height="4" {...getEditButtonProps()} />
    ) : null;
  };

  return (
    <Flex
      p={spacer24}
      backgroundColor={grey0}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Editable
            fontSize={'2xl'}
            fontWeight="bold"
            defaultValue={title}
            onChange={type === TripType.NEW ? updateTitle : undefined}
            onSubmit={type === TripType.EDIT ? updateTitle : undefined}
          >
            <EditablePreview />
            <EditableInput />
            <EditableControls />
          </Editable>
        </Flex>
      </Flex>
      <DeleteIcon onClick={() => setAlertOpen(true)} />
      <DeleteDialog
        public_identifier={id}
        mongoId={mongoId}
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
      />
    </Flex>
  );
};
