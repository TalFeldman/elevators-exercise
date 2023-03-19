import React, { useState, useEffect } from 'react';
import Icon from '../Icon';
import '../App.css';
import ElevatorSound from './sound.wav';


export default function Elevator({ elevator, floor, updateElevator}) {
  const [currentFloor, setCurrentFloor] = useState(elevator.floor);
  const [isMoving, setIsMoving] = useState(false);
  const [arrived, setIsArrived] = useState(false);
  const [iconColor, setIconColor] = useState("black");

  const duration = Math.abs(elevator.floor-elevator.nextFloor);
  const destantion = (elevator.nextFloor-elevator.floor) * -50;
  
  const elevatorStyle = {
    '--duration': `${duration}s`,
    '--destantion': `${destantion}px`,
  };


  
  useEffect(() => {

    setCurrentFloor(elevator.floor);
    if (isMoving) {
      setIconColor("red");
      if(arrived){        
        setIconColor("green");
        setTimeout(() => {
          setIsMoving(false);
          setIsArrived(false);
          updateElevator(elevator);
          
        }, 2000)
      }
    } else {
      setIconColor("black");
    }
  }, [isMoving, arrived, elevator.floor, updateElevator]);


  return (
    <p>
    {currentFloor === floor  ? (
      (elevator.available ? (
        <div className='icon'>
          <Icon color={iconColor} />
        </div>
      ) : (

        <div
        className='animation'
        style={elevatorStyle }
        onAnimationStart={() => setIsMoving(true)}
        onAnimationEnd={() => {
          setIsArrived(true);
          new Audio(ElevatorSound).play();
            
        }}
      >
        <Icon color={iconColor} />
       
      </div>
      
      ))
    ) : null
      
    }

  </p>
    

  );
}

