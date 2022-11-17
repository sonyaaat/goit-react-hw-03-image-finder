import React from 'react';
import css from "../BtnScrollUp/BtnScrollUp.module.css"
import {AiFillCaretUp} from "react-icons/ai";
function BtnScrollUp() {
  
  const handlerScrollUp = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollBy(0, -50);
      setTimeout(handlerScrollUp, 10);
    }
  }
  
  return (
    <div className={css.button_scroll} onClick={handlerScrollUp}><AiFillCaretUp  size={50} style={{ color: 'white' }}/></div>
  );
}

export default BtnScrollUp;