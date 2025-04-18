import React from 'react';
import styled from 'styled-components';
import Header from './Header.tsx'
import SideBar from './SideBar.tsx';
import Contents from './Contents.tsx';

export default function Layout() {
    return (
        <>
            <SHeader>
                <Header></Header>
            </SHeader>
            <SBody>
                <SSideBar>
                    <SideBar></SideBar>
                </SSideBar>
                <SContents>
                    <Contents></Contents>
                </SContents>
            </SBody>
        </>
    )
}

const SHeader = styled.div`
    width: 100%;
    height: 32px;
    border-shadow: 0px 4px 4px #AAAAAA;
`

const SBody = styled.div`
    width: 100%;
    height: calc(100vh - 32px);
    display: flex;
    flex-direction: row;
`
const SSideBar = styled.div`
    border-right: 1px solid #222222;
    width: 30%;
    height: 100%;
`
const SContents = styled.div`
    width: 100%;
    height: 100%;
`