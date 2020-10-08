import React from 'react';

import Toggle from './toggle';
import useDarkMode from 'use-dark-mode';
import styled from "styled-components";
import darkmodeIcon from "../../assets/icons/darkmode.png";

const ToggleStyle = styled.div`
  float: right;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;


const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);
  return (
    <ToggleStyle>
      <div className="dark-mode-toggle">
        <Icon src={darkmodeIcon} onClick={darkMode.toggle} />
      </div>
    </ToggleStyle>
  );
};

export default DarkModeToggle;
