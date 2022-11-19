import React from 'react';

const ConfirmModal = ({ title, message, handleDeleteDoctor, modalData, closeModal, successBtnName }) => {
    return (
        <div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => handleDeleteDoctor(modalData)} htmlFor="confirm-modal" className="btn btn-outline btn-secondary">{successBtnName}</label>
                        <button onClick={closeModal} className='btn'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;