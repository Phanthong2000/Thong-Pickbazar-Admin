import React from 'react'
import { Modal } from 'rsuite';

type Props = {
    open: boolean;
    handleClose: () => void;
    handleChoose: (phone: string) => void
}
function ModalUpdateContactNumber({ handleChoose, handleClose, open }: Props) {
    return (
        <Modal dialogStyle={{ marginTop: 'calc(50vh - 50px)', height: '1000px' }} id='modal_update_contact_number' open={open} onClose={handleClose}>
            <Modal.Body>
                <div className='text-center font14 font_family_bold mb-4'>
                    Update Contact Number
                </div>
                <div className='position-relative'>
                    <input type="number" className='h40_px w100_per' />
                    <button className='btn bg_primary position-absolute top0 right0 h40_px color_white font_14'>Save</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalUpdateContactNumber