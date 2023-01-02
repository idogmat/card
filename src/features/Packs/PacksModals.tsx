import React, {FC, ReactElement} from 'react';
import {ModalBase} from "../../common/components/Modal";
interface IModalBaseProps {
    open: boolean;
    handleClose: () => void;
    children: ReactElement;
    modalTitle: string;
}
const PacksModals:FC<IModalBaseProps> = ({open,handleClose,children,modalTitle}) => {
    return (
        <ModalBase  open={open}
                           handleClose={handleClose} children={children} modalTitle={modalTitle}/>


    );
};

export default PacksModals;