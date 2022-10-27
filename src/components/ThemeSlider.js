import React from "react";  
import { useContext } from 'react';
import { UserContext } from '../userContext';

const ThemeSlider = () => {
  const { theme, setTheme, hintCounter,
    SetHintCounter } =
  useContext(UserContext);
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
   
    setTheme(newTheme);
  };

  return(
    <label className ='switch2'>
    <input type='checkbox' onChange={switchTheme} />
    <span className='slider2'></span>
  </label>
  )
}
export default ThemeSlider;