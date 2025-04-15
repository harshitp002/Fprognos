import useDashboardStore from '../../store/dashboardStore.ts';
import { toast } from 'react-toastify';
import secureLocalStorage from "react-secure-storage";
import { MANUAL_SQUARE_OFF, TERMINATE_RUNNING_STRATEGY, UPDATE_RUNNING_STRATEGY } from "./../../constant/Constant";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { extractErrorMessage, timeStampToDate } from './../Utility/Utils'
import { useEffect, useState } from 'react';
import { wt_short } from './../Input/Constant.ts'
import { Dialog } from '@mui/material';
import { MdClose } from "react-icons/md";
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { IoMdInformationCircle } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { GoAlertFill } from "react-icons/go";
import { short_stoploss,short_target } from './../Input/Constant.ts';


const OrderTable = ({ orders, strategy }: any) => {
  const { squareOffOrder, updateSquareOff, updateSquareOffOrder } = useDashboardStore();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [openSquareOffBox, setOpenSquareOffBox] = useState(false);

  // terminate algo and terminate status
  const [terminateAlgo, setTerminateAlgo] = useState(false);
  const [terminateStrategy, setTerminateStrategy] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [showstrategy, setshowstrategy] = useState(false);

  const [copyStatus,setCopyStatus]=useState("");

  const convertTimestampToReadable = (timestamp:any) => {
    const date = new Date(timestamp);

    // Format the time in 24-hour format
    const time = date.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 8);

    // console.log(time, 'timestamp'); // Output: 04:54:30
    return time;
  };


  //  Functionality of Square Off in which we will handle the mark item will be square off
  const squareoff = async () => {
    const itemArray: any[] = []
    const clientId = secureLocalStorage.getItem('id');
    Object.entries(squareOffOrder).forEach(([key, item]) => {
      if (item) {
        itemArray.push(key);
      }
    });

    if (itemArray.length == 0) {
      toast.warn('select order for squareOff');
      return;
    }
    const data: any = { "orderIds": itemArray, "clientId": clientId };
    console.log(data, 'square off condition data')
    try {
      const token = secureLocalStorage.getItem('token');
      const config: any = {
        url: MANUAL_SQUARE_OFF,
        data: data,
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      }
      const response = await axios(config); // Replace with your API endpoint
      console.log(response, 'square off order');
      toast.success("Successfully squareOff order!!.")
      setOpenSquareOffBox(false);
      setCount(0);
      updateSquareOff({});
    } catch (error: any) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(extractErrorMessage(error));
      }
      updateSquareOff({});
      setOpenSquareOffBox(false);
      setCount(0);
      console.error('Error fetching data:', error);
    }
  }

  // For Saving Strategy
  const modifyStrategy = async () => {
    try {
      let data: any = strategy;
      if (currentStatus === "terminateAlgo") {
        data['terminateAlgo'] = true;
      } else if (currentStatus == "terminateStrategy") {
        data['terminateStrategy'] = true;
      }
      delete data['orders'];
      delete data['pnl'];
      const token = secureLocalStorage.getItem('token');
      let config: any = { url: `${UPDATE_RUNNING_STRATEGY}`, data: data, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
      if (data['terminateStrategy']) {
        config = { url: `${TERMINATE_RUNNING_STRATEGY}?strategyId=${data['id']}`, data: data, method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }
      }

      const response = await axios(config); // Replace with your API endpoint
      console.log(response, 'response');
      { response?.data?.data?.terminateAlgo && currentStatus === "terminateAlgo" && setTerminateAlgo(true) }
      { response?.data?.data?.terminateStrategy && currentStatus === "terminateStrategy" && setTerminateStrategy(true) }
      setshowstrategy(false);
      currentStatus === "terminateAlgo" ? toast.success('Terminate Algo Successfully') : currentStatus == "terminateStrategy" ? toast.success('Terminate Algo & SquareOff All Positiion') : toast.success('Modify Strategy Successfully');
    } catch (error: any) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(extractErrorMessage(error));
      }
      console.error('Error fetching data:', error);
    }
  }

  const handleCopy = (messageToCopy:any) => {
    navigator.clipboard.writeText(messageToCopy).then(() => {
      setCopyStatus("Copied!"); // Show feedback
      setTimeout(() => setCopyStatus(""), 2000); // Clear feedback after 2 seconds
    }).catch((err) => {
      console.error("Failed to copy text:", err);
      setCopyStatus("Failed to copy!"); // Error feedback
    });
  };

  useEffect(() => {
    console.log(strategy, 'strategy-123');
    if(strategy['status']=="Terminated & Squared Off" || strategy['terminateAlgo'] || strategy['terminateStrategy'] ){
      setTerminateAlgo(true);
      setTerminateStrategy(true);
    }else{
      setTerminateAlgo(strategy['terminateAlgo']);
      setTerminateStrategy(strategy['terminateStrategy']);
    }

  }, [])

  return (
    <>
      <div className="overflow-auto bg-white">
        <table className="min-w-full table-auto border-[1px]">
          <thead className="bg-gray-300 text-gray-800 text-[12px] font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-1 text-center border-[1px]"><input type="checkbox" disabled className='text-blue-600 border-blue-600 border-2 h-4 w-4'/></th>
              <th className="p-1 text-center border-[1px]">Status</th>
              <th className="p-1 text-center border-[1px]">Option</th>
              <th className="p-1 text-center border-[1px]">Instrument</th>
              <th className="p-1 text-center border-[1px]">Qty</th>
              <th className="p-4 text-center border-[1px]">Entry Price</th>
              <th className="p-4 text-centet border-[1px]">Exit Price</th>
              <th className="p-1 text-center border-[1px]">Wait&nbsp;For Momentum</th>
              {strategy?.rangeBreakOut && <th className="p-1 text-center border-[1px]">Range Breakout</th>}
              <th className="p-1 text-center border-[1px]">LTP</th>
              <th className="p-1 text-center min-w-[40px] border-[1px]">P&L</th>
              <th className="p-1 text-center border-[1px]">Target</th>
              <th className="p-1 text-center border-[1px]">Stoploss</th>

              <th className="p-1 text-center border-[1px]">Exit&nbsp;Reason</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-[12px] font-medium gap-2">
            {orders && orders.map((item: any, index: number) => (
              <tr key={`order-${index}`} className=" mt-2 border-b transition-colors text-center justify-center">
                <td className="p-1 border-[1px]">
                  <input type="checkbox" disabled={item?.orderStatus !== "PLACED"} checked={squareOffOrder[item.id] ? true : false} onChange={() => { console.log(item?.id); updateSquareOffOrder(item?.id, squareOffOrder[item?.id] ? false : true); squareOffOrder[item?.id] ? setCount(count - 1) : setCount(count + 1); }} />

                </td>

                <td className="p-1 text-left border-[1px]">
                  <div className={`flex items-center justify-center p-1
                    ${item?.orderStatus === 'PLACED' ? 'text-green-600 hover:bg-green-200' : 'text-red-500 hover:bg-red-200'} font-semibold shadow-sm`}
                  > {item?.orderStatus}
                    {item?.orderStatus=='FAILED' && <div className="flex flex-row"><p data-tooltip-id="my-tooltip" data-tooltip-content={item.description ? item.description : ""}><GoAlertFill className="text-red-600 text-2xl" onClick={()=>{handleCopy(item.description)}}/></p></div>}
                  </div>
                  <div className='text-center justify-center'>{copyStatus}</div>
                </td>

                <td className="p-1 w-[50px] border-[1px]">
                    <span className={`inline-block px-2 py-1 rounded ${item?.actionType === 'BUY' ? 'border border-green-500 text-green-500' : 'border border-red-500 text-red-500'}`}>{item?.actionType}</span>

                </td>

                <td className="p-1 text-left border-[1px] min-w-[80px] max-w-[150px]">
                  <span className='flex items-center justify-center -mb-4'>{item?.tradingSymbol}</span><br />
                  <span className={`flex items-center justify-center text-xs font-medium rounded-md p-1`}>
                  <span className="font-semibold mr-2 text-black">
                    {typeof item?.positionNo === "number" || (!isNaN(parseFloat(item?.positionNo)) && item?.positionNo)
                      ? `L${parseFloat(item.positionNo).toFixed(0)} - `
                      : "N/A"}
                  </span>
                  <span className="mr-1">{item?.orderSubType}</span>
                  </span>
                </td>

                <td className="p-1 text-left w-[40px] border-[1px] ">{item?.leg?.lotSize}&nbsp;({item?.quantity})</td>

                <td className="p-1 text-center w-[80px] border-[1px]">
                  <div className='flex flex-row text-center justify-center'>{item?.actionType === 'SELL' ? item?.originalSellPrice : item?.originalBuyPrice}
                  {item.strategy.rangeBreakOut && <div data-tooltip-id="my-tooltip" data-tooltip-content={`(ENTRY AT ${item?.leg.rangeBreakoutType}  ${item.leg.rangeBreakoutEntry})`}><IoMdInformationCircle className="text-lg" /></div>}</div>
                  <div className='flex text-center justify-center'><span className="flex items-center justify-center text-xs font-medium w-12 text-blue-600">
                    {item.entryDateTime ? convertTimestampToReadable(item.entryDateTime) : '--'}
                  </span></div>
                </td>

                <td className="p-1 w-[40px] border-[1px]">{item?.ltpExit == -1 ? '--' : item?.ltpExit}<br />
                  <div className='flex text-center justify-center'><span className="flex items-center justify-center text-xs font-medium w-12 text-blue-600">
                    {item.exitDateTime ? convertTimestampToReadable(item.exitDateTime) : '--'}
                  </span></div>
                </td>

                <td className="p-1 text-center w-[80px] border-[1px]"> 
                  {item?.waitAndTrade && typeof item?.calculatedPrice === "number" && typeof item?.actualPremiumPrice === "number"
                  ? `${item.calculatedPrice.toFixed(2)} (Ref.Price - ${item.actualPremiumPrice.toFixed(2)})`
                  : "--"}
                  <br />
                  {item?.strategy?.waitTrade && item?.leg?.waitTrade != -1 && (
                    <span className="flex flex-row items-center justify-center text-blue-700 text-xs font-semibold p-2">
                      {/* Displaying wait trade type */}
                      {wt_short[item?.leg?.waitTradeType]}
                      {/* Conditional icon rendering */}
                      {(item?.leg?.waitTradeType=="WT_POINT_DECREMENT" || item?.leg?.waitTradeType=="WT_PERCENT_DECREMENT") ? (
                        <FaArrowDown className="ml-1 text-blue-700" />
                      ) : (
                        <FaArrowUp className="ml-1 text-blue-700" />
                      )}
                      {/* Displaying leg information */}
                      <span className="ml-1">{item?.leg?.waitTrade}</span>
                    </span>
                  )}</td>

                {strategy?.rangeBreakOut && (
               <td className="p-1 gap-2 border-[1px] w-[120px]">
               High Range: 
               {item?.rangeHigh ? (
                 <span className="text-blue-600">{typeof item?.rangeHigh === "number" ? item.rangeHigh.toFixed(2) : "0.00"}</span>
               ) : (
                 '--'
               )}
               ,&nbsp; Low Range: 
               {item?.rangeLow ? (
                 <span className="text-blue-600">{typeof item?.rangeLow === "number" ? item.rangeLow.toFixed(2) : "0.00"}</span>
               ) : (
                 '--'
               )}
             </td>             
                )}


                <td  className="p-1 w-[40px] border-[1px]"  style={{ color: typeof item?.lastPrice === "number" && item.lastPrice >= 0 ? "green" : "red" }}>{typeof item?.lastPrice === "number" ? item.lastPrice === -1 ? "--" 
                      : item.lastPrice.toFixed(2)  : "--"}</td>
                <td className="p-1 w-[40px] border-[1px]" style={{ color: typeof item?.profitLoss === "number" && item?.profitLoss >= 0 ? 'green' : 'red' }}>{typeof item?.profitLoss === "number" ? item.profitLoss.toFixed(2) : item?.profitLoss}</td>

                <td className="p-1 border-[1px]">{typeof item?.target === "number" ? item.target === -1 ? "--" : item.target.toFixed(2) : "--"}<br />
                  <span className={`flex items-center justify-center text-xs font-medium ${item?.leg?.target == -1 ? 'hidden' : ' text-blue-600 rounded-md p-1'}`}>
                    {`${short_target[item?.leg?.targetType]} - ${item?.leg?.target}`}
                  </span>
                </td>

                <td className="p-1 border-[1px]"> {typeof item?.stoploss === "number" ? item.stoploss === -1 ? "--" : item.stoploss.toFixed(2) : "--"}<br />
                  <span className={`flex items-center justify-center text-xs font-medium ${item?.leg?.stopLossValue == -1 ? 'hidden' : ' text-red-600 rounded-md p-1'}`}>
                  {`${short_stoploss[item?.leg?.stopLossChoice]} - ${item?.leg?.stopLossValue} ${item.trailLossChoice && item.nextTrailingPoint!==-1 ?  ` ( Next TP : ${item?.nextTrailingPoint?.toFixed(2)} )` : ''}`}
                  </span>
                </td>

                <td className="p-1 border-[1px]">
                  <span
                    className={`inline-block px-3 py-2 rounded-md font-semibold text-center 
                    ${item?.squareOffReason === 'NA' ? '' : 'text-blue-600'} 
                    transition duration-300`}>
                    {item?.squareOffReason === 'NA' ? '' : item?.squareOffReason}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex flex-row bg-gray-100'>

          <div className={`rounded text-[12px] m-2 ${count == 0 ? 'bg-gray-300' : 'bg-blue-400'} text-white text-center p-1 w-32 cursor-pointer`} onClick={() => { count > 0 && setOpenSquareOffBox(true); }}>Exit {count} Order</div>
          {(strategy?.status=='Placed' || strategy?.status=='Partial') && <button  disabled={strategy?.status=='Completed' || strategy?.status=='Terminated & Squared Off'}
            className={`rounded text-[12px] m-2  ${strategy?.status=='Completed'?'bg-gray-300':'bg-blue-500'} text-white text-center p-1 px-2 cursor-pointer`}
            onClick={() => { setshowstrategy(true); setCurrentStatus('terminateStrategy'); }}
          >
            SquareOff All Position & Terminate Algo 
          </button>}
          {(strategy?.status=='Placed' || strategy?.status=='Partial') && <button  disabled={strategy?.status=='Completed'||strategy?.status=='Terminated & Squared Off'}
            className={`rounded text-[12px] m-2  ${strategy?.status=='Completed'?'bg-gray-300':'bg-blue-500'} text-white text-center p-1 px-2 cursor-pointer`}
            onClick={() => { setshowstrategy(true); setCurrentStatus('terminateAlgo'); }}
          >
            Terminate Algo
          </button>}
          {!(strategy?.status=='Placed' || strategy?.status=='Partial') && <button
            className="rounded text-[12px] m-2 text-white text-center p-1 px-2 bg-gray-300 cursor-pointer"
          >
            SquareOff All Position & Terminate Algo
          </button>}
          {!(strategy?.status=='Placed' || strategy?.status=='Partial') && <button
            className="rounded text-[12px] m-2 text-white text-center p-1 px-2 bg-gray-300 cursor-pointer"
          >
            Terminate Algo
          </button>}
          <div className="flex justify-end p-2 flex-grow gap-2">
            {strategy?.protectProfit && strategy?.protectProfitChoice == 'trailProfit' && <div className='bg-[#dfe6f2] text-[12px] p-1 rounded px-2 font-semibold'>TRAIL PROFIT : (A) = &#8377;{strategy?.increaseProfit} (B) = &#8377;{strategy?.trailProfit}</div>}
            {strategy?.protectProfit && strategy?.protectProfitChoice == 'lockMinimumProfit' && <div className='bg-[#dfe6f2] text-[12px] p-1 rounded px-2 font-semibold'>LOCK PROFIT : (A) = &#8377;{strategy?.profitReaches} (B) = &#8377;{strategy?.lockMinimumProfit} </div>}
            {strategy?.protectProfit && strategy?.protectProfitChoice == 'lockAndTrailProfit' && <div className='bg-[#dfe6f2] text-[12px] p-1 rounded px-2 font-semibold'>TRAIL PROFIT : (A) = &#8377;{strategy?.increaseProfit} (B) = &#8377;{strategy?.trailProfit} LOCK PROFIT : (A) = &#8377;{strategy?.profitReaches} (B) = &#8377;{strategy?.lockMinimumProfit} </div>}
            {strategy?.targetChoice && <div className='bg-[#dfe6f2] text-[12px] p-1 rounded px-2 font-semibold'>MTM Target : <span className='text-green-600 font-semibold w-[120px]'>&#8377; {typeof strategy?.target === "number" ? strategy?.target?.toFixed(2) :"--"}</span></div>}
            {strategy?.stoplossChoice && <div className='bg-[#dfe6f2] text-[12px] p-1 rounded px-2 font-semibold'>MTM Stoploss : <span className='text-red-600 font-semibold w-[120px]'>&#8377; {typeof strategy?.stoploss === "number" ? strategy?.stoploss?.toFixed(2) : "--"}</span></div>}
            <div className='bg-[#dfe6f2] text-[12px] p-1 rounded px-2 font-semibold w-[240px]'>Total MTM : <span className={`${strategy?.pnl > 0 ? 'text-green-700' : 'text-red-500'} font-semibold w-[120px] text-center`}> &#8377; {typeof strategy?.pnl === "number" ? strategy?.pnl?.toFixed(2) : "--"}</span></div>
          </div>
        </div>
      </div>
      <Dialog open={openSquareOffBox} onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setOpenSquareOffBox(false);
        }
      }} sx={{ borderRadius: "10px" }}>
        <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="flex flex-row items-center justify-between mb-4 bg-blue-400 text-white p-1">
            <div className="text-white text-[18px] p-1">SquareOff Order</div>
            <div className="h-[24px] w-[24px] text-white flex items-center justify-center cursor-pointer">
              <MdClose className="text-2xl font-semibold" onClick={() => setOpenSquareOffBox(false)} />
            </div>
          </div>
          <h1></h1>
          <div className='text-[12px] mt-5 mb-5 p-2'>Are you sure want to squareOff <span className='font-semibold text-[12px]'>{count}</span> orders?</div>
        </div>
        <div className="flex justify-end gap-2 bg-gray-200 p-2">
          <button className="p-1 w-16 bg-[#2D5BFF] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => { squareoff(); }}>Yes</button>
          <button className="p-1 w-16 bg-white border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setOpenSquareOffBox(false)} > Cancel </button>
        </div>
      </Dialog>

      {/* Dialog Box for Save Strategy */}
      <Dialog open={showstrategy} onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setshowstrategy(false)
        }
      }} sx={{ borderRadius: "10px" }}>
        <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="flex flex-row items-center justify-between mb-4 bg-blue-400 text-white p-1">
            <div className="text-white text-[16px] font-medium">{currentStatus == 'modify' ? 'Modify' : 'Terminate'} Strategy</div>
            <div className="h-[24px] w-[24px] text-white flex items-center justify-center cursor-pointer">
              <MdClose className="text-2xl font-semibold" onClick={() => setshowstrategy(false)} />
            </div>
          </div>
          <h1></h1>
          <div className='text-[16px] font-medium mt-5 mb-5 p-2'>Are you sure want to {currentStatus} the strategy?</div>
        </div>
        <div className="flex justify-end gap-2 bg-gray-300 p-2 text-[14px]">
          <button className="p-1 w-16 bg-[#2D5BFF] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={modifyStrategy}> YES</button>
          <button className="p-1 w-16 bg-white border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setshowstrategy(false)}>Cancel</button>
        </div>
      </Dialog>

      <Tooltip id="my-tooltip" style={{ width: '300px', borderRadius: '10px', backgroundColor: 'rgb(147 197 253)', color: 'black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }} />
    </>
  )
}

export default OrderTable