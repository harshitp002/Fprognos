import { useState, useEffect } from 'react'
import axios from 'axios';
import { Dialog } from "@mui/material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import secureLocalStorage from "react-secure-storage";
//component
import { CREATE_NEW_STRATEGY, EXECUTE_STRATEGY, GET_ALL_CONSTANT, GET_ALL_STRATEGY, PROFILE_DETAIL } from './../../constant/Constant';
import ProtectProfit from './ProtectProfit';
import Mutation from './Mutation';
import Leg from './Leg'
import Main from './Main'
import Navbar from './../Layout/Navbar';
import LegBased from './LegBased';
//icon
import { IoMdClose } from "react-icons/io";
import Top from './Top';
// interface
import { Legs, input, } from './../Interface/OrderItem'
import { Tooltip } from 'react-tooltip';
import { Link, useNavigate } from "react-router-dom";
import { extractErrorMessage } from '../Utility/Utils';
import DateTime from './DateTime';
import useDashboardStore from '../../store/dashboardStore';
import useInputStore from '../../store/inputStore';
import { FaArrowRight } from "react-icons/fa";
import { Audio } from 'react-loader-spinner';
import useBrokerStore from '../../store/brokerStore';
import Disclaimer from './Disclaimer'
import DateTimeMcx from './DateTimeMcx';
import AdvancedSetting from './AdvancedSetting';
import { IoInformationCircleOutline } from "react-icons/io5";


