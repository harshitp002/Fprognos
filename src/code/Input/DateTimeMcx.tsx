import useDashboardStore from "../../store/dashboardStore";
import useInputStore from "../../store/inputStore";

import { useEffect, useState } from 'react';
const END_HOUR = 23;

const DateTimeMcx = (props: any) => {
  const { disabled } = useDashboardStore();
  const [hour, setHour] = useState<any[]>([]);
  const [minutes, setMinutes] = useState<any[]>([]);
  const [minutes1, setMinutes1] = useState<any[]>([]);
  const [minutes2, setMinutes2] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showHour, setShowHour] = useState<any>('');
  const [showMinute, setShowMinutes] = useState<any>('');

  const { startHour, endHour, rangeEndHour, rangeEndMinutes, updateRangeEndHour, updateRangeEndMinutes, startMinutes, endMinutes, updateStartHour, updateStartMinutes, updateEndHour, updateEndMinutes } = useInputStore();

  const validateRangeBreakoutTime = () => {
    const startTime = parseInt(startHour + startMinutes);
    const endTime = parseInt(rangeEndHour + rangeEndMinutes);
    if (startTime >= endTime) {
      setErrorMessage("Range breakout time must be less than range end time.");
    } else {
      setErrorMessage("");
      subtractMinute(rangeEndHour,rangeEndMinutes);
    }
  };

  function subtractMinute(hours: any, minutes: any) {
    hours=parseInt(hours);
    minutes=parseInt(minutes);
    if (minutes === 0) {
      minutes = 59;
      hours = (hours === 0) ? 23 : hours - 1; // Handles hour going below 0
    } else {
      minutes -= 1;
    }
    hours<10 ? setShowHour(`0${hours}`):setShowHour(hours);
    minutes<10 ? setShowMinutes(`0${minutes}`):setShowMinutes(minutes);
  }

  const generateHourOptions = () => {
    const hours = [];

    for (let i = 9; i <= END_HOUR; i++) {
      if (i < 10) {
        hours.push(<option key={i} value={`0${i}`}>0{i}</option>);
      } else {
        hours.push(<option key={i} value={i}>{i}</option>);
      }
    }

    return hours;
  };
  const generateMinuteOptions = (startHour: string) => {
    const minutes = [];
    if (startHour == '09') {
      for (let i = 15; i < 60; i += 1) {
        minutes.push(<option key={i} value={i}>{i}</option>);
      }
    } else if (startHour == '15') {
      for (let i = 0; i <= 29; i += 1) {
        if (i < 10) {
          minutes.push(<option key={i} value={`0${i}`}>0{i}</option>);
        } else {
          minutes.push(<option key={i} value={i}>{i}</option>);
        }
      }
    } else {
      for (let i = 0; i < 60; i += 1) {
        if (i < 10) {
          minutes.push(<option key={i} value={`0${i}`}>0{i}</option>);
        } else {
          minutes.push(<option key={i} value={i}>{i}</option>);
        }
      }
    }
    return minutes;
  };

  useEffect(() => {
    setMinutes(generateMinuteOptions(startHour));
    setHour(generateHourOptions());
  }, [startHour])
  useEffect(() => {
    setMinutes1(generateMinuteOptions(rangeEndHour));
    subtractMinute(rangeEndHour,rangeEndMinutes);
  }, [rangeEndHour])
  useEffect(() => {
    setMinutes2(generateMinuteOptions(endHour));
  }, [endHour])

  useEffect(() => {
    if (props.rangeBreakOut) validateRangeBreakoutTime();
  }, [startHour, startMinutes, rangeEndHour, rangeEndMinutes]);

  return (
    <>
      <div className='flex flex-row flex-wrap text-center justify-center gap-4 bg-white p-2 m-1 rounded-md border-[1px]'>

        {/* start time of trade */}
        <div className=" flex flex-col min-w-[210px]">
          {props.rangeBreakOut && <label className="text-lg text-left">Range Start Time</label>}
          {!props.rangeBreakOut && <label className="text-lg text-left">Start Time</label>}
          <div className='flex flex-row text-center justify-start'>
            <select value={startHour} disabled={disabled} onChange={(e) => { updateStartHour(e.target.value); }} className="border-[1px] rounded-md outline-0 p-1 w-20 bg-[#F8F8F8]">{hour}</select>
            <div className="m-1">:</div>
            <select value={startMinutes} disabled={disabled} onChange={(e) => { updateStartMinutes(e.target.value); }} className='border-[1px] rounded-md outline-0 p-1 w-20 bg-[#F8F8F8] overflow-y-auto'>{minutes}</select>
          </div>
        </div>

        {/* range end time of trade */}
        {props.rangeBreakOut && <div className=" flex flex-col min-w-[210px]">
          <label className="text-lg text-left">Range End Time</label>
          <div className='flex flex-row text-center justify-start'>
            <select value={rangeEndHour} disabled={disabled} onChange={(e) => { updateRangeEndHour(e.target.value); }} className="border-[1px] rounded-md outline-0 p-1 w-20 bg-[#F8F8F8]">{hour}</select>
            <div className="m-1">:</div>
            <select value={rangeEndMinutes} disabled={disabled} onChange={(e) => { updateRangeEndMinutes(e.target.value); }} className='border-[1px] rounded-md outline-0 p-1 w-20 bg-[#F8F8F8]'>{minutes1}</select>
          </div>
        </div>}

        {/* exit time of trade */}
        <div className=" flex flex-col min-w-[210px]">
          <label className="text-lg text-left">End Time</label>
          <div className='flex flex-row text-center justify-start'>
            <select value={endHour} disabled={disabled} onChange={(e) => { updateEndHour(e.target.value); }} className="border-[1px] rounded-md outline-0 p-1 w-20 bg-[#F8F8F8]">{hour}</select>
            <div className="m-1">:</div>
            <select value={endMinutes} disabled={disabled} onChange={(e) => { updateEndMinutes(e.target.value); }} className='border-[1px] rounded-md outline-0 p-1 w-20 bg-[#F8F8F8]'>{minutes2}</select>
          </div>
        </div>
      </div>
      {/* Validation Error Message */}
      {props.rangeBreakOut && errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
      {props.rangeBreakOut && <div className="flex text-center justify-center w-full text-blue-500">High & Low of the Range will be considered between <span className="text-black ml-2 mr-2">{startHour}:{startMinutes}</span> open and <span className="text-black ml-2 mr-2">{showHour}:{showMinute}</span> closing time</div>}

    </>
  )
}

export default DateTimeMcx

