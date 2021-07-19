import { useMutation } from '@apollo/client';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import React, {
  ReactElement,
  useCallback,
  SetStateAction,
  Dispatch,
} from 'react';
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

  return (
    <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
      <DialogContent>Are you sure you want to delete this trip?</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          style={{ backgroundColor: '#f44336' }}
          onClick={() => {
            if (mongoId) {
              deleteTripMongo();
            }
            if (public_identifier) {
              deleteTrip().then(() => {
                setAlertOpen(false);
                onNavigate(Paths.Trip);
              });
            }
          }}
        >
          Yes
        </Button>
        <Button onClick={() => setAlertOpen(false)} color="primary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
