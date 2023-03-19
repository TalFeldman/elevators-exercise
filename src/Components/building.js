import React, { useState } from 'react';
import FloorButton from './button';
import Elevator from './elevator';
import '../App.css';


export default function Building() {

  const [elevators, setElevators] = useState(Array.from({ length: 5 }, (_, i) => ({
    id: i,
    floor: 0, 
    nextFloor: null, 
    available: true
  })));

  const [queue, setQueue] = useState([]);

  function callElevator(floor){
    //check if there are any available elevtors
    const availableElevators = elevators.filter(elevator => elevator.available);
    //if there are available elevators, find the closest one to the floor
    if (availableElevators.length > 0) {
      const closestElevator = availableElevators.reduce((prev, curr) => {
        const prevDistance = Math.abs(prev.floor - floor);
        const currDistance = Math.abs(curr.floor - floor);
        return currDistance < prevDistance ? curr : prev;
      });

      closestElevator.available = false;
      closestElevator.nextFloor = floor;      
      const newElevators = [...elevators];
      newElevators[closestElevator.id] = closestElevator;

      setElevators(newElevators);
      
      const time = Math.abs(floor-closestElevator.floor) * 1000;

        // Check if there are any pending requests in the queue
        if (queue.length > 0) {
          const { floor: queueFloor, resolve } = queue.shift();
          // Resolve the pending request with the closest available elevator
          const availableElevators = elevators.filter(elevator => elevator.available);
          const closestElevator = availableElevators.reduce((prev, curr) => {
            const prevDistance = Math.abs(prev.floor - queueFloor);
            const currDistance = Math.abs(curr.floor - queueFloor);
            return currDistance < prevDistance ? curr : prev;
          });
          resolve(closestElevator);
        }
        return time;
    }
      else {
        // All elevators are occupied, add the request to the queue
        new Promise(resolve => {
          queue.push({ floor, resolve });
        });
        }

        
    }

      function updateElevator(elevator){

        elevator.floor = elevator.nextFloor;
        elevator.available = true;
        elevator.nextFloor = null;

        const newElevators = [...elevators];
        newElevators[elevator.id] = elevator;
        setElevators(newElevators);
      }


    return (
      <div className='App'>
      {Array.from({ length: 10 }, (_, i) => 9 - i).map(floor => (
       <div className="wrapper">
          {floor === 0 ? (
            <p>Ground Floor</p>
          ) : (
            <p>{floor}st</p>
          )}
          {Array.from({ length: 5 }, (_, j) => j).map(id => (
           
            <div className='item'>
            <>
              <Elevator elevator={elevators[id]} floor={floor} updateElevator={()=>updateElevator(elevators[id])} />        
            </>
          </div>
          ))}          
        <FloorButton floor={floor} onRequestElevator={callElevator} />
          </div>      
        ))}
      </div>          
      );
  }
