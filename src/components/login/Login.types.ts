import { Dispatch, SetStateAction } from 'react';
import { IUserContext } from '../../utils/userContext';

export interface ILoginDataProps {
  isOpen: boolean;
  onOpen?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  setUser: Dispatch<SetStateAction<IUserContext | undefined>>;
}
