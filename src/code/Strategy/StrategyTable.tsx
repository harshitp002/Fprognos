import { GoAlertFill } from "react-icons/go";
import OrderTable from '../Orders/OrderTable';
import { FaEye } from "react-icons/fa";
import useDashboardStore from '../../store/dashboardStore.ts';
import { Tooltip } from 'react-tooltip';
import Switch from '@mui/material/Switch';
import { MdClose, MdDriveFileRenameOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { Dialog } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import secureLocalStorage from "react-secure-storage";
import { CREATE_NEW_STRATEGY, EXECUTE_STRATEGY, UPDATE_RUNNING_STRATEGY } from "../../constant/Constant.ts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { extractErrorMessage } from "../Utility/Utils.ts";
import useInputStore from "../../store/inputStore.ts";
import { MdDeleteForever } from "react-icons/md";
import useBrokerStore from "../../store/brokerStore.ts";
import { status } from "../Input/Constant.ts";
import { FaSort } from "react-icons/fa6";
import { short_name } from "../Input/Constant.ts";


const StrategyTable = (props: any) => {
  const { updateSquareOff, updateDisabled, updateNewOrder, deleteOrder, sortOrders, strategyCount, updateNewOrderById } = useDashboardStore();
  const { entryDay } = useInputStore();
  const [openBox, setOpenBox] = useState(false);
  const [openBoxDuplicate, setOpenBoxDuplicate] = useState(false);
  const [strategyName, setStrategyName] = useState("");
  const brokers: any[] = [];
  const [activeBroker, setActiveBroker] = useState<any>(null)
  const [currentStrategy, setCurrentStrategy] = useState<any>({})
  const [day, setDay] = useState([false, false, false, false, false, false])
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [showEnableBox, setShowEnableBox] = useState(false);
  const [enableStatus, setEnableStatus] = useState(false);
  const [todayDay, setTodayDay] = useState(1);
  const { broker } = useBrokerStore();
  const navigate = useNavigate();

  const renameStrategy = async() =>{
    try {
      currentStrategy['strategyName'] = strategyName;
      const token = secureLocalStorage.getItem('token');
      const config: any = { url: `${EXECUTE_STRATEGY}`, data: currentStrategy, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
      const response = await axios(config); // Replace with your API endpoint
      updateNewOrderById(response?.data?.data?.id, response?.data?.data);
      setOpenBoxDuplicate(false);
      setOpenBox(false);
      setActiveBroker(null);
      setStrategyName("");
      toast.success("Strategy Rename Successfully!");
    } catch (error: any) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else if (error?.response?.status === 409) {
        toast.error(error?.response?.data?.data);
      } else {
        toast.error(extractErrorMessage(error));
      }
      console.error('Error fetching data:', error);
      setOpenBoxDuplicate(false);
      setOpenBox(false);
    }
  }
  // create duplicate strategy
  const CreatedDuplicateStrategy = async () => {
    try {
      delete currentStrategy['id'];
      delete currentStrategy['status'];
      delete currentStrategy['orders'];
      delete currentStrategy['pnl'];
      delete currentStrategy['createdAt'];
      delete currentStrategy['failureReason'];
      delete currentStrategy['modifiedAt'];
      currentStrategy['enable'] = false;
      currentStrategy['status'] = 'Unplaced';
      currentStrategy['strategyName'] = strategyName;
      currentStrategy.legs.map((item: any) => delete item.id)
      let entry = []
      for (let i = 0; i < entryDay.length; i++) {
        if (day[i]) {
          entry.push(entryDay[i]?.value);
        }
      }
      currentStrategy['days'] = entry;
      currentStrategy['broker'] = activeBroker;
      if (activeBroker == null) {
        toast.warn('Broker is required!');
        return;
      }
      if (entry.length == 0) {
        toast.warn('Minimum One Day Select!');
        return;
      }
      if (strategyName == "") {
        toast.warn('Minimum one character required');
        return;
      }
      const token = secureLocalStorage.getItem('token');
      const config: any = { url: `${CREATE_NEW_STRATEGY}`, data: currentStrategy, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
      const response = await axios(config); // Replace with your API endpoint
      setCurrentStrategy("");
      setOpenBoxDuplicate(false);
      setOpenBox(false);
      setActiveBroker(null);
      setStrategyName("");
      toast.success("Strategy Duplicate Successfully!");
    } catch (error: any) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else if (error?.response?.status === 409) {
        toast.error(error?.response?.data?.data);
      } else {
        toast.error(extractErrorMessage(error));
      }
      console.error('Error fetching data:', error);
      setOpenBoxDuplicate(false);
      setOpenBox(false);
    }
  }

  const updateStrategy = async (type: string) => {
    try {
      const token = secureLocalStorage.getItem('token');
      console.log(token, 'token')
      if (type == "DELETE") {
        currentStrategy['deleted'] = true;
      } else if (type == "ENABLE") {
        currentStrategy['enable'] = !currentStrategy['enable'];
      }
      let url = currentStrategy['status'] == 'placed' ? UPDATE_RUNNING_STRATEGY : EXECUTE_STRATEGY ;
      console.log(currentStrategy,'current strategy for delete ')
      const config: any = { url: url, data: currentStrategy, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
      const response = await axios(config); // Replace with your API endpoint
      console.log(response, 'update strategy');
      setShowEnableBox(false);
      setShowDeleteBox(false);
      if (type == "ENABLE") {
        updateNewOrderById(response?.data?.data?.id, response?.data?.data);
        response?.data?.data?.enable ? toast.success("Strategy Enable Successfully.") : toast.success("Strategy Disable Successfully");
      } else if (type == "DELETE") {
        if (response?.data?.data?.deleted) {
          deleteOrder(currentStrategy['id']);
          toast.success("Strategy Deleted Successfully.")
        }
      }
      setOpenBox(false);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(extractErrorMessage(error));
      }
      console.error('Error fetching data:', error);
      setShowEnableBox(false);
      setShowDeleteBox(false);
    }
  }
  useEffect(() => {
    const today = new Date().getDay();
    setTodayDay(today);
  }, [])
  return (
    <div className="overflow-auto h-[400px] m-4 rounded-lg ">
      <table className="min-w-full table-auto">
        <thead className="relative z-[10] bg-blue-300 text-gray-800 text-[12px]">
          <tr className="text-center justify-center z-20 border-b-2 bg-[#043873] text-white font-[CircularStd]">
            <th className="p-1 text-left sticky top-0 bg-[#043873]">No.</th>
            {props.tableSetting?.info && <th className="p-1 text-center sticky top-0 bg-[#043873]">Info</th>}
            <th className="p-1 text-left sticky top-0 bg-[#043873] cursor-pointer min-w-[80px]" onClick={() => { sortOrders('enable'); }}>Enable<FaSort className="inline text-[14px]" /></th>
            <th className="p-1 text-left sticky top-0 bg-[#043873] cursor-pointer min-w-[100px]" onClick={() => { sortOrders('status'); }}>Status<FaSort className="inline text-[14px]" /></th>
            {props.tableSetting?.clientId && <th className="p-1 text-left sticky top-0 bg-[#043873]">ClientId</th>}
            {/* Strategy Name */}
            <th className="p-1 text-left sticky top-0  min-w-[120px] bg-[#043873]"
              onClick={() => { sortOrders('strategyName'); }}
            >
              <div className="flex items-center justify-start flex-row">
                <span className="font-semibold">AlgoName &nbsp;&nbsp;({strategyCount?.enable}/{strategyCount?.strategy})</span>
                {/* <div className="ml-2 p-1 bg-blue-500 text-white rounded-full text-[12px] w-8 flex text-center justify-center" title="Enable">
                  {strategyCount?.enable}
                </div>
                <div className="ml-1 p-1 bg-orange-500 text-white rounded-full text-[12px] w-8 flex text-center justify-center" title="Strategy">
                  {strategyCount?.strategy}
                </div>
                <div className="ml-1 p-1 bg-green-500 text-white rounded-full text-[12px] w-8 flex text-center justify-center" title="Active">
                  {strategyCount?.active}
                </div>
                <div className="ml-1 p-1 bg-red-500 text-white rounded-full text-[12px] w-8 flex text-center justify-center" title="Completed">
                  {strategyCount?.completed}
                </div> */}
                <FaSort className="inline text-[12px] cursor-pointer" />
              </div>
            </th>

            <th className="p-1 text-center sticky top-0  min-w-[100px] cursor-pointer bg-[#043873]" onClick={() => { sortOrders('pnl'); }}>MTM<FaSort className="inline text-[14px]" /></th>
            <th className="p-1 text-left sticky top-0 bg-[#043873]">Alert</th>
            {props.tableSetting?.duration && <th className="p-1 text-left sticky top-0 bg-[#043873]">Duration</th>}
            <th className="p-1 text-left sticky top-0 bg-[#043873]">Buy/Sell</th>
            <th className="p-1 text-left sticky top-0 bg-[#043873]">Mult</th>
            <th className="p-1 text-left sticky top-0 bg-[#043873]">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-[12px] pt-20">
          {props?.strategy && Object.entries(props?.strategy).map(([key, item]: any, index: any) => {
            if(item?.day == props.day){
            let buy = 0, sell = 0;
            for (let i = 0; i < item?.legs?.length; i++) {
              if (item?.legs[i]?.actionType == 'BUY') {
                buy++;
              } else {
                sell++;
              }
            }
            return (
              <>
                <tr key={`strategy1-${key}${index}`} className="border-b transition-colors cursor-pointer" style={{ backgroundColor: props.visibleStrategy === index ? '#e8f8fc' : "" }} onClick={() => { updateSquareOff({}); }}>
                  <td className="p-1 border-[1px] font-semibold">{index + 1}.</td>
                  {props.tableSetting?.info && <td className="p-1" onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }}>
                    <div className='flex flex-row gap-1'>
                      <span className="inline-block text-black border-[1px] px-2 py-1 rounded-lg">{item?.productType=='INTRADAY'?"MIS":"POS"}</span>
                      <div className='inline-block text-black border-[1px] px-2 py-1 rounded-lg'>{item?.exchange?.value}</div>
                      <div className='inline-block text-black border-[1px] px-2 py-1 rounded-lg'>{short_name[item?.script?.value]}</div>
                    </div>
                  </td>}
                  <td className="border-[1px] p-1 text-green-500 -z-10"> <Switch checked={item?.enable} disabled={!(item?.status === 'Unplaced')}
                    onChange={() => { setShowEnableBox(true); setCurrentStrategy(item); setEnableStatus(item?.enable); }}
                    name="loading"
                    color="primary"
                  /></td>
                  {props.day == todayDay && <td className="p-1" onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }}><p className={`text-white text-center border-2 rounded-lg w-full p-1 ${(item?.status == 'Placed' || item?.status == 'Partial') ? 'bg-[#12b564]' : (item?.status == 'Completed' || item?.status == 'Failed') ? 'bg-[#f25d52]' : 'bg-yellow-500'}`}>{item?.enable ? status[item?.status] ? status[item?.status] : item?.status : 'DISABLE'}</p></td>}
                  {props.day != todayDay && <td className="p-1"></td>}
                  {props.tableSetting?.clientId && <td className="border-[1px] p-1 font-semibold" onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }}>{item?.broker?.brokerClientId} - {item?.broker?.broker?.brokerName}</td>}
                  <td className="flex flex-row  p-1 font-semibold text-[12px] -z-10" onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }}>
                  
                  <abbr title={item?.terminateAlgo ? 'algo is not running' : 'algo is running'}><p className={`flex justify-center text-center rounded-lg h-2 w-2 mt-1 mr-2 text-white ${item.terminateAlgo ? 'bg-[#f25d52]' : 'bg-[#12b563d8]'}`}></p></abbr>
                  {item?.strategyName}</td>
                  
                  
                  {props.day == todayDay && <td onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }} className={`border-[1px] p-1 font-semibold text-center justify-center ${item?.pnl > 0 ? 'text-green-700' : 'text-red-500 '}`}>&#8377; {typeof item?.pnl === "number" ? item.pnl.toFixed(2) : "0.00"}</td>}
                  {props.day != todayDay && <td className="p-1 border-[1px]"></td>}
                  
                  {props.day == todayDay && <td className="p-1 gap-1 border-[1px] w-[40px]">{(item?.failureReason != null && item?.failureReason !== 'NA') && <div className="flex flex-row"><p data-tooltip-id="my-tooltip" data-tooltip-content={item.failureReason ? item.failureReason : ""}><GoAlertFill className="text-red-600 text-2xl" /></p></div>}</td>}
                  {props.day != todayDay && <td className="p-1 border-[1px]"></td>}
                  
                  {props.tableSetting?.duration && <td className="p-1 flex text-center justify-center flex-row min-w-[120px]" onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }} >{item?.startTime}--{item?.endTime}</td>}
                  <td className="border-[1px] text-center justify-center p-1" onClick={() => { props.setVisibleStrategy(props.visibleStrategy == index ? -1 : index); }}>{buy > 0 && sell > 0 ? "BUY/SELL" : buy == 0 ? "SELL" : "BUY"}</td>
                  <td className="p-1"><input type="text" value={"1x"} className='p-1 w-16 border-2 rounded-md outline-none' /></td>

                  {/* Action */}
                  <td className="p-1 flex flex-row gap-2 pt-3 items-center">
                    <FaEye
                      className='cursor-pointer text-gray-600 text-lg hover:text-blue-500 transition duration-300'
                      onClick={() => {
                        props.setOpenStrategy(true);
                        props.day == todayDay && item.status !== 'Unplaced' && updateDisabled(true);
                        props.setCurrentStrategy(item);
                      }}
                      title="View Strategy"
                    />
                    <MdDriveFileRenameOutline
                      className='cursor-pointer text-gray-600 text-lg hover:text-yellow-500 transition duration-300'
                      onClick={() => {
                        setOpenBox(true);
                        setStrategyName(item.strategyName);
                        setCurrentStrategy(item);
                      }}
                      title="Rename Strategy"
                    />
                    <FaCopy
                      className='cursor-pointer text-gray-600 text-lg hover:text-green-500 transition duration-300'
                      onClick={() => {
                        setOpenBoxDuplicate(true);
                        setCurrentStrategy(item);
                        setStrategyName(item.strategyName);
                      }}
                      title="Duplicate Strategy"
                    />
                    {(item?.status === "Unplaced" || item?.status == 'Failed') && (
                      <MdDeleteForever
                        className='cursor-pointer text-red-500 text-2xl hover:text-red-700 transition duration-300'
                        onClick={() => {
                          setShowDeleteBox(true);
                          setCurrentStrategy(item);
                        }}
                        title="Delete Strategy"
                      />
                    )}
                  </td>

                </tr>
                {props.day == todayDay && props.visibleStrategy === index && (
                  <tr className=''>
                    {item?.orders?.length > 0 && <td colSpan={14} className="border-4 border-blue-500">
                      <OrderTable orders={item?.orders} strategy={item} />
                    </td>}
                    {item?.orders?.length == 0 && !item.enable && <td colSpan={14} className="bg-gray-100 py-2">
                      <span className="text-[14px] text-black underline flex text-center justify-center">Strategy is not active.</span>
                    </td>}
                    {item?.orders?.length == 0 && item.enable && <td colSpan={14} className="bg-gray-100 py-2">
                      <span className="text-[14px] text-black underline space-x-1 flex text-center justify-center">Strategy entry condition is not yet met.</span>
                    </td>}
                  </tr>
                )}
              </>
            )}
          })}

        </tbody>
      </table>
      <Tooltip id="my-tooltip" style={{ width: '300px', borderRadius: '10px', backgroundColor: 'white', color: 'black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',zIndex:20 }} />

      {/* Rename Strategy */}
      <Dialog className="rounded-lg" onClose={(event: any, reason: any) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setOpenBox(false);
        }
      }} open={openBox}>
        <div className="flex flex-row border-b-2 rounded bg-blue-500 text-white">
          <div className="text-[16px] p-1 w-96">Rename Strategy</div>
          <div className="text-[16px] flex justify-end font-semibold p-1 cursor-pointer"><IoMdClose className="text-2xl font-semibold" onClick={() => { setOpenBox(false); }} /></div>
        </div>
        <div className="flex flex-col text-center justify-center mt-1 p-4">
          <div className="font-serif text-[14px] font-medium text-left">Strategy Name</div>
          <input type="text" className="rounded-md border-[1px] border-blue-400 outline-0 bg-[#ECF0FF] h-8 justify-center pl-2" placeholder="Enter Strategy Name" value={strategyName} onChange={(e) => { setStrategyName(e.target.value); }} />
        </div>
        <div className="flex justify-end gap-1 p-1 mt-2 bg-gray-300">
          <button className="border-2 p-1 w-28 bg-blue-600 rounded-lg justify-center text-center text-white cursor-pointer" onClick={() => { renameStrategy(); }}>Rename</button>
        </div>
      </Dialog>

      {/* Dialog Box for Duplicate the Strategy */}

      <Dialog open={openBoxDuplicate} onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setOpenBoxDuplicate(false)
        }
      }} sx={{ borderRadius: "10px" }}>
        <div className="bg-white rounded-lg shadow-lg">
          <div className="flex flex-row items-center justify-between mb-4 bg-blue-400 text-white p-1">
            <div className="text-white text-[18px] font-semibold">Duplicate Strategy</div>
            <div className="h-[24px] w-[24px] text-white flex items-center justify-center cursor-pointer">
              <IoMdClose className="text-2xl font-semibold" onClick={() => setOpenBoxDuplicate(false)} />
            </div>
          </div>
          <h1></h1>

          <div className="mb-4 p-1">
            <label className="block text-gray-700 font-semibold mb-1 text-[14px]">Day</label>
            <div className="grid grid-cols-5 gap-1">
              {entryDay.map((item: any, index: number) => (
                <button key={index} className="text-white px-2 shadow-lg rounded-md h-8 flex items-center justify-center" style={{ backgroundColor: day[index] ? '#0c8ff2' : '#a4d2f5' }} onClick={() => { setDay((prev: any) => { let input = [...prev]; input[index] = !input[index]; console.log(input); return input; }) }}>{item?.name}</button>
              ))}
            </div>
          </div>
          <div className="mb-4 p-1">
            <label className="block text-gray-700 font-semibold mb-1 text-[14px]">Strategy Name</label>
            <input type="text" placeholder="Strategy Name(up to 40 character)" className='border-[1px] rounded outline-0 p-1 w-full bg-[#F8F8F8]' value={strategyName} onChange={(e: any) => { setStrategyName(e.target.value); }} />
          </div>
          <div className="mb-4 p-1">
            <label className="block text-gray-700 font-semibold mb-1 text-[14px]">Broker</label>
            <select className='border-[1px] rounded outline-0 p-1 w-full bg-[#F8F8F8]' value={JSON.stringify(activeBroker)} onChange={(e) => { console.log(e.target.value); setActiveBroker(JSON.parse(e.target.value)) }}>
              <option value={-1}>SELECT BROKER</option>
              {
                broker && broker.map((item: any) => {
                  // console.log(JSON.stringify(item), 'item')
                  return (
                    <option value={JSON.stringify(item)} key={`broker-${item?.id}`}>{item?.broker?.brokerName == 'Zerodha' ? 'ZERODHA' : 'IIFL'}&nbsp;-&nbsp;{item?.brokerClientId}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="flex justify-end gap-1 bg-gray-300 p-1">
            <button className="p-1 w-28 h-8 bg-[#2D5BFF] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => { CreatedDuplicateStrategy(); }}>Duplicate </button>
            <button className="p-1 w-28 h-8 bg-white border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setOpenBoxDuplicate(false)} > Cancel </button>
          </div>
        </div>
      </Dialog>

      {/* For Delete the Strategy */}
      <Dialog open={showDeleteBox} onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setShowDeleteBox(false)
        }
      }} sx={{ borderRadius: "10px" }}>
        <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="flex flex-row items-center justify-between mb-4 bg-blue-400 text-white p-1">
            <div className="text-white text-[16px]">Delete Strategy</div>
            <div className="h-[24px] w-[24px] text-white flex items-center justify-center cursor-pointer">
              <MdClose className="text-2xl font-semibold" onClick={() => setShowDeleteBox(false)} />
            </div>
          </div>
          <h1></h1>
          <div className='text-[14px] p-4'>Are you sure want to Delete the strategy?</div>
        </div>
        <div className="flex justify-end gap-1 p-1 bg-gray-200">
          <button className="p-1 w-16 h-8 bg-[#2D5BFF] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => { updateStrategy("DELETE") }}> Delete</button>
          <button className="p-1 w-16 h-8 bg-white border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowDeleteBox(false)} > Cancel </button>
        </div>
      </Dialog>

      {/* For Enable the Strategy */}
      <Dialog open={showEnableBox} onClose={(event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          setShowEnableBox(false)
        }
      }} sx={{ borderRadius: "10px" }}>
        <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto text-[12px]">
          <div className="flex flex-row items-center justify-between mb-4 bg-blue-400 text-white p-1">
            <div className="text-white text-[16px]">{enableStatus ? 'Disable' : 'Enable'} Strategy</div>
            <div className="h-[24px] w-[24px] text-white flex items-center justify-center cursor-pointer">
              <MdClose className="text-2xl font-semibold" onClick={() => setShowEnableBox(false)} />
            </div>
          </div>
          <h1></h1>
          <div className='text-[14px] p-4'>Are you sure want to {enableStatus ? 'disable' : 'enable'} the strategy?</div>
        </div>
        <div className="flex justify-end gap-1 p-1 bg-gray-200">
          <button className="p-1 w-16 h-8 bg-[#2D5BFF] text-[14px] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => { updateStrategy("ENABLE") }}> {enableStatus ? 'Disable' : 'Enable'}</button>
          <button className="p-1 w-16 h-8 bg-white text-[14px] border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowEnableBox(false)} > Cancel </button>
        </div>
      </Dialog>
    </div>

  )
}

export default StrategyTable