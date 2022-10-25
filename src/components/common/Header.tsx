import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo} from '../asset/img/Logo.svg'
import Layout from './Layout';

const Header: React.FC = () => {
    return (
        <StDiv>
            <Layout>
                <Logo/>
            </Layout>
        </StDiv>
    );
};

const StDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    border-bottom: 1px solid #cdcdcd;
    padding: 20px 40px;
`

export default Header;