function Input() {
    //Main.jsx
    const navigate = useNavigate();
    const [product, setProduct] = useState('INTRADAY')
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
    const [choice, setChoice] = useState("LEG");
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
    const [showstrategy, setshowstrategy] = useState(false);
    // savedStrategy detail
    const [savedstrategies, setSavedStrategies] = useState<any[]>([])
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
    const { updateDisabled } = useDashboardStore();
    const { startHour, endHour, startMinutes, endMinutes, rangeEndHour, rangeEndMinutes, entryDay, updateEntryDay } = useInputStore();
    const [id, setId] = useState(null);
    // day
    const [day, setDay] = useState([false, false, false, false, false, false, false]);
    // loading
    const [loading, setLoading] = useState(false);
    // broker
    const { updateBroker } = useBrokerStore();
    // update strategy
    const [updateStrategy, setUpdateStrategy] = useState(false);
    // terms and condition
    const [accepted, setAccepted] = useState(true);
    // Re-Execute Method 
    const [reExecuteMethod, setReExecuteMethod] = useState("LTP");

    const getBrokerDetails = () => {
        const token = secureLocalStorage.getItem('token');
        console.log(token)
        const url = `${PROFILE_DETAIL}?brokersOnly=true`
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        axios.request(config)
            .then((response) => {
                setBrokers(response.data.data.brokers);
                updateBroker(response?.data?.data?.brokers);
                console.log(response);
            })
            .catch((error) => {
                if (error?.response?.status === 401) {
                    navigate('/login');
                } else {
                    toast.error(extractErrorMessage(error));
                }
                console.error('Error at get broker details:', error);
            });
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = await secureLocalStorage.getItem('token');
            if (!token) {
                // Redirect to login page if token is not present
                navigate("/login");
            }
            getBrokerDetails();
        };
        checkToken();
    }, []);

    useEffect(() => {
        message?.length > 0 && setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            setMessage("");
        }, 3000);
    }, [message])

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
        if (activeBroker == null || activeBroker=='-1') {
            toast.warn('Active Broker is required!!');
            setMessage("Active Broker is required!!");
            return false;
        }
        // Minimum select one day.
        let check_day = day.filter((item) => item == true);
        if (check_day.length == 0) {
            toast.warn('Minimum select one day!!.');
            setMessage("Minimum select one day!!.");
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
            if (rangeBreakOut && legArray[i]['rangeBreakoutType'] == '-1') {
                toast.warn('Please select range breakout type.');
                setMessage('Please select range breakout type.');
                return false;
            }
            if (legArray[i]['entryChoice'] == 'CP' && (legArray[i]['closestPremium'] == null || legArray[i]['closestPremium'] == undefined || isNaN(legArray[i]['closestPremium']))) {
                toast.warn('Please enter the value of closest premium.');
                setMessage('Please enter the value of closest premium.');
                return false;
            }
            if (isNaN(legArray[i]['target']) || legArray[i]['target'] == 0) {
                toast.warn('Target must be greater than 0');
                setMessage('Target must be greater than 0');
                return false;
            }
            if (isNaN(legArray[i]['stopLossValue']) || legArray[i]['stopLossValue'] == 0) {
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
            if(legArray[i]['legType']=='OPTION'){
                if (legArray[i]['entryChoice'] == 'ATM_POINT') {
                    key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['atmPoint'];
                } else if (legArray[i]['entryChoice'] == 'ATM_PERCENT') {
                    key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['atmPercent'];
                } else if (legArray[i]['entryChoice'] == 'CP') {
                    key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['closestPremium'] + legArray[i]['closestPremiumChoice'];
                } else if (legArray[i]['entryChoice'] == 'CP_STRADDLE') {
                    key = legArray[i]['entryChoice'] + legArray[i]['actionType'] + legArray[i]['optionType'] + legArray[i]['closestPremium'] + legArray[i]['closestPremiumChoice'];
                }
            }

            strategy[key] = strategy[key] ? strategy[key] + 1 : 1;
            if (strategy[key] > 1 && key!=='') {
                console.log(strategy,legArray,'can not place same type of order')
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

    const preProcessData = () => {
        let mainDetail: any = {}

        mainDetail['client'] = clientId;
        mainDetail['productType'] = product;
        // mainDetail['startTime'] = startTime;
        // mainDetail['endTime'] = endTime;
        mainDetail['startTime'] = startHour + ":" + startMinutes;
        mainDetail['endTime'] = endHour + ":" + endMinutes;
        mainDetail['startDate'] = startDate;
        mainDetail['endDate'] = endDate;
        mainDetail['script'] = scripts;
        //        mainDetail['expiry']="2024-04-21";    // TODO : field required for requirement of listing all expiry
        mainDetail['expiryType'] = expiryType;
        mainDetail['exchange'] = exchange;
        mainDetail['orderType'] = marketOrder;
        mainDetail['variety'] = variety;
        mainDetail['placed'] = false;
        mainDetail['status'] = "Unplaced";
        mainDetail['mutation'] = false;
        mainDetail['strategyChoice'] = choice;
        mainDetail['validity'] = validity;
        // strategy name
        mainDetail['strategyName'] = strategyName;

        if (rangeBreakOut) {
            mainDetail['rangeBreakOut'] = rangeBreakOut;
            mainDetail['rangeStartTime'] = startHour + ':' + startMinutes;
            mainDetail['rangeEndTime'] = rangeEndHour + ':' + rangeEndMinutes;
        }
        if (stoplossChoice) {
            mainDetail['stoplossChoice'] = stoplossChoice;
            mainDetail['stoploss'] = stoploss;
        }
        if (targetChoice) {
            mainDetail['targetChoice'] = targetChoice;
            mainDetail['target'] = target;
        }
        if (reEntry) {
            mainDetail['reEntryExecute'] = reEntry;
        }
        if (protectProfit) {
            mainDetail['protectProfit'] = protectProfit;
            mainDetail['protectProfitChoice'] = protectProfitChoice;
            if (protectProfitChoice === 'lockMinimumProfit') {
                mainDetail['profitReaches'] = profitReaches;
                mainDetail['lockMinimumProfit'] = lockMinimumProfit;
            } else if (protectProfitChoice === 'trailProfit') {
                mainDetail['increaseProfit'] = increaseProfit;
                mainDetail['trailProfit'] = trailProfit;
            }
            else {
                mainDetail['profitReaches'] = profitReaches;
                mainDetail['lockMinimumProfit'] = lockMinimumProfit;
                mainDetail['increaseProfit'] = increaseProfit;
                mainDetail['trailProfit'] = trailProfit;
            }
        }

        if (waitTrade)
            mainDetail['waitTrade'] = waitTrade;

        if (choice == 'LEG' && moveSlToCost)
            mainDetail['moveSlToCost'] = moveSlToCost;

        // Re-Execute Method
        mainDetail['reExecuteType']=reExecuteMethod;

        // check all leg action is same or not
        for (let i = 1; i < legArray.length; i++) {
            if (legArray[i].actionType != legArray[i - 1].actionType) {
                mainDetail['moveSlToCost'] = false;
                break;
            }
        }

        let legDetail = []

        for (let i = 0; i < legArray.length; i++) {
            let leg: any = {}
            leg["positionNo"] = i + 1;

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
            leg['legType']=legArray[i].legType;
            legDetail.push(leg);
        }
        mainDetail['legs'] = legDetail;
        console.log(legDetail, 'leg')

        // day
        let entry = []
        for (let i = 0; i < entryDay.length; i++) {
            if (day[i]) {
                entry.push(entryDay[i]?.value);
            }
        }
        console.log(entry);
        mainDetail['days'] = entry;

        return mainDetail;
    }

    // For Saving Strategy
    const onHandleStrategies = async () => {
        try {
            setLoading(true);
            if (!validation()) {
                setLoading(false);
                return;
            }
            const data = preProcessData();
            data['broker'] = activeBroker;
            if (updateStrategy && id !== null) {
                data['id'] = id;
            }
            console.log(data, 'after preprocess data')
            const token = secureLocalStorage.getItem('token');
            console.log(token, "token");
            const config: any = { url: `${CREATE_NEW_STRATEGY}`, data: data, method: 'post', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            const response = await axios(config); // Replace with your API endpoint
            console.log(response, 'response');
            setId(response.data.data.id);
            setshowstrategy(false);
            updateStrategy && setUpdateStrategy(false);
            let strategy: any = response?.data?.data;
            console.log(strategy, 'strategy')
            setSavedStrategies((prev: any[]) => [...prev, strategy]);
            setMessage('Strategy Saved Successfully.');
            toast.success('Strategy Saved Successfully.');
            setLoading(false);
            navigate('/strategy');
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
            } else if (error?.response?.status === 409) {
                toast.error(error?.response?.data?.data);
            } else {
                toast.error(extractErrorMessage(error));
            }
            setshowstrategy(false);
            console.error('Error fetching data:', error);
            console.log("Error at save strategy", error);
            setLoading(false);
        }
    }



    const getAllConstant = async () => {
        try {
            const token = secureLocalStorage.getItem('token');
            const config: any = { url: `${GET_ALL_CONSTANT}`, method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            const response = await axios(config); // Replace with your API endpoint
            console.log(response, 'get all constant');
            setConstant(response.data.data);
            setExchangeList(response.data.data.exchanges);
            setScriptList(response.data.data.scripts);
            setVarieties(response.data.data.varieties);
            setOrderType(response.data.data.orderTypes);
            setSegmentList(response.data.data.segments);
            setProductType(response.data.data.productType);
            updateEntryDay(response.data.data.days);
            response?.data?.data?.scripts.length > 0 && setScripts(response.data.data.scripts[0])
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
            } else {
                toast.error(extractErrorMessage(error));
            }
        }
    }

    const getAllSavedStrategies = async () => {
        try {
            const token = secureLocalStorage.getItem('token');
            const config: any = { url: `${GET_ALL_STRATEGY}`, method: 'get', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } } // Use correct header field name ,
            console.log(config, 'config')
            const response = await axios(config); // Replace with your API endpoint
            setSavedStrategies(response.data.data);
            console.log(response?.data?.data, 'saved strategy');
            //            setAllSavedStrategy(response.data.data);
        } catch (error: any) {
            if (error?.response?.status === 401) {
                navigate('/login');
            } else {
                toast.error(extractErrorMessage(error));
            }
            //  setAllSavedStrategy(response.data.data);
            console.error('Error fetching data:', error);
        }
    }

    // Function to set current date and time
    const setCurrentDateTime = () => {
        const currentDate = new Date();


        // Format time as HH:mm
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}`;


        // Format date as YYYY-MM-DD
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const currentDateStr = `${year}-${month}-${day}`;


        // Set state
        setStartTime(currentTime);
        setEndTime("15:20");
        setStartDate(currentDateStr);
        setEndDate(currentDateStr);
    };


    // Call setCurrentDateTime when component mounts
    useEffect(() => {
        setCurrentDateTime();
    }, []);


    // clientId at the starting
    useEffect(() => {
        const id: any = secureLocalStorage.getItem('id')
        const client_id: any = secureLocalStorage.getItem('clientId')
        setClientId({ "id": id, "client_id": client_id })
        getAllConstant();
        getAllSavedStrategies();
        updateDisabled(false);
    }, [])

    const setStrategy = (s: any) => {
        setProduct(s.productType);
        setStartTime(s.startTime)
        setEndTime(s.endTime)
        setStartDate(s.startDate)
        setStrategyName(s.strategyName);
        //        setClientId()// TODO
        //        setClientId()// TODO
        let symbol = scriptList.filter((item) => item.value == s.script.value)
        symbol.length>0 && setScripts(symbol[0]);
        setExpiry(s.expiryType);
        setExchange(s.exchange);
        setMarketOrder(s.orderType);
        setVariety(s.variety);
        setValidity(s.validity);
        setChoice(s.strategyChoice);
        //        setReExecuteTimes(s.) TODO
        //        setReExecuteTimes(s.) TODO
        setWaitTrade(s.waitTrade);
        setReEntry(s.reEntryExecute);
        setMoveSlToCost(s.moveSlToCost);
        setProtectProfit(s.protectProfit);
        setRangeBreakOut(s.rangeBreakOut);
        setTargetChoice(s.targetChoice);
        setTarget(s.target);
        setStoplossChoice(s.stoplossChoice);
        setStoploss(s.stoploss);
        //        setExpiryDate() TODO
        //        setExpiryDate() TODO
        setExpiryType(s.expiryType);
        setProtectProfitChoice(s.protectProfitChoice);
        setProfitReaches(s.profitReaches);
        setLockMinimumProfit(s.lockMinimumProfit);
        setIncreaseProfit(s.increaseProfit);
        setTrailProfit(s.trailProfit);
        setRangeStartTime(s.rangeStartTime);
        setRangeEndTime(s.rangeEndTime);
        setLegQuantity(s.legs.length);
        setLegArray(s.legs);
        setRangeBreakOut(s.rangeBreakOut);
        setReExecuteMethod(s.reExecuteType);
        setId(s.id);
        if (s.reEntryExecute && choice == 'STRATEGY' && s.legs.length > 0) {
            setReExecuteTimes(s.legs[0]['reEntryExecuteTimes']);
        }
        if (s.days) {
            let current_day = [false, false, false, false, false, false, false];
            for (let i = 0; i < s.days.length; i++) {
                current_day[s.days[i] - 1] = true;
            }
            console.log(current_day, 'current day');
            setDay(current_day);
        }
    }
    return (
        <>  <div className='min-h-screen '>
            <div className="fixed top-0 w-full z-20 flex-col shadow-lg">
                <Navbar />
                <Top savedstrategies={savedstrategies} setStrategy={setStrategy} />
            </div>


            <div className='pt-28 text-black'>
                {/* Strategy Box */}
                <div className="flex flex-col  p-2 m-1 rounded">


                    {/* Main Result */}
                    <Main validity={validity} setValidity={setValidity} exchangeList={exchangeList} productType={productType} orderType={orderType} scriptList={scriptList} varieties={varieties} product={product} setProduct={setProduct} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                        clientId={clientId} setClientId={setClientId}
                        expiryDate={expiryType} setExpiryType={setExpiryType}
                        scripts={scripts} setScripts={setScripts} expiry={expiry} setExpiry={setExpiry} exchange={exchange} setExchange={setExchange} marketOrder={marketOrder} setMarketOrder={setMarketOrder}
                        variety={variety} setVariety={setVariety} mutation={mutation} setMutation={setMutation} legQuantity={legQuantity} setLegQuantity={setLegQuantity} activeBroker={activeBroker} setActiveBroker={setActiveBroker} brokers={brokers} />
                    <div className='flex text-center flex-wrap  justify-center gap-4 m-2'>
                        <div className='flex flex-row gap-2'>
                            <input type="checkbox" className='mt-1 h-4 w-4' checked={choice == 'STRATEGY'} onChange={() => { setChoice(choice == 'STRATEGY' ? 'LEG' : 'STRATEGY'); }} />
                            <div className='flex flex-row text-[14px]'>SquareOff All Leg<div data-tooltip-id="my-tooltip" data-tooltip-content="If either the Stop Loss or Target Profit conditions are met, only that specific position will be automatically closed.."><IoInformationCircleOutline className="text-[#0096FF] text-xl mt-1" /></div></div>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <input type="checkbox" className='mt-1 h-4 w-4' checked={choice == 'LEG'} onChange={() => { setChoice(choice == 'STRATEGY' ? 'LEG' : 'STRATEGY'); }} />
                            <div className='flex flex-row text-[14px]'>SquareOff One Leg<div data-tooltip-id="my-tooltip" data-tooltip-content="If either the Stop Loss or Target Profit conditions for any position are met, the entire strategy will be automatically closed."><IoInformationCircleOutline className="text-[#0096FF] text-xl mt-1" /></div></div>
                        </div>
                    </div>


                    {/* For both choice :: a) SquareOffOneLeg  b) SquareOffAllLeg */}
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

                    <div className="flex flex-row gap-4 p-2 m-1 border-[1px] rounded-lg">
                        {/* Protect Profit */}
                        {protectProfit && <ProtectProfit protectProfit={protectProfit} setProtectProfit={setProtectProfit} protectProfitChoice={protectProfitChoice} setProtectProfitChoice={setProtectProfitChoice}
                            profitReaches={profitReaches} setProfitReaches={setProfitReaches} lockMinimumProfit={lockMinimumProfit} setLockMinimumProfit={setLockMinimumProfit} increaseProfit={increaseProfit}
                            setIncreaseProfit={setIncreaseProfit} trailProfit={trailProfit} setTrailProfit={setTrailProfit} />}

                        {/* Button for Execute Task */}
                        <div className="text-center flex justify-start ml-5 mb-10 mt-8">
                            <button className="rounded-md text-[14px] border-solid p-1 pl-4 gap-2 flex flex-row text-center text-l m-2 cursor-pointer bg-[#2D5BFF] text-white w-48" onClick={() => { setshowstrategy(true); }}>
                                Save&nbsp;Strategy&nbsp;Now <FaArrowRight className='mt-1' />
                            </button>
                        </div>
                    </div>
                </div>


                {/* Error or Successfull Message Shown Here!!  */}
                {showMessage && <div className='flex text-center justify-center'><div className='bg-yellow-400 p-1 text-blue-600 text-center w-[360px]'>{message}</div></div>}

            </div>

            {/* Dialog Box for Save Strategy */}

            <Dialog open={showstrategy} onClose={(event, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setshowstrategy(false)
                }
            }} sx={{ borderRadius: "10px" }}>
                <div className="bg-white rounded-lg shadow-lg text-[14px]">
                    <div className="flex flex-row items-center justify-between mb-4 bg-blue-400 text-white p-1">
                        <div className="text-white text-[16px] font-semibold p-1">Save Strategy</div>
                        <div className="h-[24px] w-[24px] text-white flex items-center justify-center cursor-pointer">
                            <IoMdClose className='text-2xl font-semibold' onClick={() => setshowstrategy(false)} />
                        </div>
                    </div>
                    <h1></h1>

                    <div className="mb-1 p-2">
                        <label className="block text-[14px] font-semibold mb-1">Day</label>
                        <div className="grid grid-cols-5 gap-2">
                            {entryDay.map((item: any, index: number) => (
                                <button key={index} className="text-white px-2 shadow-lg rounded-md h-8 flex items-center justify-center" style={{ backgroundColor: day[index] ? '#0c8ff2' : '#a4d2f5' }} onClick={() => { setDay((prev: any) => { let input = [...prev]; input[index] = !input[index]; console.log(input); return input; }) }}>{item?.name}</button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-1 p-2">
                        <label className="block text-[14px] font-semibold mb-1">Strategy Name</label>
                        <input type="text" value={strategyName} onChange={(e: any) => { setStrategyName(e.target.value); }} className=' border-[1px] border-gray-400 rounded outline-0 p-1 w-full bg-[#F8F8F8]' />
                    </div>
                    <div className="mb-1 p-2">
                        <label className="block text-[14px] font-semibold mb-1">Broker</label>
                        <select className=' border-[1px] border-gray-400 rounded outline-0 p-1 w-full bg-[#F8F8F8]' value={JSON.stringify(activeBroker)} onChange={(e) => { console.log(e.target.value); setActiveBroker(JSON.parse(e.target.value)) }}>
                            <option value={-1}>SELECT BROKER</option>
                            {
                                brokers && brokers.map((item: any) => {
                                    return (
                                        <option value={JSON.stringify(item)} key={`broker-${item?.id}`}>{item?.broker?.brokerName}&nbsp;-&nbsp;{item?.brokerClientId}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {showMessage && <div className='text-center text-sm text-red-600'>{message}</div>}
                </div>
                <div className="flex justify-end gap-2 bg-gray-300 p-2">
                    {!loading && <button className="p-1 w-16 text-[14px] bg-[#2D5BFF] rounded-lg text-white cursor-pointer hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => { onHandleStrategies(); }}> Save </button>}
                    {loading && (
                        <div className='flex justify-center items-center border-2 rounded-md border-blue-500 w-32'> <Audio height="24" width="36" color="#1E3A8A" ariaLabel="loading" /> </div>)}
                    <button className="p-1 w-16 bg-white text-[14px] border-2 border-[#2D5BFF] rounded-lg text-[#2D5BFF] cursor-pointer hover:bg-[#e0f2fe] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setshowstrategy(false)} > Cancel </button>
                </div>
            </Dialog>

            {/* Dialog Box for open terms and condition */}
            <Disclaimer />

            <Tooltip id="my-tooltip" style={{ width: '300px', borderRadius: '10px', backgroundColor: 'rgb(147 197 253)', color: 'black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)' }} />
        </div>
        </>
    );
}


export default Input;
