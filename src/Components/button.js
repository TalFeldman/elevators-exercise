import React, { useState } from 'react';
import '../App.css';


export default function FloorButton({ floor, onRequestElevator }) {
  const [buttonText, setButtonText] = useState('Call');
  const [buttonColor, setButtonColor] = useState('#4CAF50');

  async function handleClick()  {

    setButtonText('Waiting');
    setButtonColor('#f44336');
    
    const time = onRequestElevator (floor);

    await new Promise ((resolve ) => {
    
      setTimeout(() => resolve(
       
      ), time)   });
      setButtonText('Arrived')
      setButtonColor('white');
    
    setTimeout(() => {
      setButtonText('Call');
      setButtonColor('#4CAF50');
    },2000)


  }

  return (

    <button className="Button" style={{ backgroundColor: buttonColor }} onClick={handleClick}>{buttonText}</button>
  );
}