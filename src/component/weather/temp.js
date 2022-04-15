// api.openweathermap.org/data/2.5/weather?q=mumbai&appid=1772a97ed2924782264917bc4e43e347
import React, { useState,useEffect } from 'react'
import './style.css';
import Weathercard from './weathercard';

const Temp = () => {
        const[searchValue,setSearchValue]=useState("Delhi");
        const[tempInfo,setTempInfo]=useState({});
        
        const getWeatherInfo=async()=>{
            try {
                let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1772a97ed2924782264917bc4e43e347`;
                const res=await fetch(url);
                const data= await res.json();
                // console.log(data);
                const { temp,humidity,pressure }=data.main;
                // console.log(temp)
                const { main:weathermood }=data.weather[0];
                const { name }=data;
                const { speed } =data.wind; 
                const { country, sunset }=data.sys;

                const myNewWeatherInfo={
                    temp,
                    humidity,
                    pressure,
                    weathermood,
                    name,
                    speed,
                    country,
                    sunset,
                };
                setTempInfo(myNewWeatherInfo);

            } catch (error) {
                console.log(error);
            }
        };

        useEffect(() => {
            getWeatherInfo();
        }, []);
        
  return <>
        <div className='wrap'>
            <div className='search'>
                <input type="search" 
                placeholder='search...'
                autoFocus
                id='serach'
                    className='searchTerm'
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                />
                <button className='searchButton' onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
        </div>
        {/* our temp card */}
       <Weathercard tempInfo ={tempInfo}/>
  </>
   
}

export default Temp;