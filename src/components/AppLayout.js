import React, { useRef } from "react";
import { Outlet } from "react-router-dom";

import styled from "styled-components";
import {Burger} from "./index";
import Turntable from "./Turntable";

function AppLayout() {
  
  return (
    <>
        {/* <h1>Scratch Practice!</h1> */}
        <Burger/>
      <Layout>
        <AppBody>
          <Outlet />
        </AppBody>
        <TurntableDiv>
          <Turntable />
        </TurntableDiv>
      </Layout>
    </>
  );
}

export default AppLayout;

const AppBody = styled.div`
  width: 50vw;
`;

const TurntableDiv = styled.div`
  padding-top: 50px;
  padding-left: 100px;
  position: sticky;
  height: 500px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 100vh;
`;
