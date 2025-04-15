import { useState, useEffect } from 'react'
import axios from 'axios';
import { Dialog } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from "react-secure-storage";
//component
import { EXECUTE_STRATEGY, GET_ALL_CONSTANT, SAVE_INPUT_STRATEGY } from './../../constant/Constant';
import ProtectProfit from './ProtectProfit';
import Mutation from './Mutation';
import Leg from './Leg'
import Main from './Main'
import LegBased from './LegBased';
//icon
import { MdClose } from "react-icons/md";
// interface
import { Legs, input, } from './../Interface/OrderItem'
import { Tooltip } from 'react-tooltip';
import { IoMdHelpCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { extractErrorMessage } from '../Utility/Utils';
import DateTime from './DateTime';
import useDashboardStore from '../../store/dashboardStore';
import { UPDATE_RUNNING_STRATEGY, API_STATUS, CREATE_NEW_STRATEGY } from './../../constant/Constant';
import useInputStore from '../../store/inputStore';
import AdvancedSetting from './AdvancedSetting';
import { IoInformationCircleOutline } from "react-icons/io5";

function Input(props: any) {
    //Main.jsx
    const navigate = useNavigate();
    const { disabled } = useDashboardStore();
    const [product, setProduct] = useState('MIS')
    const [startTime, setStartTime] = useState('09:30')
    const [endTime, setEndTime] = useState('09:30')
    const [startDate, setStartDate] = useState('2020-01-03')
    const [endDate, setEndDate] = useState('2020-01-03')
    const [clientId, setClientId] = useState<any>({ "id": 1 })
    const [scripts, setScripts] = useState<any>({ "id": 1, "value": "NIFTY" })
    const [expiry, setExpiry] = useState('2024-03-01')
    const [exchange, setExchange] = useState<any>({ "id": 1, "value": "NSE" })
    const [marketOrder, setMarketOrder] = useState<any>({ "id": 1, "value": "" })
    const [variety, setVariety] = useState<any>({ "id": 1, "value": "" })
    const [mutation, setMutation] = useState<boolean>(false)
    const [legQuantity, setLegQuantity] = useState(0)
    const [validity, setValidity] = useState("IOC");
    // choice Between strategy based and leg based
    const [choice, setChoice] = useState("STRATEGY");
    const [reExecuteTimes, setReExecuteTimes] = useState<Number>(3)
    //Leg.jsx
    const [legArray, setLegArray] = useState<Legs[]>([])
    // LegBased
    const [waitTrade, setWaitTrade] = useState(false);
    const [reEntry, setReEntry] = useState(false);
    const [moveSlToCost, setMoveSlToCost] = useState(false);
    // strategyBased.jsx
    // const [waitTrade,setWaitTrade]=useState(true); // there is option already present in leg based
    const [protectProfit, setProtectProfit] = useState(false);
    const [rangeBreakOut, setRangeBreakOut] = useState(false);
    const [targetChoice, setTargetChoice] = useState(false);
    const [target, setTarget] = useState<number>(1000);
    const [stoplossChoice, setStoplossChoice] = useState(false);
    const [stoploss, setStoploss] = useState<number>(1000);
    const [expiryDate, setExpiryDate] = useState('2020-01-03')
    const [expiryType, setExpiryType] = useState("WEEKLY")
    // Mutation.jsx
    const [comparison, setComparison] = useState('Greater than')
    const [value, setValue] = useState(1000)
    const [quantity, setQuantity] = useState(5)
    // protectProfit.jsx
    const [protectProfitChoice, setProtectProfitChoice] = useState('lockMinimumProfit');
    const [profitReaches, setProfitReaches] = useState<number>(1000);
    const [lockMinimumProfit, setLockMinimumProfit] = useState<number>(500);
    const [increaseProfit, setIncreaseProfit] = useState<number>(1000);
    const [trailProfit, setTrailProfit] = useState<number>(300);
    // rangeBreakOut.jsx
    const [rangeStartTime, setRangeStartTime] = useState("09:30");
    const [rangeEndTime, setRangeEndTime] = useState("09:40")
    // Dialog box ::  Saved Strategy content
    const [strategyName, setStrategyName] = useState("");
    
    // savedStrategy detail
    const [savedstrategies, setSavedStrategies] = useState([])
    // all constant
    const [constant, setConstant] = useState({})

    const [exchangeList, setExchangeList] = useState<any[]>([])
    const [scriptList, setScriptList] = useState<any[]>([])
    const [orderType, setOrderType] = useState<any[]>([])
    const [varieties, setVarieties] = useState<any[]>([])
    const [productType, setProductType] = useState<any[]>([])
    const [segmentList, setSegmentList] = useState<any[]>([])

    const [allSavedStrategies, setAllSavedStrategy] = useState<any[]>([])
    // message
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [brokers, setBrokers] = useState<any[]>([]);
    const [showBroker, setShowBroker] = useState(false);
    const [activeBroker, setActiveBroker] = useState<any>(null);

    // terminate algo and terminate status
    const [terminateAlgo, setTerminateAlgo] = useState(false);
    const [terminateStrategy, setTerminateStrategy] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("");
    const [showstrategy, setshowstrategy] = useState(false);

    // api status
    const [apiStatus, setApiStatus] = useState<any>({ "orders": true, "market": true });

    // days
    const [days, setDays] = useState([false, false, false, false, false, false, false]);
    const { entryDay } = useInputStore();
    const [todayDay, setTodayDay] = useState(1);
    const { updateEndHour, updateEndMinutes, updateStartHour, updateStartMinutes, startHour, endHour, startMinutes, endMinutes, rangeEndHour, rangeEndMinutes, updateRangeEndHour, updateRangeEndMinutes } = useInputStore();
    const [brokerDetail,setBrokerDetail]=useState<any>(null); // Detail of Broker Detail
    // Re-Execute Method 
    const [reExecuteMethod, setReExecuteMethod] = useState("LTP");
    
    const status = async (broker: any) => {
        try {
            const token = secureLocalStorage.getItem('token');
            const config: any = { url: `${API_STATUS}/${broker?.brokerClientId}/${broker?.broker?.brokerSlugname}`, method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            const response = await axios(config); // Replace with your API endpoint
            setApiStatus(response?.data);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
            } else {
                toast.error(extractErrorMessage(error));
            }
            console.error('Error fetching data:', error);
        }
    }

    const validation = () => {
        // check time
        const startTimeInMinutes = parseInt(startHour) * 60 + parseInt(startMinutes);
        const endTimeMinutes = parseInt(endHour) * 60 + parseInt(endMinutes);
        const rangeEndTimeInMinutes = parseInt(rangeEndHour) * 60 + parseInt(rangeEndMinutes);
        // check start time must be less than end time
        if (startTimeInMinutes >= endTimeMinutes) {
            toast.warn('Start time must be less than Exit Time.');
            setMessage('Start time must be less than Exit Time..');
            return false;
        }
        // check start time must be less than range end time.
        if (rangeBreakOut && startTimeInMinutes >= rangeEndTimeInMinutes) {
            toast.warn('Range Breakout End Time should be atleast 1 minute greater than Entry Time.');
            setMessage('Range Breakout End Time should be atleast 1 minute greater than Entry Time.');
            return false;
        }
        // check active broker is null or not.
        if (activeBroker == null) {
            toast.warn('Active Broker is required!!');
            setMessage("Active Broker is required!!");
            return false;
        }
        // Strategy Name is compulsory.
        if (strategyName === "") {
            toast.warn('StrategyName is compulsory to fill!!');
            setMessage("StrategyName is compulsory to fill!!");
            return false;
        }

        if (targetChoice && (isNaN(target) || target == null || target == undefined)) {
            toast.warn('Target must be greater than zero.');
            setMessage('Target must be greater than zero.');
            return false;
        }
        if (stoplossChoice && (isNaN(stoploss) || stoploss == undefined || stoploss == null)) {
            toast.warn('Stoploss must be greater than zero.');
            setMessage('Stoploss must be greater than zero.');
            return false;
        }
        let strategy: any = {};
        for (let i = 0; i < legArray.length; i++) {
            if (rangeBreakOut && legArray[i]['rangeBreakoutEntry'] == '-1') {
                toast.warn('Please select range breakout entry way.');
                setMessage('Please select range breakout entry way.');
                return false;
            }
            if (legArray[i]['rangeBreakoutType'] == '-1') {
                toast.warn('Please select range breakout type.');
                setMessage('Please select range breakout type.');
                return false;
            }
            if (legArray[i]['entryChoice'] == 'CP' && (legArray[i]['closestPremium'] == null || legArray[i]['closestPremium'] == undefined || isNaN(legArray[i]['closestPremium']))) {
                toast.warn('Please enter the value of closest premium.');
                setMessage('Please enter the value of closest premium.');
                return false;
            }
            if (isNaN(legArray[i]['target'])) {
                toast.warn('Target must be greater than 0');
                setMessage('Target must be greater than 0');
                return false;
            }
            if (isNaN(legArray[i]['stopLossValue'])) {
                toast.warn('Stoploss must be greater than 0');
                setMessage('Stoploss must be greater than 0');
                return false;
            }
            if (legArray[i]['trailLossChoice'] && (legArray[i]['trailProfit'] == null || legArray[i]['trailProfit'] == undefined || isNaN(legArray[i]['trailProfit']) || legArray[i]['trailStoploss'] == null || legArray[i]['trailStoploss'] == undefined || isNaN(legArray[i]['trailStoploss']))) {
                toast.warn('trailProfit and trailStoploss must be greater than zero.');
                setMessage('trailProfit and trailStoploss must be greater than zero.');
                return false;
            }
            if (waitTrade && (isNaN(legArray[i]['waitTrade']) || legArray[i]['waitTrade'] == null || legArray[i]['waitTrade'] == undefined)) {
                toast.warn('WaitTrade value must be greater than zero.');
                setMessage('WaitTrade value must be greater than zero.');
                return false;
            }

            let key = ''
            if (legArray[i]['entryChoice'] == 'ATM_POINT') {
                key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['atmPoint'];
            } else if (legArray[i]['entryChoice'] == 'ATM_PERCENT') {
                key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['atmPercent'];
            } else if (legArray[i]['entryChoice'] == 'CP') {
                key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['closestPremium'] + legArray[i]['closestPremiumChoice'];
            } else if (legArray[i]['entryChoice'] == 'CP_STRADDLE') {
                key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['closestPremium'] + legArray[i]['closestPremiumChoice'];
            }

            strategy[key] = strategy[key] ? strategy[key] + 1 : 1;
            if (strategy[key] > 1) {
                setMessage('Cannot place same type of order!.');
                toast.warn('Cannot place same type of order!.');
                console.log(strategy, key, 'cannot place same type of order')
                return;
            }
        }
        console.log(strategy, 'strategy');


        if (legArray.length == 0) {
            setMessage('Minimum 1 leg required!.');
            toast.warn('Minimum 1 leg required!.');
            return false
        }
        return true;
    }
    
    const preProcessData = (data:any) => {
        delete data['days'];
        data['productType'] = product;
        // data['startTime'] = startTime;
        // data['endTime'] = endTime;
        data['startTime'] = startHour + ":" + startMinutes;
        data['endTime'] = endHour + ":" + endMinutes;
        data['startDate'] = startDate;
        data['endDate'] = endDate;
        data['script'] = scripts;
        //        data['expiry']="2024-04-21";    // TODO : field required for requirement of listing all expiry
        data['expiryType'] = expiryType;
        data['exchange'] = exchange;
        data['orderType'] = marketOrder;
        data['variety'] = variety;
        data['mutation'] = false;
        data['strategyChoice'] = choice;
        data['validity'] = validity;
        // strategy name
        data['strategyName'] = strategyName;

        if (rangeBreakOut) {
            data['rangeBreakOut'] = rangeBreakOut;
            data['rangeStartTime'] = startHour + ':' + startMinutes;
            data['rangeEndTime'] = rangeEndHour + ':' + rangeEndMinutes;
        }
        if (stoplossChoice) {
            data['stoplossChoice'] = stoplossChoice;
            data['stoploss'] = stoploss;
        }
        if (targetChoice) {
            data['targetChoice'] = targetChoice;
            data['target'] = target;
        }
        if (reEntry) {
            data['reEntryExecute'] = reEntry;
        }
        if (protectProfit) {
            data['protectProfit'] = protectProfit;
            data['protectProfitChoice'] = protectProfitChoice;
            if (protectProfitChoice === 'lockMinimumProfit') {
                data['profitReaches'] = profitReaches;
                data['lockMinimumProfit'] = lockMinimumProfit;
            } else if (protectProfitChoice === 'trailProfit') {
                data['increaseProfit'] = increaseProfit;
                data['trailProfit'] = trailProfit;
            }
            else {
                data['profitReaches'] = profitReaches;
                data['lockMinimumProfit'] = lockMinimumProfit;
                data['increaseProfit'] = increaseProfit;
                data['trailProfit'] = trailProfit;
            }
        }

        if (waitTrade)
            data['waitTrade'] = waitTrade;

        if (choice == 'LEG' && moveSlToCost)
            data['moveSlToCost'] = moveSlToCost;

        // Re-Execute Method
        // if (reEntry){
        //     data['ReExecuteType']=reExecuteMethod;
        // }

        // check all leg action is same or not
        for (let i = 1; i < legArray.length; i++) {
            if (legArray[i].actionType != legArray[i - 1].actionType) {
                data['moveSlToCost'] = false;
                break;
            }
        }

        let legDetail = []

        for (let i = 0; i < legArray.length; i++) {
            let leg: any = {}
            leg["positionNo"] = i + 1;
            leg['id'] = data.legs[i]?.id ?? null;

            if (legArray[i].lotSize > 0) {
                leg["lotSize"] = legArray[i].lotSize;
            } else {
                leg["lotSize"] = 1;
                alert('Lot Size is not appropriate so we taken by default lotSize is 1.');
            }
            leg["entryChoice"] = legArray[i].entryChoice;

            if(legArray[i].legType == 'OPTION'){
                if (legArray[i].entryChoice == 'ATM_PERCENTAGE')
                    leg["atmPercent"] = legArray[i].atmPercent;
                else if (legArray[i].entryChoice == 'ATM_POINT')
                    leg["atmPoint"] = legArray[i].atmPoint;
                else if (legArray[i].entryChoice == 'CP') {
                    leg["closestPremium"] = legArray[i].closestPremium;
                    leg['closestPremiumChoice'] = legArray[i].closestPremiumChoice
                }
                else if (legArray[i].entryChoice == 'CP_STRADDLE') {
                    leg['closestPremiumOnStraddle'] = legArray[i].closestPremiumOnStraddle
                    leg['closestPremiumChoice'] = 'NA'
                }
            }else{
                leg["atmPoint"] = 0;
            }

            leg['actionType'] = legArray[i].actionType;
            
            if(legArray[i].legType == 'OPTION'){
                leg['optionType'] = legArray[i].optionType;
            }else{
                leg['optionType'] = 'NA';
            }
            leg['script'] = scripts;

            if (choice == 'STRATEGY') {
                leg['expiryType'] = expiryType;
            } else {
                leg['expiryType'] = legArray[i].expiryType;
            }
            //            leg['expiry']="2024-04-21";  // TODO :: Expiry list required

            // for stoploss only
            if (legArray[i].stopLossValue !== -1) {
                leg['stopLossChoice'] = legArray[i].stopLossChoice;
                leg['stopLossValue'] = legArray[i].stopLossValue;
            }

            // for leg target profit
            if (legArray[i].target !== -1) {
                leg['targetType'] = legArray[i].targetType;
                leg['target'] = legArray[i].target;
            }


            if (legArray[i].trailLossChoice && (legArray[i].stopLossChoice == 'SL_POINT' || legArray[i].stopLossChoice == 'SL_PERCENT')) {
                leg['trailLossChoice'] = legArray[i].trailLossChoice;
                leg['trailLossType'] = legArray[i].trailLossType
                leg['trailProfit'] = legArray[i].trailProfit;
                leg['trailStoploss'] = legArray[i].trailStoploss;
            }

            if (waitTrade && legArray[i].waitTrade !== -1) {
                leg['waitTradeType'] = legArray[i].waitTradeType;
                leg['waitTrade'] = legArray[i].waitTrade;
            }

            if (choice == 'LEG' && reEntry && legArray[i].reEntryExecuteTimes !== -1) {
                leg['reEntryExecuteChoice'] = legArray[i].reEntryExecuteChoice;
                leg['reEntryDependency'] = legArray[i].reEntryDependency;
                leg['reEntryExecuteTimes'] = legArray[i].reEntryExecuteTimes;
            }

            // choice is strategy and reEntry is True
            if (choice === "STRATEGY" && reEntry) {
                leg['reEntryExecuteChoice'] = 'RE_EXECUTE'
                leg['reEntryDependency'] = 'SL_TP';
                leg['reEntryExecuteTimes'] = reExecuteTimes;
            }

            // range BreakOut
            if (rangeBreakOut) {
                leg['rangeBreakoutEntry'] = legArray[i].rangeBreakoutEntry;
                leg['rangeBreakoutType'] = legArray[i].rangeBreakoutType
            }

            leg['variation'] = 1
            if (scripts.value == 'SENSEX') {
                leg['segmentType'] = segmentList[segmentList.length - 1];
            } else {
                leg['segmentType'] = segmentList[0];
            }

            // leg type :: 
            leg['legType']=legArray[i]?.legType;

            // expiry
            leg['expiry']=legArray[i].expiry;

            legDetail.push(leg);
        }
        data['legs'] = legDetail;
        console.log(legDetail, 'leg')
        console.log(data,'data')
        return data;
    }

    // For Saving Strategy
    const modifyStrategy = async () => {
        try {
            let data = props.data;
            if (currentStatus === "terminateAlgo") {
                data['terminateAlgo'] = true;
            } else if (currentStatus == "terminateStrategy") {
                data['terminateStrategy'] = true;
            } else {
                // ----- old code of modify ----
                // if (stoplossChoice) {  // strategy stoploss
                //     data['stoplossChoice'] = stoplossChoice;
                //     data['stoploss'] = stoploss;
                // }
                // if (targetChoice) {   // strategy target
                //     data['targetChoice'] = targetChoice;
                //     data['target'] = target;
                // }
                // for (let i = 0; i < legArray.length; i++) {
                //     if (legArray[i].target !== -1) {
                //         data.legs[i]['target'] = legArray[i].target;
                //     }
                //     if (legArray[i].stopLossValue != -1) {
                //         data.legs[i]['stopLossValue'] = legArray[i].stopLossValue;
                //     }
                //     if (data['waitTrade'] && legArray[i]['waitTrade'] !== -1) {
                //         data.legs[i]['waitTradeType'] = legArray[i].waitTradeType;
                //         data.legs[i]['waitTrade'] = legArray[i].waitTrade;
                //     }
                // }
                data=preProcessData(data);
            }
            if (activeBroker === null) {
                alert("Broker is required select broker")
                return;
            }
            if (!validation()) {
                return;
            }
            delete data['orders']
            delete data['pnl']
            data['broker'] = activeBroker;
            console.log(data, 'data');
            const token = secureLocalStorage.getItem('token');
            let config:any={}
        
            if(data['status']!='Placed'){
                config         = { url: `${EXECUTE_STRATEGY}`, data: data, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            }else{
                config = { url: `${UPDATE_RUNNING_STRATEGY}`, data: data, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            }            //        console.log(config,'config')
            //        console.log(token)
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

    const getAllConstant = async () => {
        try {
            const token = secureLocalStorage.getItem('token');
            const config: any = { url: `${GET_ALL_CONSTANT}`, method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            const response = await axios(config); // Replace with your API endpoint
            setConstant(response.data.data);
            setExchangeList(response.data.data.exchanges);
            setScriptList(response.data.data.scripts);
            setVarieties(response.data.data.varieties);
            setOrderType(response.data.data.orderTypes);
            setSegmentList(response.data.data.segments);
            setProductType(response.data.data.productType);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
            } else {
                toast.error(extractErrorMessage(error));
            }
            console.error('Error fetching data:', error);
        }
    }

    const updateLeg=(strategy:any,data:any)=>{
        let legDetail = []

        for (let i = 0; i < data.length; i++) {
            let leg: any = data[i];
            leg["positionNo"] = i + 1;

            if (data[i].lotSize > 0) {
                leg["lotSize"] = data[i].lotSize;
            } else {
                leg["lotSize"] = 1;
            }
            leg["entryChoice"] = data[i].entryChoice;

            if (data[i].entryChoice == 'ATM_PERCENTAGE')
                leg["atmPercent"] = data[i].atmPercent;
            else if (data[i].entryChoice == 'ATM_POINT')
                leg["atmPoint"] = data[i].atmPoint;
            else if (data[i].entryChoice == 'CP') {
                leg["closestPremium"] = data[i].closestPremium;
                leg['closestPremiumChoice'] = data[i].closestPremiumChoice
            }
            else if (data[i].entryChoice == 'CP_STRADDLE') {
                leg['closestPremiumOnStraddle'] = data[i].closestPremiumOnStraddle
                leg['closestPremiumChoice'] = 'NA'
            }

            // for stoploss only
            if (data[i].stopLossChoice=='NA') {
                leg['stopLossChoice'] = 'SL_POINT'
            }

            // for leg target profit
            if (data[i].targetType !== 'NA') {
                leg['targetType'] = 'PERCENT';
            }


            if (!data[i].trailLossChoice) {
                leg['trailLossChoice'] = false;
                leg['trailLossType'] ='POINT'
                leg['trailProfit'] = 10;
                leg['trailStoploss'] = 10;
            }

            if (waitTrade && data[i].waitTrade !== -1) {
                leg['waitTradeType'] = 'POINT'
                leg['waitTrade'] = 10;
            }
            
            console.log(data[i].reEntryExecuteTimes,'reEntryExecuteTimes')
            if (data[i].reEntryExecuteTimes == -1) {
                leg['reEntryExecuteTimes'] = '4';
                leg['reEntryExecuteChoice'] = 'RE_EXECUTE'
                leg['reEntryDependency'] = 'SL_TP';
            }

            // range BreakOut
            if (strategy?.rangeBreakOut) {
                leg['rangeBreakoutEntry'] = data[i].rangeBreakoutEntry;
                leg['rangeBreakoutType'] = data[i].rangeBreakoutType
            }

            leg['variation'] = 1
            if (scripts.value == 'SENSEX') {
                leg['segmentType'] = segmentList[segmentList.length - 1];
            } else {
                leg['segmentType'] = segmentList[0];
            }

            leg['expiry']=data[i].expiry;  // expiry of any leg(order)
            
            leg['legType']=data[i].legType;
            legDetail.push(leg);
        }
        setLegArray(legDetail);
    }

    const setStrategy = (s: any) => {
        console.log(s, 'strategy');
        status(s.broker);
        setBrokerDetail(s.broker);
        setProduct(s.productType);
        setStartTime(s.startTime);
        setEndTime(s.endTime);
        updateStartHour(s?.startTime[0]+s?.startTime[1]);
        updateEndHour(s?.endTime[0]+s?.endTime[1]);
        updateStartMinutes(s?.startTime[3]+s?.startTime[4]);
        updateEndMinutes(s?.endTime[3]+s?.endTime[4]); 
        s?.rangeBreakOut && updateRangeEndHour(s?.rangeEndTime[0]+s?.rangeEndTime[1]);
        s?.rangeBreakOut && updateRangeEndMinutes(s?.rangeEndTime[3]+s?.rangeEndTime[4]);     
        //        setClientId()// TODO
        setScripts(s.script);
        setExpiry(s.expiryType);
        setExchange(s.exchange);
        setMarketOrder(s.orderType);
        setVariety(s.variety);
        setValidity(s.validity);
        setChoice(s.strategyChoice);
        //        setReExecuteTimes(s.) TODO
        setWaitTrade(s.waitTrade);
        setReEntry(s.reEntryExecute);
        setMoveSlToCost(s.moveSlToCost);
        setProtectProfit(s.protectProfit);
        setRangeBreakOut(s.rangeBreakOut);
        console.log(s.rangeBreakOut, 'reajhksfjhksf', s)
        setTargetChoice(s.targetChoice);
        if(s.targetChoice){ setTarget(s.target); }
        setStoplossChoice(s.stoplossChoice);
        if(s.stoplossChoice){ setStoploss(s.stoploss); }
        //        setExpiryDate() TODO
        setExpiryType(s.expiryType);
        setProtectProfitChoice(s.protectProfitChoice);
        setProfitReaches(s.profitReaches);
        setLockMinimumProfit(s.lockMinimumProfit);
        setIncreaseProfit(s.increaseProfit);
        setTrailProfit(s.trailProfit);
        
        setLegQuantity(s.legs.length);
        !disabled && updateLeg(s,s.legs);
        disabled && setLegArray(s.legs);
        setStrategyName(s.strategyName);
        if (s.reEntryExecute && choice == 'STRATEGY' && s.legs.length > 0) {
            setReExecuteTimes(s.legs[0]['reEntryExecuteTimes']);
        }
        setActiveBroker(s.broker);
        if(s.status=="Terminated & Squared Off" || s.terminateAlgo || s.terminateStrategy ){
            setTerminateAlgo(true);
            setTerminateStrategy(true);
        }else{
            setTerminateAlgo(s.terminateAlgo);
            setTerminateStrategy(s.terminateStrategy);
        }
        let day = [...days];
        day[s?.day] = true
        console.log(day, s?.day, 'all the days of this strategy');
        setDays(day);
    }
    useEffect(() => {
        if (props.data) {
            setStrategy(props.data);
        }
        const today = new Date().getDay();
        setTodayDay(today);
        getAllConstant();
    }, [])
    return (
        <>
            <div className=''>
                {/* Strategy Box */}
                <div className="flex flex-col  p-2 m-1 rounded">
                    {/* Day and API Status */}
                    <div className="flex flex-row flex-wrap gap-2">
                        <div className="flex flex-row flex-wrap gap-2">
                            {entryDay.map((item: any, index: number) => (
                                <div className={`${days[item?.value] ? 'bg-[#0c8ff2]' : 'bg-[#a4d2f5]'} text-white px-2 shadow-lg rounded-md h-8 flex items-center justify-center text-[12px]`}>{item?.name}</div>
                            ))}
                        </div>
                        <div className="flex justify-end flex-grow mt-4 mr-5 sm:mt-0">
                            <div className="flex flex-wrap gap-2 text-lg">
                                <div className={`${apiStatus?.order ? 'bg-green-500' : 'bg-red-400'} text-white rounded-lg border-solid p-1 px-2 text-[12px]`}>{brokerDetail?.broker?.brokerName} API: {apiStatus?.order ? 'Running' : 'Not Running'}</div>
                                <div className={`${apiStatus?.market ? 'bg-green-500' : 'bg-red-400'} text-white rounded-lg border-solid p-1 px-2 text-[12px]`}>Live Feed: {apiStatus?.market ? 'Running' : 'Not Running'}</div>
                                <div className={`${!terminateAlgo ? 'bg-green-500' : 'bg-red-400'} text-white rounded-lg border-solid p-1 px-2 text-[12px]`}>Algo: {!terminateAlgo ? 'Running' : 'Not Running'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Main Result */}
                    <Main validity={validity} setValidity={setValidity} exchangeList={exchangeList} productType={productType} orderType={orderType} scriptList={scriptList} varieties={varieties} product={product} setProduct={setProduct} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                        clientId={clientId} setClientId={setClientId}
                        expiryDate={expiryType} setExpiryType={setExpiryType}
                        scripts={scripts} setScripts={setScripts} expiry={expiry} setExpiry={setExpiry} exchange={exchange} setExchange={setExchange} marketOrder={marketOrder} setMarketOrder={setMarketOrder}
                        variety={variety} setVariety={setVariety} mutation={mutation} setMutation={setMutation} legQuantity={legQuantity} setLegQuantity={setLegQuantity} activeBroker={activeBroker} setActiveBroker={setActiveBroker} brokers={brokers} />
                    <div className='flex text-center flex-wrap  justify-center gap-4 m-2'>
                        <div className='flex flex-row gap-2'>
                            <input type="checkbox" className='mt-1 h-4 w-4' disabled={disabled} checked={choice == 'STRATEGY'} onChange={() => { setChoice(choice == 'STRATEGY' ? 'LEG' : 'STRATEGY'); }} />
                            <div className='flex flex-row text-[14px]'>SquareOff All Leg<div data-tooltip-id="my-tooltip" data-tooltip-content="If either the Stop Loss or Target Profit conditions are met, only that specific position will be automatically closed.."><IoInformationCircleOutline className="text-[#0096FF] text-xl mt-1" /></div></div>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <input type="checkbox" className='mt-1 h-4 w-4' disabled={disabled} checked={choice == 'LEG'} onChange={() => { setChoice(choice == 'STRATEGY' ? 'LEG' : 'STRATEGY'); }} />
                            <div className='flex flex-row text-[14px]'>SquareOff One Leg<div data-tooltip-id="my-tooltip" data-tooltip-content="If either the Stop Loss or Target Profit conditions for any position are met, the entire strategy will be automatically closed."><IoInformationCircleOutline className="text-[#0096FF] text-xl mt-1" /></div></div>
                        </div>
                    </div>

                    {/* Choice want to go in which way,strategy based or leg based*/}
                    <LegBased choice={choice} targetChoice={targetChoice} setTargetChoice={setTargetChoice} stoplossChoice={stoplossChoice} setStoplossChoice={setStoplossChoice} waitTrade={waitTrade} setWaitTrade={setWaitTrade} protectProfit={protectProfit} setProtectProfit={setProtectProfit} rangeBreakOut={rangeBreakOut}
                        setRangeBreakOut={setRangeBreakOut} target={target} setTarget={setTarget} stoploss={stoploss} setStoploss={setStoploss} expiryDate={expiryDate} setExpiryDate={setExpiryDate} reEntry={reEntry} setReEntry={setReEntry} reExecuteTimes={reExecuteTimes} setReExecuteTimes={setReExecuteTimes} moveSlToCost={moveSlToCost}
                        setMoveSlToCost={setMoveSlToCost} />


                    {/* Mutation */}
                    {mutation === true && <Mutation comparison={comparison} setComparison={setComparison} value={value} setValue={setValue} quantity={quantity} setQuantity={setQuantity} />}

                    {/* Legs Boxes */}
                    <Leg setMessage={setMessage} scripts={scripts} setScripts={setScripts} scriptList={scriptList} product={product} exchange={exchange}
                        setExchange={setExchange} choice={choice} reEntry={reEntry} waitTrade={waitTrade} legQuantity={legQuantity} setLegQuantity={setLegQuantity}
                        legArray={legArray} setLegArray={setLegArray} strategyName={strategyName} setStrategyName={setStrategyName} rangeBreakOut={rangeBreakOut} />

                    {/* Advanced Setting */}
                    {reEntry && <AdvancedSetting reExecuteMethod={reExecuteMethod} setReExecuteMethod={setReExecuteMethod}/>}


                    <DateTime rangeBreakOut={rangeBreakOut} />

                    <div className="flex flex-row gap-4 bg-white p-2 m-1 border-[1px] rounded-lg">
                        {/* Protect Profit */}
                        {protectProfit && <ProtectProfit protectProfit={protectProfit} setProtectProfit={setProtectProfit} protectProfitChoice={protectProfitChoice} setProtectProfitChoice={setProtectProfitChoice}
                            profitReaches={profitReaches} setProfitReaches={setProfitReaches} lockMinimumProfit={lockMinimumProfit} setLockMinimumProfit={setLockMinimumProfit} increaseProfit={increaseProfit}
                            setIncreaseProfit={setIncreaseProfit} trailProfit={trailProfit} setTrailProfit={setTrailProfit} />}
                    </div>
                </div>

                 {/* Button for Execute Task */}
                 {todayDay !== props.day && <div className="flex flex-col sm:flex-row justify-between items-center ml-5 mb-2 mt-2">
                    <div className="flex flex-wrap justify-start gap-2">
                        <button
                            className="rounded-md border-solid p-1 px-2 text-center text-[12px] cursor-pointer bg-[#2D5BFF] text-white"
                            onClick={() => { setshowstrategy(true); setCurrentStatus('modify'); }}
                        >
                            Modify Strategy
                        </button></div></div>}

                {todayDay == props.day && <div className="flex flex-col sm:flex-row justify-between items-center ml-5 mb-2 mt-2">
                    <div className="flex flex-wrap justify-start gap-2">
                        <button disabled={props.data.status=='Completed'}
                            className={`rounded-md border-solid p-1 px-2 text-center text-[12px] cursor-pointer ${props.data.status=='Completed'?'bg-gray-300':'bg-[#2D5BFF]'} text-white`}
                            onClick={() => { setshowstrategy(true); setCurrentStatus('modify'); }}
                        >
                            Modify Strategy
                        </button>
                        {(props.data?.status=='Placed' || props.data?.status=='Partial') && <button disabled={props.data.status=='Completed'||props.data.status=='Terminated & Squared Off'}
                            className={`rounded-md border-solid p-1 px-2 text-center text-[12px] cursor-pointer ${props.data.status=='Completed'?'bg-gray-300': 'bg-blue-400'} text-white`}
                            onClick={() => { setshowstrategy(true); setCurrentStatus('terminateStrategy'); }}
                        >
                            SquareOff All Position & Terminate Algo
                        </button>}
                        {(props.data?.status=='Placed' || props.data?.status=='Partial') && <button disabled={props.data.status=='Completed'||props.data.status=='Terminated & Squared Off'}
                            className={`rounded-md border-solid p-1 px-2 text-center text-[12px] cursor-pointer ${props.data.status=='Completed'?'bg-gray-300': 'bg-blue-500'} text-white`}
                            onClick={() => { setshowstrategy(true); setCurrentStatus('terminateAlgo'); }}
                        >
                            Terminate Algo
                        </button>}
                        {!(props.data?.status=='Placed' || props.data?.status=='Partial') && <button
                            className="rounded-md border-solid p-1 px-2 text-center text-[12px] cursor-pointer bg-gray-300 text-white"
                        >
                            SquareOff All Position & Terminate Algo
                        </button>}
                        {!(props.data?.status=='Placed' || props.data?.status=='Partial') && <button
                            className="rounded-md border-solid p-1 px-2 text-center text-[12px] cursor-pointer bg-gray-300 text-white"
                        >
                            Terminate Algo
                        </button>}

                    </div>

                </div>}

                {/* Error or Successfull Message Shown Here!!  */}
                {showMessage && <div className='flex text-center justify-center'><div className='bg-yellow-400 p-1 text-blue-600 text-center w-[360px]'>{message}</div></div>}

            </div>

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
                    <div className='text-[14px] font-semibold mt-5 mb-5 p-2'>Are you sure want to {currentStatus} the strategy?</div>

                    <div className="flex justify-end gap-2 text-[14px] bg-gray-300 p-2">
                        <button className="p-1 h-8 w-16 bg-[#2D5BFF] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={modifyStrategy}> YES</button>
                        <button className="p-1 w-20 h-8 bg-white border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => setshowstrategy(false)} > CANCEL </button>
                    </div>
                </div>
            </Dialog>
            <Tooltip id="my-tooltip" style={{ width: '300px', borderRadius: '10px', backgroundColor: 'rgb(147 197 253)', color: 'black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }} />

        </>
    );
}


export default Input;
