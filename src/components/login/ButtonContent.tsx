import React, { FC } from 'react';

interface IButtonContent {
  children: JSX.Element;
  icon: JSX.Element;
}

const ButtonContent: FC<IButtonContent> = ({ children, icon }) => (
  <span
    style={{
      paddingRight: 10,
      fontWeight: 500,
      paddingLeft: icon ? 0 : 10,
      paddingTop: 10,
      paddingBottom: 10,
    }}
  >
    {children}
  </span>
);

export default ButtonContent;
