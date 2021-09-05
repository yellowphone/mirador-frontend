import { useMutation } from '@apollo/client';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import React, {
  ReactElement,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { DELETE_TRIP as DELETE_TRIP_MONGO } from '../../../graphql/mutations/mongodbMutation';
import { DELETE_TRIP } from '../../../graphql/mutations/tripMutation';
import { Paths } from '../../../utils/paths';

export const DeleteDialog = ({
  public_identifier,
  mongoId,
  alertOpen,
  setAlertOpen,
}: {
  public_identifier: string;
  mongoId: string | null;
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const history = useHistory();
  const destructiveRef = useRef<FocusableElement | null>(null);

  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(path);
    },
    [history]
  );

  const [deleteTrip] = useMutation(DELETE_TRIP, {
    variables: {
      public_identifier: public_identifier,
    },
  });

  const [deleteTripMongo] = useMutation(DELETE_TRIP_MONGO, {
    client: mongodbClient,
    variables: {
      id: mongoId,
    },
  });

  const onClose = () => setAlertOpen(false);
  return (
    <AlertDialog
      leastDestructiveRef={destructiveRef}
      isOpen={alertOpen}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>Delete trip</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this trip?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                if (mongoId) {
                  deleteTripMongo();
                }
                if (public_identifier) {
                  deleteTrip().then(() => {
                    onClose();
                    onNavigate(Paths.Trip);
                  });
                }
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
