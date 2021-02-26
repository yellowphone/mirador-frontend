export interface ILoginDataProps {
    isOpen: boolean;
    onOpen?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClose: () => void;
    setUser: Function
}