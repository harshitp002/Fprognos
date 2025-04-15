import { useEffect, useState, useRef } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from "react-secure-storage";

import Navbar from "./../Layout/Navbar";
import { GET_ORDER, PROFILE_DETAIL, UPDATE_CLIENT_WISE_DETAIL } from "./../../constant/Constant"
import { min, max, extractErrorMessage } from './../Utility/Utils'

// import { Stomp } from 'react-stomp';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp, { client } from 'stompjs'; // Import stompjs for STOMP protocol support
import { WEBSOCKET_URL } from './../../constant/Constant'
import useDashboardStore from '../../store/dashboardStore.ts';
import SubMenu from '../SubMenu/SubMenu.tsx';
import { order, StrategyData, finalData } from './StrategyData.ts';
import OrderTable from './../Orders/OrderTable.tsx'
import StrategyTable from './StrategyTable.tsx'
import { IoIosSettings } from "react-icons/io";
import Input from '../Input/Input1.tsx';
import { Dialog } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import beep from './../../assets/beep.mp3'
import useInputStore from '../../store/inputStore.ts';
import { MdClose } from 'react-icons/md';
import { MdOutlineSettings } from "react-icons/md";
import { convertStringToDate } from './../Utility/Utils.ts';


function Strategy() {
  const { updateClientBrokerStatus,clientBrokerStatus,updateClientBroker, orders, orderForView, updateOrder, updateNewOrder, updateDisabled, notification, updateSearchValue, updateOrderNotification } = useDashboardStore();
  const { totalPnl, clientPnl,updateClientPnl, searchOrders, searchActive, updateSearchActive, updateNewOrderClientPnl } = useDashboardStore();
  const { entryDay } = useInputStore();
  const [visibleStrategy, setVisibleStrategy] = useState(-1);
  const [openStrategy, setOpenStrategy] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(null);
  const [prevPrice, setPrevPrice] = useState({});
  const [day, setDay] = useState<any>(new Date().getDay());
  const [searchValue, setSearchValue] = useState("");
  const [activeStrategy, setActiveStrategy] = useState<any>(null);
  const [setting, setSetting] = useState<any>({ "clientId": true, "algoStatus": true, "duration": true, "info": true })
  const [openSetting, setOpenSetting] = useState<any>(false);
  const { updateStrategyCount } = useDashboardStore();

  // client wise stoploss and target
  const [clientWiseBoxOpen, setClientWiseBoxOpen] = useState<boolean>(false);
  const [clientWiseTarget, setClientWiseTarget] = useState('');
  const [clientWiseStoploss, setClientWiseStoploss] = useState('');
  const [clientBrokerId, setClientBrokerId] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);

  const playBeep = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const navigate = useNavigate();

  // update clientwise detail
  const updateClientWiseDetail = () => {
    const token = secureLocalStorage.getItem('token');
    let data = {
      clientId: clientBrokerId,                    // Broker client ID (ensure this is a String)
      stoploss: clientWiseStoploss,                       // Stoploss value (Double)
      target: clientWiseTarget,                             // Target value (Double)
      createdDate: new Date().toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
      stoplossMatched: false,                      // Boolean flag for stoploss matched
      targetMatched: false,                        // Boolean flag for target matched
      status: "NA",                                // Status (String)
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${UPDATE_CLIENT_WISE_DETAIL}/${clientBrokerId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
        console.log(response?.data?.data,'ClientPnl');
        response?.data?.data && updateNewOrderClientPnl([response?.data?.data]);
        toast.success('updated successfully!.')      
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/login');
        } else if (error?.response?.status === 409) {
          toast.error(error?.response?.data?.data);
        } else {
          toast.error(extractErrorMessage(error));
        }
        console.log(error);
      });
  }

  const strategyCalculation = (data: any) => {
    let total = data.length;
    let enable = 0;
    let active = 0;
    let completed = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]['status'] == 'Unplaced') {
        enable++;
      }
      if (data[i]['status'] == 'Placed' || data[i]['status'] == 'Partial') {
        active++;
      }
      if (data[i]['status'] == 'Completed' || data[i]['status'] == 'Terminated & Squared Off') {
        completed++;
      }
    }
    return { 'active': active, 'enable': total - enable, 'strategy': total, 'completed': completed };
  }

  const getOrderByClientId = async () => {
    try {
      const token = secureLocalStorage.getItem('token');
      const clientId = secureLocalStorage.getItem('id');
      const today = new Date().getDay();

      let url = day == today ? `${GET_ORDER}/${clientId}` : `${GET_ORDER}/${clientId}?day=${day}`;

      const config: any = {
        url: url,
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      }
      const response = await axios(config); // Replace with your API endpoint
      if (response?.data?.data?.strategies) {
        const newData = response?.data?.data?.strategies;
        const clientData = response?.data?.data?.clientPnl;
        updateStrategyCount(strategyCalculation(newData));
        updateClientPnl(clientData);
        updateClientBroker(clientData);
        preProcess(newData);
      } else {
        const newData = response?.data?.data;
        updateStrategyCount(strategyCalculation(newData));
        preProcess(newData);
      }

    } catch (error: any) {
      // updateOrder({});
      if (error?.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(extractErrorMessage(error));
      }
    }
  }

  const preProcess = (order: any) => {
    let res: any = {}
    let pnl = 0;
    for (let i = 0; i < order.length; i++) {
      res = { ...res, [order[i]?.id]: order[i] };
      pnl = pnl + order[i]?.pnl;
      updateOrderNotification(order[i],order[i].orderStatus);
    }
    updateOrder(res);
    getConnectWebSocket();
  }

  let websocketClient: any = null;
  let latestMessage: any = {};
  let subscription: any = null; 
  let reconnectInterval:any = null;

  const updateOrderStatus = () => {
    if (!latestMessage) return;
    {
      Object.entries(latestMessage).map(([key, value]:any, index) => {
        const message = JSON.parse(value); // Parse the message once
        const parsedMessage = message?.strategies[0];
        const clientPnl = message?.clientPnl;

        if (searchActive) {
          const matchesClientId = parsedMessage?.broker?.brokerClientId === searchValue;
          const matchesStrategyName = parsedMessage.strategyName === searchValue;
          const matchesIndex = parsedMessage.script?.name === searchValue;
          if (!(matchesClientId || matchesStrategyName || matchesIndex)) return null;
        }
        // console.log('orders detail at', Date().toString(), parsedMessage);
        const { status, strategyName, id } = parsedMessage;

        // Display completion message and sound
        if (notification[id] && status === 'Completed') {
          toast.success(`Strategy "${strategyName}" Completed`);
          playBeep();
        }

        // Update the order state
        if (id) {
          updateNewOrder(id, message);
          // updateClientPnl(clientPnl);
        }

        return null; // As you aren't returning JSX, return null to prevent rendering issues
      })
    }
    latestMessage = {};
  };

  const getConnectWebSocket = () => {
    if (websocketClient) {
      return; // Avoid creating multiple connections
    }

    const sock = new SockJS(WEBSOCKET_URL, null, {
      withCredentials: true
    });

    const client: any = Stomp.over(sock);
    client.debug = null;

    const clientId = secureLocalStorage.getItem('id');
    const token = secureLocalStorage.getItem('token'); // Retrieve the token securely

    if (!token) {
      console.error('Authorization token is missing');
      return;
    }


    client.connect(
      { Authorization: `Bearer ${token}` }, // Include the token in the headers
      () => {
        console.log('client connection setup done!!!');
        let cnt = 0;
        // Subscribe to the topic and buffer the latest message received
        subscription = client.subscribe(`/topic/${clientId}`, (message: any) => {
          let message1 = JSON.parse(message?.body);
          if (Array.isArray(message1.strategies) && message1.strategies.length > 0) {
            latestMessage[JSON.parse(message?.body)?.strategies[0]?.id] = message?.body;
          } else {
            latestMessage[JSON.parse(message?.body)?.id] = message?.body;
          }
          // console.log("hello-",cnt,JSON.parse(message?.body)?.id);
          cnt++;
        });

        // Set an interval to update the order status every second with the latest buffered message
        setInterval(() => {
          updateOrderStatus();
          cnt = 0
        }, 2000);  // Update every 1000ms (1 second)

      }, (error: any) => {
        if (error?.response?.status === 401) {
          navigate('/login');
        } else {
          toast.error(extractErrorMessage(error));
        }
        console.error('Error connecting to WebSocket server:', error);
      });

    websocketClient = client;
  };


  // at mounting time,getting some data from localStorage
  useEffect(() => {
    const today = new Date().getDay();
    setDay(today);
    updateSearchActive(false);
  }, []);

  useEffect(() => {
    getOrderByClientId();
  }, [day])

  const reconnectWebSocket = () => {
    // Reconnect only if the WebSocket is disconnected
    if (!websocketClient || !websocketClient.connected) {
      console.log('WebSocket disconnected, attempting to reconnect...');
      getConnectWebSocket();  // Call the function to reconnect
    }
  };

   // Use useEffect to start the WebSocket connection when the component mounts
   useEffect(() => {
    getConnectWebSocket();
     // Set an interval to check connection status every 10 seconds
    reconnectInterval = setInterval(() => {
    reconnectWebSocket();  // Check and reconnect if disconnected
    }, 1000);  // Check every 10 seconds

    // Clean up the WebSocket connection and timeout when the component unmounts
    return () => {
      if (subscription) {
        subscription.unsubscribe();  // Unsubscribe from the topic
        console.log('Unsubscribed from WebSocket topic');
      }

      if (websocketClient && websocketClient.connected) {
        websocketClient.disconnect(() => {
          console.log('WebSocket disconnected successfully');
        });
      }

      if (reconnectInterval) {
        clearInterval(reconnectInterval);  // Clear the reconnect interval
      }

    };
  }, []);
   

  useEffect(() => {
    const checkToken = async () => {
      const token = await secureLocalStorage.getItem('token');
      if (!token) {
        // Redirect to login page if token is not present
        navigate("/login");
      }
    };
    checkToken();
  }, []); 
 

  useEffect(() => {
    let env= import.meta.env.VITE_NODE_ENV;
    if ((env == 'staging' || env=='development') && typeof totalPnl !== 'undefined') {
      document.title = isNaN(totalPnl)?`₹ 0.00 | Paper Trading`:`₹ ${String(totalPnl.toFixed(2))} | Paper Trading` // Ensure the value is a string
    }else if (env == 'production' && typeof totalPnl !== 'undefined') {
      document.title = isNaN(totalPnl)?`₹ 0.00 | Fprognos`:`₹ ${String(totalPnl.toFixed(2))} | Fprognos` // Ensure the value is a string
    }
    // Cleanup function to restore the original title on unmount
    return () => {
      (env=='staging' || env=='development')?document.title = 'Paper Trading':document.title = 'Fprognos';
    };
  }, [totalPnl]);


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <audio ref={audioRef} src={beep} preload="auto" />

        <div className="fixed top-0 w-full z-20 flex-col">
          <Navbar />
        </div>
        <SubMenu />
        {/* Strategy Wise Data */}
        <div className='m-2 md:m-4'>
          <div className='flex flex-row flex-wrap gap-6 p-2'>
            {clientPnl && clientPnl.map((item: any, index) => (
              <div
                key={`clientBroker-${index}`}
                className={`min-w-[170px] flex flex-col bg-white rounded-lg border-2 p-2 transition-all duration-300 cursor-pointer mb-6 
                ${clientBrokerStatus[item?.clientId] ? 'border-blue-500 bg-white' : 'border-gray-300 hover:shadow-xl'}`}
                
              >
                <div className="flex flex-col justify-center text-center w-full" onClick={() => { updateClientBrokerStatus(item?.clientId); }}>
                  {/* PNL Section */}
                  <div className="text-[14px] text-gray-800 mb-1 flex items-center justify-center w-full">
                    <span
                      className="font-bold"
                      style={{ color: item?.pnl > 0 ? 'green' : 'red' }}
                    >
                      &#8377; {typeof item?.pnl === "number" ? item.pnl.toFixed(2) : "0.00"}
                    </span>
                  </div>

                  {/* Broker Name */}
                  <div className='flex flex-col sm:flex-row justify-center text-center w-full'>
                    <p className="text-[14px] text-blue-700 font-semibold mb-3 sm:mb-0 text-left">
                      {item?.brokerName} - {item?.clientId}
                    </p>
                  </div>
                  
                  {/* Client Stoploss */}
                  <div className="text-[12px] font-semibold text-gray-700 flex text-center justify-center w-full">
                    <div className="flex items-center justify-center">
                      Original Stoploss:
                    </div>
                    <span className='text-gray-900'>{item?.stoploss ? item?.stoploss : '0'}</span>
                  </div>

                  {/* Client Target */}
                  <div className="text-[12px] font-semibold text-gray-700 mb-2 flex text-center justify-center w-full">
                    <div className="flex items-center justify-center text-center">
                      Target:
                    </div>
                    <span className='text-gray-900'>{item?.target ? item?.target : '0'}</span>
                  </div>
                  
                </div>
                <div className='flex text-center justify-center'>
                  <div className="text-2xl font-semibold flex justify-center w-10 border-blue-400 p-1 border-2 rounded-md">
                    <MdOutlineSettings className='text-blue-500' onClick={() => { setClientBrokerId(item?.clientId); setClientWiseBoxOpen(true);setClientWiseStoploss(item?.stoploss);setClientWiseTarget(item?.target) }} />
                  </div>
                </div>
              </div>

            ))}
          </div>

          <div className='flex-1 mt-4'>
            <div className="flex flex-wrap ml-2 mt-4 gap-4 text-[14px] items-center">
              {/* Trading Day Dropdown */}
              <select className="border-2 border-blue-400  px-3 py-2 rounded-md text-blue-600 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all" value={day} onChange={(e: any) => { console.log(e.target.value, 'days'); setDay(e.target.value); }}>
                {entryDay && entryDay.map((day, index) => (
                  <option
                    key={`day-${index}`}
                    className="bg-white h-8 rounded-md text-center font-medium"
                    value={day.value}
                  >
                    {day.name}
                  </option>
                ))}
              </select>

              {/* Total PNL Display */}
              <div className="text-black font-semibold border-2 border-blue-500 px-3 py-2  rounded-md bg-blue-50"> Total PNL </div>
              <div className={` text-black font-semibold border-2 border-blue-500 px-3 py-2 rounded-md min-w-[120px] text-[14px] ${totalPnl > 0 ? 'text-green-600 border-green-600' : 'text-red-600 border-red-600'} border-2`}>
                &#8377; {typeof totalPnl === "number" ? totalPnl.toFixed(2) : "0.00"}
              </div>

              {/* Settings Button */}
              <div className="flex items-center  font-medium shadow-md px-3 py-2 rounded-md border-2 border-blue-500 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer" onClick={() => { setOpenSetting(true); }}>
                Setting <IoIosSettings className="ml-2 text-[14px]" />
              </div>

              {/* Search Input */}
              <input type="text" className="px-3 py-2  rounded-md border-2 w-[440px] border-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder="Search by Client ID, Strategy Name, or Index" value={searchValue} onChange={(e) => { setSearchValue(e.target.value); }} onKeyDown={(e) => { if (e.key === 'Enter') { searchValue !== "" && searchOrders(searchValue); searchValue !== "" && updateSearchActive(true); updateSearchValue(searchValue); } }} />
              {!searchActive && <button className='text-white  bg-blue-600 px-3 py-2 space-x-1 text-md font-serif rounded-lg hover:bg-blue-600 border-2 flex text-center justify-center' onClick={() => { searchValue !== "" && searchOrders(searchValue); searchValue !== "" && updateSearchActive(true); updateSearchValue(searchValue); }}>Search</button>}
              {searchActive && <div className='bg-red-400 rounded-full text-2xl text-white cursor-pointer p-2' onClick={() => { updateSearchActive(false); getOrderByClientId(); }}><MdClose /></div>}
            </div>

            <div className='rounded-lg border-2 border-gray-300 mt-2 shadow-sm'>
              <StrategyTable day={day} strategy={orderForView} tableSetting={setting} setCurrentStrategy={setCurrentStrategy} visibleStrategy={visibleStrategy} setVisibleStrategy={setVisibleStrategy} orders={StrategyData[visibleStrategy]?.orders} setOpenStrategy={setOpenStrategy} />
            </div>
          </div>
        </div>
      </div>

      {/* Open Strategy using Input1.tsx file */}
      <Dialog open={openStrategy} maxWidth="xl" onClose={() => { setOpenStrategy(false); updateDisabled(false); }} sx={{ borderRadius: "10px" }}>
        <div className="flex flex-row border-b-2 bg-blue-400 text-white">
          <div className="text-white text-[18px] p-2 font-semibold">STRATEGY</div>
          <div className="h-[24px] w-[24px] text-white flex-grow flex justify-end font-semibold p-2 cursor-pointer"><IoMdClose className='text-2xl font-semibold' onClick={() => { setOpenStrategy(false); updateDisabled(false); }} /></div>
        </div>
        <Input data={currentStrategy} day={day} />
        <div className="flex justify-end p-2 gap-2 bg-blue-300">
          <button className="p-1 w-28 bg-white border-[1px] border-[#2D5BFF] rounded-lg justify-center text-center text-[#2D5BFF] cursor-pointer" onClick={() => { setOpenStrategy(false); updateDisabled(false); }}>Cancel</button>
        </div>
      </Dialog>

      {/* Open Setting */}
      <Dialog open={openSetting} maxWidth="xl" onClose={() => { setOpenSetting(false); }} sx={{ borderRadius: "10px" }}>
        <div className="flex flex-row border-b-2">
          <div className="text-[#181818] text-[16px] p-2 font-medium">Table Setting</div>
          <div className="h-[24px] w-[24px] text-[#181818] flex-grow flex justify-end font-semibold p-2 cursor-pointer"><IoMdClose className='text-2xl font-semibold' onClick={() => { setOpenSetting(false); }} /></div>
        </div>
        <div className='ml-4'>
          <div className='text-[#181818] text-[16px] p-2 w-[200px] font-semibold'>Column Show/Hide</div>
          <div className='flex flex-row gap-4'><input type="checkbox" className='h-4 w-4' checked={setting?.clientId} onChange={() => { setSetting((prev: any) => ({ ...prev, clientId: !prev.clientId })) }} /><div className='text-md'>CLIENTID</div></div>
          <div className='flex flex-row gap-4'><input type="checkbox" className='h-4 w-4' checked={setting?.algoStatus} onChange={() => { setSetting((prev: any) => ({ ...prev, algoStatus: !prev.algoStatus })) }} /><div className='text-md'>ALGO_STATUS</div></div>
          <div className='flex flex-row gap-4'><input type="checkbox" className='h-4 w-4' checked={setting?.duration} onChange={() => { setSetting((prev: any) => ({ ...prev, duration: !prev.duration })) }} /><div className='text-md'>DURATION</div></div>
          <div className='flex flex-row gap-4'><input type="checkbox" className='h-4 w-4' checked={setting?.info} onChange={() => { setSetting((prev: any) => ({ ...prev, info: !prev.info })) }} /><div className='text-md'>INFO</div></div>
        </div>
        <div className="flex justify-end p-2 ml-2 gap-2">
          <button className="p-1 w-28 bg-blue-500 text-white border-[1px] border-[#2D5BFF] rounded-lg  cursor-pointer" onClick={() => { setOpenSetting(false); }}>Close</button>
        </div>
      </Dialog>

      {/* clientwise stoploss and target */}
      <Dialog open={clientWiseBoxOpen} maxWidth="xl" onClose={() => { setClientWiseBoxOpen(false); }} sx={{ borderRadius: "10px" }}>
        <div className="flex flex-row border-b-2">
          <div className="text-[#181818] text-[18px] p-2 font-semibold flex flex-row gap-2">Client Setting  <MdOutlineSettings className='2xl font-semibold mt-1' /></div>
          <div className="h-[24px] w-[24px] text-[#181818] flex-grow flex justify-end font-semibold p-2 cursor-pointer"><IoMdClose className='text-2xl font-semibold' onClick={() => { setClientWiseBoxOpen(false); }} /></div>
        </div>
        <div className='flex flex-col m-2'>
          <div className='text-left font-medium'>Target</div>
          <input type="number" className='border-[1px] rounded-lg min-w-[200px] outline-none p-1' value={clientWiseTarget} onChange={(e) => { setClientWiseTarget(e.target.value); }}></input>
          <div className='text-left font-medium'>Stoploss</div>
          <input type="number" className='border-[1px] rounded-lg min-w-[200px] outline-none p-1' value={clientWiseStoploss} onChange={(e) => { setClientWiseStoploss(e.target.value); }}></input>
        </div>
        <div className="flex justify-end p-2 gap-2 bg-gray-300">
          <button className="p-1 w-16 bg-blue-500 text-white border-[1px] border-[#2D5BFF] rounded-lg  cursor-pointer" onClick={() => { updateClientWiseDetail(); setClientWiseBoxOpen(false); }}>Save</button>
          <button className="p-1 w-16 bg-blue-500 text-white border-[1px] border-[#2D5BFF] rounded-lg  cursor-pointer" onClick={() => { setClientWiseBoxOpen(false); }}>Close</button>
        </div>
      </Dialog>
    </>
  );
}

export default Strategy;