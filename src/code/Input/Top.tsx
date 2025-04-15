import { useState } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MdOutlineAcUnit } from "react-icons/md";
// store
import { bearish } from './Strategy/BearishStrategy.ts';
import { bullish } from './Strategy/BullishStrategy.ts';
import { nonDirection } from './Strategy/NonDirectionalStrategy.ts';

const Top = (props: any) => {

  const [activeStrategy, setActiveStrategy] = useState('');
  const [visibleBullish,setVisibleBullish]=useState(false);
  const [visibleBearish,setVisibleBearish]=useState(false);
  const [visibleNonDirection,setVisibleNonDirection]=useState(false);

  return (
    <>
      <div className='w-full bg-white border-t-2 text-black flex flex-row justify-center text-center gap-1 md:gap-4 h-[35px]'>
        <div className='flex flex-row text-l   relative' onMouseLeave={() => { setVisibleBullish(false); }} onMouseEnter={() => { setVisibleBullish(true); }}>
          <div className="text-[12px]  pt-1 pl-2 font-[400] hover:font-[600]"> Bearish&nbsp;Strategy </div>
          {visibleBullish && <IoIosArrowDown style={{ marginTop: "4px", fontSize: "20px" }} />}
          {!visibleBullish && <IoIosArrowUp style={{ marginTop: "4px", fontSize: "20px" }} />}
          {visibleBullish && <div className='absolute text-black border-2 w-[220px] rounded-lg top-7 bg-[white] flex flex-col max-h-[400px] overflow-auto'>{
            bearish?.length > 0 && bearish.map((item: any, key) => {
              return (
                <div className="p-2 flex items-center cursor-pointer rounded-md text-[12px] border-2 border-gray-100 border-transparent hover:border-blue-500" key={key}
                  onClick={() => { props.setStrategy(item); setActiveStrategy(item.strategyName) }}
                  style={{ backgroundColor: activeStrategy === item.strategyName ? "#89CFF0" : "white" }}> <MdOutlineCompareArrows className='text-[12px] mr-2 '/>{item.strategyName}</div>
              )
            })
          }
          </div>
          }
        </div>

        <div className="flex flex-row pl-1 pr-1 relative" onMouseLeave={() => { setVisibleBearish(false); }} onMouseEnter={() => { setVisibleBearish(true); }}>
          <div className="text-[12px]  pl-1 pr-1 pt-1 font-[400] hover:font-[600]">Bullish&nbsp;Strategy </div>
          {visibleBearish && <IoIosArrowDown style={{ marginTop: "4px", fontSize: "20px" }} />}
          {!visibleBearish && <IoIosArrowUp style={{ marginTop: "4px", fontSize: "20px" }} />}
          {visibleBearish && <div className='absolute text-black border-2 w-[220px] rounded-lg top-7 bg-[white] flex flex-col max-h-[400px] overflow-auto'>
            {bullish && bullish.length > 0 && visibleBearish && bullish.map((item: any, key: number) => {
              return (
                <div className="p-2 flex items-center cursor-pointer rounded-md text-[12px] border-2 border-gray-100 border-transparent hover:border-blue-500" key={key} onClick={() => { props.setStrategy(item); setActiveStrategy(item.strategyName) }}
                  style={{ backgroundColor: activeStrategy === item.strategyName ? "#89CFF0" : "white" }}> <MdOutlineAcUnit />&nbsp;&nbsp;{item.strategyName}</div>
              );
            })}
          </div>}
        </div>

        <div className="flex flex-row pl-1 pr-1 relative" onMouseLeave={() => { setVisibleNonDirection(false); }} onMouseEnter={() => { setVisibleNonDirection(true); }}>
          <div className="text-[12px]  pl-1 pr-1 pt-1 font-[400] hover:font-[600]">NonDirectional&nbsp;Strategy </div>
          {visibleNonDirection && <IoIosArrowDown style={{ marginTop: "4px", fontSize: "20px" }} />}
          {!visibleNonDirection && <IoIosArrowUp style={{ marginTop: "4px", fontSize: "20px" }} />}
          {visibleNonDirection && <div className='absolute text-black border-2 w-[220px] rounded-lg top-7 bg-[white] flex flex-col max-h-[400px] overflow-auto'>
            {nonDirection && nonDirection.length > 0 && visibleNonDirection && nonDirection.map((item: any, key: number) => {
              return (
                <div className="p-2 flex items-center cursor-pointer rounded-md text-[12px] border-2 border-gray-100 border-transparent hover:border-blue-500" key={key} onClick={() => { props.setStrategy(item); setActiveStrategy(item.strategyName) }}
                  style={{ backgroundColor: activeStrategy === item.strategyName ? "#89CFF0" : "white" }}> <MdOutlineAcUnit />&nbsp;&nbsp;{item.strategyName}</div>
              );
            })}
          </div>}
        </div>
      </div>

    </>
  )
}

export default Top;