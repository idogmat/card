import React, {FC} from 'react';



const UiButton = (props:any) => {
  return (
   <button >
     {props.children}
   </button>
  )
}


export default UiButton;