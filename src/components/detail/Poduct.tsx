import React  from 'react';
import styled from 'styled-components';
import ProductInfo from './ProductInfo';
import ProductThumb from './ProductThumb';

const Poduct = () => {
    return (
        <StDiv>
            <ProductThumb/>
            <ProductInfo />
        </StDiv>
    );
};

const StDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`

export default Poduct;