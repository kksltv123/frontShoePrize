import React from 'react';
import styled from 'styled-components'

type Props = {
    children: JSX.Element|JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <StLayout>
            {children}
        </StLayout>
    );
};

const StLayout = styled.div`
    width: 100%;
`


export default Layout;