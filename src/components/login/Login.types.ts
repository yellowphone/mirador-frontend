import { TSFixMe } from '../../types/global';

export interface ILoginDataProps {
  isOpen: boolean;
  onOpen?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClose: () => void;
  setUser: TSFixMe;
}
