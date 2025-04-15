import { Tooltip } from 'react-tooltip';
import useDashboardStore from '../../store/dashboardStore';
import { IoMdAdd } from "react-icons/io";
import { MdClose } from 'react-icons/md';
import { IoInformationCircleOutline } from "react-icons/io5";

const LegBased = (props: any) => {
    const { disabled } = useDashboardStore();

    const handleNumber = (event: React.ChangeEvent<HTMLInputElement>, state: string) => {
        const inputValue = event.target.value;
        // Regular expression to match numbers with optional decimal point
        const regex = /^(\d+\.?\d*|\.\d+)?$/;
        if (regex.test(inputValue) || inputValue === '') {
            state==='target'?props.setTarget(inputValue):props.setStoploss(inputValue);
        }
    };
    return (
        <div className='flex flex-col'>
            <div className='flex  flex-wrap text-center justify-center m-2 gap-4 p-2'>
                <div className='flex flex-row gap-2'>
                    <input type="checkbox" className='h-4 w-4' disabled={disabled} checked={props.waitTrade} onChange={() => { props.setWaitTrade(!props.waitTrade); }} />
                    <div className='flex flex-row  text-[14px]'>Wait For Momentum<div data-tooltip-id="my-tooltip" data-tooltip-content="After the entry time, the position will wait for the premium to either increase or decrease by a specific percentage or point before entering, as specified in the notes."><IoInformationCircleOutline className="text-[#0096FF] text-xl" /></div></div>
                </div>

                {/* For Leg Wise - ReEentry/ReExecute */}
                {props.choice == 'LEG' && <div className='flex flex-row gap-2'>
                    <input type="checkbox" className='h-4 w-4' disabled={disabled} checked={props.reEntry} onChange={() => { props.setReEntry(!props.reEntry); }} />
                    <div className='flex flex-row  text-[14px]'>Re-Entry / Re-Execute<div data-tooltip-id="my-tooltip" data-tooltip-content="This will trigger a Re-Entry/Re-Execution opportunity for each position. Please refer to the notes for further clarification."><IoInformationCircleOutline className="text-[#0096FF] text-xl" /></div></div>
                </div>}

                {/* For Strategy Wise - ReEntry/ReExecute */}
                {props.choice == 'STRATEGY' && <div className='flex flex-row gap-2'>
                    <input type="checkbox" className='h-4 w-4' checked={props.reEntry} onChange={() => { props.setReEntry(!props.reEntry); }} />
                    <div className='flex flex-row text-[14px]'>Re-Execute
                        <select value={props.reExecuteTimes} onChange={(e) => { props.setReExecuteTimes(e.target.value) }} className='w-10 border-[1px] rounded-lg outline-none'>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                        <div data-tooltip-id="my-tooltip" data-tooltip-content="This will trigger a Re-Entry/Re-Execution opportunity for each position. Please refer to the notes for further clarification."><IoInformationCircleOutline className="text-[#0096FF] text-xl" /></div></div>
                </div>}
                
                {/* Move Sl To Cost */}
                {props.choice == 'LEG' && <div className='flex flex-row gap-2'>
                    <input type="checkbox" className='h-4 w-4' disabled={disabled} checked={props.moveSlToCost} onChange={() => { props.setMoveSlToCost(!props.moveSlToCost); }} />
                    <div className='flex flex-row  text-[14px]'>Move SL to Cost<div data-tooltip-id="my-tooltip" data-tooltip-content="In the strategy, each leg must be either a buy or a sell, and strategy must be legwise.."><IoInformationCircleOutline className="text-[#0096FF] text-xl" /></div></div>
                </div>}

                {/* Range BreakOut Feature */}
                <div className='flex flex-row gap-2'>
                    <input type="checkbox" className='h-4 w-4' disabled={disabled} checked={props.rangeBreakOut} onChange={() => { props.setRangeBreakOut(!props.rangeBreakOut); }} />
                    <div className='flex flex-row  text-[14px]'>Range Breakout<div data-tooltip-id="my-tooltip" data-tooltip-content="Sell order will be entered once low of the Range breaks and Buy Orders will be entered once High of the Range breaks."><IoInformationCircleOutline className="text-[#0096FF] text-xl" /></div></div>
                </div>

                {/* Protect Profit Feature */}
                <div className='flex flex-row gap-2'>
                    <input type="checkbox" className='h-4 w-4' disabled={disabled} checked={props.protectProfit} onChange={() => { props.setProtectProfit(!props.protectProfit); }} />
                    <div className='flex flex-row text-[14px]'>Protect Profit<div data-tooltip-id="my-tooltip" data-tooltip-content="This feature will set a minimum profit threshold and incrementally trail the profit by the specified amount."><IoInformationCircleOutline className="text-[#0096FF] text-xl" /></div></div>
                </div>

            </div>
            <div className='flex text-center justify-center flex-wrap gap-4'>
                {/* Strategy Profit Added */}
                <div className='flex flex-row gap-2'>
                    <div className='text-[14px]'>Target</div>
                    {props.targetChoice && <input type="text" className='w-[86px] h-[26px] flex text-center justify-center border border-gray-300 bg-white rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all' value={props.target} onChange={(e) => { handleNumber(e,'target');}}></input>}
                    {props.targetChoice && <MdClose className="text-[18px] font-semibold mt-1 text-red-600 h-[20px] w-[36px] hover:bg-red-100 hover:rounded-full" onClick={() => { props.setTargetChoice(false); }} style={{ cursor: "pointer" }} />}
                    {!props.targetChoice && <div className='w-[86px] h-[26px] flex text-center justify-center border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all hover:bg-white'><IoMdAdd className="text-[18px] font-semibold text-blue-500" onClick={() => { props.setTargetChoice(true); }} style={{ cursor: "pointer" }} /></div>}
                </div>

                {/* Strategy Stoploss Added */}
                <div className='flex flex-row gap-2'>
                    <div className='text-[14px]'>Stoploss</div>
                    {props.stoplossChoice && <input type="text" className='w-[86px] h-[26px] flex text-center justify-center border border-gray-300 bg-white rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all' value={props.stoploss} onChange={(e) => { handleNumber(e,'stoploss');}}></input>}
                    {props.stoplossChoice && <MdClose className="text-[18px] font-semibold mt-1 text-red-600 h-[20px] w-[36px] hover:bg-red-100 hover:rounded-full" onClick={() => { props.setStoplossChoice(false); }} style={{ cursor: "pointer" }} />}
                    {!props.stoplossChoice && <div className='w-[86px] h-[26px] flex text-center justify-center border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all hover:bg-white'><IoMdAdd className="text-[18px] font-semibold text-blue-500" onClick={() => { props.setStoplossChoice(true); }} style={{ cursor: "pointer" }} /></div>}
                </div>

            </div>
            <Tooltip id="my-tooltip" style={{ width: '300px', borderRadius: '10px', backgroundColor: 'rgb(147 197 253)', color: 'black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }} />
        </div>
    )
}

export default LegBased