export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
    open: boolean;
    title?: string;
    onClose: () => void;
    children: React.ReactNode;
    size?: ModalSize;
    panelClassName?: string;  
}