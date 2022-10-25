import React, { useState } from 'react';
import Modal from '../components/asset/modal/Modal';
import Header from '../components/common/Header';
import Product from '../components/detail/Poduct'
import Portal from '../components/asset/modal/Portal'
import ModalDetail from '../components/modalDetail/ModalDetail';
import { useRecoilValue } from 'recoil';
import ModalState from '../components/atom/ModalState';

const Detail = () => {
    const modalOn = useRecoilValue(ModalState)

    return (
        <div>
            <Header />
            <Product />
            <Portal>
                {modalOn &&
                    <Modal>
                        <ModalDetail/>
                    </Modal>
                }
            </Portal>
        </div>
    );
};


export default Detail;