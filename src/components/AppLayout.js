import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Turntable from "./Turntable";

function AppLayout() {
  const [play, setPlay] = useState(false);

  const toggle = () => {
    setPlay(!play);
  };

  return (
    <>
      <Layout>
        <AppBody>
          <Outlet play={play} />
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
  padding-left: 100px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  align-items: center;
`;
