//icon
import { MdClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { StraddlePremiumSeries, pointbanknifty, pointnifty, percentarray, point, short_name } from './Constant';
import { useEffect, useState } from 'react';
import { Dialog } from "@mui/material";
import useDashboardStore from '../../store/dashboardStore';
import { toast } from "react-toastify";


const Leg = (props: any) => {
    const [openTrailStoplossBox, setOpenTrailStoplossBox] = useState(false);
    const [currentKey, setCurrentKey] = useState<number>(0);
    const [trailProfit, setTrailProfit] = useState<number>();
    const [trailLoss, setTrailLoss] = useState<number>();
    const [trailType, setTrailType] = useState<string>('POINT');
    const { disabled } = useDashboardStore();
    const [scriptIndex, setScriptIndex] = useState<number>(0);
    const [segment,setSegment]=useState<string>("OPTION");

    const onHandleTrailSubmit = (key: number) => {
        if(trailProfit && trailLoss){
            setOpenTrailStoplossBox(false);
            const inputData = [...props.legArray];
            inputData[key]['trailLossType'] = trailType;
            inputData[key]['trailProfit'] = trailProfit;
            inputData[key]['trailStoploss'] = trailLoss;
            setTrailProfit(0);
            setTrailLoss(0);
            props.setLegArray(inputData);
        }else{
            toast.warn('Fill the required value.')
        }
      
    }

    const handleNumber = (event: React.ChangeEvent<HTMLInputElement>, state: string, key: number) => {
        const inputValue = event.target.value;
        // Regular expression to match numbers with optional decimal point
        const regex = /^(\d+\.?\d*|\.\d+)?$/;
        if (regex.test(inputValue) || inputValue === '') {
            const inputdata = JSON.parse(JSON.stringify(props.legArray));
            inputdata[key][state] = inputValue === '' ? null : inputValue;
            props.setLegArray(inputdata);
        }
    };


    const legData = {
        "lotSize": 1, "entryChoice": "ATM_POINT", "atmPoint": "0", "atmPercent": "0", "closestPremium": 100, "closestPremiumChoice": "~", "closestPremiumOnStraddle": "5%", "optionType": "CE", "actionType": "BUY", "script": 'NIFTY', "expiryType": 'WEEKLY',"expiry":null, "targetChoice": true, "targetType": "PERCENT", "target": -1,
        "stopLossChoice": "SL_PERCENT", "stopLossValue": -1, "trailLossChoice": false, "trailLossType": "POINT", "trailProfit": 10, "trailStoploss": 10, "reEntryExecuteChoice": "RE_EXECUTE", "reEntryExecuteTimes": -1, "reEntryDependency": 'SL', "waitTradeType": "WT_POINT_INCREMENT", "waitTrade": 10, "rangeBreakoutEntry": -1, "rangeBreakoutType": -1,
        "legType":"OPTION"
    }
    const [data,setData]=useState(legData);
	
	useEffect(()=>{
        let script = props.scriptList;
        script.length>0 && setData((prev) => { return { ...prev, // Preserve the existing properties of the object
            expiryType: script[0].scriptExpiries[0].expiryType, // Update the expiryType property
          };
      });
    },[props.scriptList])

    return (
        <>
            {/* Button for Add Leg in Strategy */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center mb-2 ml-2 mt-4 space-y-4 sm:space-y-0 sm:space-x-3 gap-2">
                {/* Strategy Name Input */}
                <div className="flex items-center space-x-3">
                    <input
                        type="text"
                        className="pl-3 pr-3 py-1 rounded-lg border text-[14px] h-[30px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-80 text-gray-800 text-base"
                        placeholder="Strategy Name (up to 40 characters)"
                        value={props.strategyName}
                        onChange={(e) => {
                            if (e.target.value.length < 40) props.setStrategyName(e.target.value);
                        }}
                    />
                </div>

                {/* Script Selection */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-3 text-[14px] h-[30px]">
                    <select
                        className="border border-gray-300 rounded-lg outline-none p-1 bg-gray-100 focus:ring-2 focus:ring-blue-500 text-gray-800 text-base w-52"
                        disabled={disabled}
                        value={JSON.stringify(props.scripts)}
                        onChange={(e) => {
                            props.setScripts(JSON.parse(e.target.value));
                            props.setExchange(JSON.parse(e.target.value)?.exchange);
                            let expiry=JSON.parse(e.target.value);
                            const updatedArr = [...props.legArray].map((item) => ({
                                ...item, // Copy other fields (if any)
                                expiry: expiry.scriptExpiries[0], // Update the expiry field
                                expiryType: item.legType=='OPTION'?expiry.scriptExpiries[0].expiryType:'MONTHLY'
                              }));
                            props.setLegArray(updatedArr);
                            data.legType=='OPTION' && setData((prev) => { return { ...prev, // Preserve the existing properties of the object
                                  expiryType: expiry.scriptExpiries[0].expiryType, // Update the expiryType property
                                };
                            });
                            data.legType=='FUTURE' && setData((prev) => { return { ...prev, // Preserve the existing properties of the object
                                expiryType: 'MONTHLY', // Update the expiryType property
                              };
                          });
                        }}>
                       
                        {props.scriptList
                            // .filter((temp:any) => temp.exchange.value === props.exchange.value)
//                            .filter((temp:any) => temp.exchange.value === props.exchange.value)
                            .map((item: any) => (
                                <option
                                className="text-gray-700"
                                key={`script-${item.id}`}
                                value={JSON.stringify(item)}
                            >
                                {item.value}
                            </option>
                        ))}
                    </select>

                    {/* Option/Future Selection */}
                    {/* <select className="border border-gray-300 rounded-lg outline-none p-1 bg-gray-100 focus:ring-2 focus:ring-blue-500 text-gray-800 text-base w-52" value={segment} onChange={(e:any)=>{
                        setSegment(e.target.value);
                        setData((prev) => { return { ...prev, // Preserve the existing properties of the object
                            expiryType: e.target.value=='OPTION'?props?.scripts?.scriptExpiries[0]?.expiryType:'MONTHLY', // Update the expiryType property
                          };
                      });}}>
                        <option className="text-gray-700" value="OPTION">Option</option>
                        <option className="text-gray-700" value="FUTURE">Future</option>
                    </select> */}
                    <div
                        className="cursor-pointer bg-blue-500 text-white flex justify-center items-center px-6 py-2 text-center rounded-lg shadow-md"
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            const value = segment === 'OPTION' ? 'FUTURE' : 'OPTION';
                            setSegment(value);

                            setData((prev) => ({
                            ...prev, // Preserve the existing properties of the object
                            expiryType: value === 'FUTURE' 
                                ? props?.scripts?.scriptExpiries?.[0]?.expiryType 
                                : 'MONTHLY', // Update the expiryType property
                            }));
                        }}
                        >
                        {segment}
                        </div>

                </div>

                {/* Add Leg Button */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-3">
                    <button
                        className="bg-blue-500 text-white rounded-lg px-5 py-1"
                        onClick={() => {
                            data['legType']=segment;
                            !disabled && props.setLegArray([...props.legArray, data]);
                            !disabled && props.setLegQuantity(props.legQuantity + 1);
                        }}
                    >
                        Add Leg
                    </button>
                </div>
            </div>



            <div className="rounded-lg border-[1px] m-1 font-serif overflow-auto p-2">
                <table className="table-auto w-full border-collapse">
                    <thead className="text-black">
                        <tr className='gap-2 border-[1px]'>
                            <th className="px-4 py-2 text-[14px] font-bold w-[125px] border-[1px]">Lot</th>
                            <th className="px-4 py-2 text-[14px] font-bold w-[195px] border-[1px]">Entry&nbsp;Choice</th>
                            <th className="px-4 py-2 text-[14px] font-bold w-[24px] border-[1px]">Action</th>
                            <th className="px-4 py-2 text-[14px] font-bold w-[24px] border-[1px]">Symbol</th>
                            <th className="px-4 py-2 text-[14px] font-bold w-[100px] border-[1px]">Expiry</th>
                            {props.rangeBreakOut && <th className="px-4 py-2 text-[14px] font-bold w-[100px] border-[1px]">RB&nbsp;Entry</th>}
                            {props.waitTrade && <th className="px-4 py-2 text-[14px] font-bold w-[140px] border-[1px]">Wait&nbsp;For&nbsp;Momentum</th>}
                            <th className="px-4 py-2 text-[14px] font-bold w-[180px] border-[1px]">Target</th>
                            <th className="px-4 py-2 text-[14px] font-bold w-[180px] border-[1px]">Stoploss</th>
                            <th className="px-4 py-2 text-[14px] font-bold w-[160px] border-[1px]">TrailStoploss</th>
                            {props.choice == 'LEG' && props.reEntry && <th className="px-4 py-2 text-[14px] font-bold w-[140px] border-[1px]">ReEntry</th>}
                            <th className="px-4 py-2 text-[14px] font-bold flex-grow border-[1px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.legArray.map((item: any, key: any) => {
                                return (
                                    <tr className="even:bg-gray-100 text-center justify-center text-[14px]" key={`leg-${key}`}>

                                        {/* Lot Size denotes 1 Lot,2 Lot,3 Lot */}
                                        <td><div className='flex flex-col gap-1 m-1'>
                                            <div className="flex flex-row gap-1">
                                                <input type="text" disabled={disabled} className='border text-center border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[60px]' value={item['lotSize']} onChange={(e) => {
                                                    handleNumber(e, 'lotSize', key);
                                                }} />
                                                <div className='border border-gray-300 bg-gray-100 rounded-lg px-1 py-1 outline-none focus:border-blue-500 transition-all w-[65px]'>(x{item['lotSize'] == null ? "" : (props?.scripts.lotSize) * parseInt(item['lotSize'])})</div>
                                            </div>
                                            <div className='border border-gray-300 bg-gray-100 rounded-lg px-1 py-1 outline-none focus:border-blue-500 transition-all w-[125px]'>{props?.product}</div>
                                        </div>
                                        </td>

                                        {/*Different Ways to enter into the market */}
                                        <td>
                                            <div className="flex flex-col gap-1 m-1">
                                                {item['legType']=='OPTION' && <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[199px]" value={item['entryChoice']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['entryChoice'] = e.target.value; props.setLegArray(inputdata);
                                                }}>
                                                    <option className="text-black" value="ATM_PERCENTAGE">ATM %</option>
                                                    <option className="text-black" value="ATM_POINT">ATM Point</option>
                                                    <option className="text-black" value="CP">Closest Premium</option>
                                                    <option className="text-black" value="CP_STRADDLE">CP Based on Straddle</option>
                                                </select>}

                                                {/* ATM Point Ways */}
                                                {item['legType']=='OPTION' && item['entryChoice'] == 'ATM_POINT' && <div className='flex flex-row gap-1'>
                                                    <div className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[75px]'>ATM</div>
                                                    <select
                                                        disabled={disabled}
                                                        className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[120px]"
                                                        value={item['atmPoint']}
                                                        onChange={(e) => {
                                                            const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                            inputdata[key]['atmPoint'] = e.target.value; // Specify radix to parse as base 10
                                                            console.log(parseInt(e.target.value));
                                                            props.setLegArray(inputdata);
                                                        }}>
                                                        {point.map((point, index) => {
                                                            return (
                                                                <option className="text-black" value={point * props.scripts.strikeDifference} key={index}>
                                                                    {point == 0 ? `ATM` : point > 0 ? `ATM+${point * props.scripts.strikeDifference}` : `ATM${point * props.scripts.strikeDifference}`}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>}

                                                {/* ATM Percentage Ways */}
                                                {item['legType']=='OPTION' && item['entryChoice'] == 'ATM_PERCENTAGE' && <div className='flex flex-row gap-1'>
                                                    <div className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[75px]'>ATM</div>
                                                    <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[110px]" value={item['atmPercent']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['atmPercent'] = e.target.value;
                                                        console.log(parseInt(e.target.value));
                                                        props.setLegArray(inputdata);
                                                    }}>
                                                        {
                                                            percentarray.map((percent, key) => {
                                                                let numberPart = percent.replace("ATM", "");
                                                                if (percent == "ATM") {
                                                                    numberPart = "0"; // If starts with "ATM", set numberPart to 0
                                                                }
                                                                return (
                                                                    <option className="text-black" value={numberPart}>{percent}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>}

                                                {/* Closest Premium Ways */}
                                                {item['legType']=='OPTION' && item['entryChoice'] == 'CP' && <div className='flex flex-row gap-1'>
                                                    <select disabled={disabled} className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[75px]' value={item['closestPremiumChoice']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['closestPremiumChoice'] = e.target.value;
                                                        console.log(parseInt(e.target.value));
                                                        props.setLegArray(inputdata);
                                                    }} >
                                                        <option value="~">CP~</option>
                                                        <option value="<=">CP{'<='}</option>
                                                        <option value=">=">CP{'>='}</option>
                                                    </select>
                                                    <input type="text" disabled={disabled} className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[120px]' value={item['closestPremium']} onChange={(e) => {
                                                        handleNumber(e, 'closestPremium', key);
                                                    }} />
                                                </div>}

                                                {/* Closest Premium Based on Straddle Ways */}
                                                {item['legType']=='OPTION' && item['entryChoice'] == 'CP_STRADDLE' && <div className='flex flex-row gap-1'>
                                                    <select disabled={disabled} className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[75px]' value={item['closestPremiumChoice']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['closestPremiumChoice'] = e.target.value;
                                                        console.log(parseInt(e.target.value));
                                                        props.setLegArray(inputdata);
                                                    }} >
                                                        <option value="~">CP~</option>
                                                        <option value="<=">CP{'<='}</option>
                                                        <option value=">=">CP{'>='}</option>
                                                    </select>
                                                    <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[120px]" value={item['closestPremiumOnStraddle']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['closestPremiumOnStraddle'] = e.target.value; props.setLegArray(inputdata);
                                                    }}>
                                                        {
                                                            StraddlePremiumSeries.map((straddle, key) => {
                                                                const numberPart = straddle.replace("SP", ""); // Remove "ATM" prefix
                                                                return (
                                                                    <option className="text-black" key={key} value={numberPart}>{straddle}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>}

                                                {/* Future */}
                                                {item['legType']=='FUTURE' && <div className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[199px]">FUTURE</div>}
                                            </div>
                                        </td>

                                        {/* Buy or Sell option */}
                                        <td>
                                            <div className="flex flex-col m-1">
                                                <div className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 cursor-pointer outline-none focus:border-blue-500 transition-all text-center justify-center" style={{ backgroundColor: item['actionType'] == 'BUY' ? '#12b564' : '#f25d52', color: "white" }} onClick={() => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['actionType'] = item['actionType'] == 'BUY' ? 'SELL' : 'BUY'; !disabled && props.setLegArray(inputdata);
                                                }}>{item['actionType'] == 'BUY' ? 'BUY' : 'SELL'}
                                                </div>

                                                {/* Call or Put option type */}
                                                {item['legType']=='OPTION' && <div className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 cursor-pointer outline-none focus:border-blue-500 transition-all text-center justify-center" style={{ backgroundColor: item['optionType'] == 'CE' ? '#3ca10d' : '#f5b81d', color: "white" }} onClick={() => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['optionType'] = item['optionType'] == 'CE' ? 'PE' : 'CE'; !disabled && props.setLegArray(inputdata);
                                                }}>{item['optionType'] == 'CE' ? 'CALL' : 'PUT'}
                                                </div>}

                                            </div>
                                        </td>

                                        <td>
                                            <div className="cursor-pointer border border-gray-300 m-1 bg-blue-300 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all text-center justify-center" onClick={() => {
                                                let index = props.scriptList.length - 1 == scriptIndex ? 0 : scriptIndex + 1;
                                                setScriptIndex(index);
                                                !disabled && props.setScripts(props.scriptList[index]);
                                                props.setExchange(props.scriptList[index]?.exchange);
                                                let expiry=props.scriptList[index];
                                                const updatedArr = [...props.legArray].map((item) => ({
                                                    ...item, // Copy other fields (if any)
                                                    expiry: expiry.scriptExpiries[0], // Update the expiry field
                                                    expiryType: expiry.scriptExpiries[0].expiryType
                                                }));
                                                props.setLegArray(updatedArr);
                                                setData((prev) => { return { ...prev, // Preserve the existing properties of the object
                                                    expiryType: expiry.scriptExpiries[0].expiryType, // Update the expiryType property
                                                    };
                                                });
                                            }}
                                            >{short_name[props?.scripts?.value]}
                                            </div>
                                        </td>

                                        {/* Expiry Type : a)Weekly  b)Monthly */}
                                        <td>
                                            <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={item['expiryType']} onChange={(e) => {
                                                const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                inputdata[key]['expiryType'] = e.target.value;
                                                !disabled && props.setLegArray(inputdata);
                                            }}>
                                                {
                                                    item['legType']=='OPTION' && props.scripts.scriptExpiries.map((expiry:any,key:number)=>{
                                                        return <option className="text-black" value={expiry.expiryType}>{expiry.expiryType}</option>
                                                    })
                                                }
                                                {
                                                    item['legType']=='FUTURE' && <option className="text-black" value={"Monthly"}>Monthly</option>
                                                }

                                            </select>
                                        </td>

                                        {/* Range BreakOut Setting -Entry at High or Low */}
                                        {props.rangeBreakOut && <td>
                                            <div className="flex flex-col m-1">
                                                <select disabled={disabled} className="m-1 border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={item['rangeBreakoutEntry']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['rangeBreakoutEntry'] = e.target.value;
                                                    !disabled && props.setLegArray(inputdata);
                                                }}>
                                                    <option className="text-black" value="-1">Select Entry</option>
                                                    <option className="text-black" value="HIGH">Entry at High</option>
                                                    <option className="text-black" value="LOW">Entry at Low</option>
                                                </select>

                                                {/* Range Breakout Setting - Entry at Underlying or Instrument */}
                                                <select disabled={disabled} className="m-1 border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={item['rangeBreakoutType']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['rangeBreakoutType'] = e.target.value;
                                                    !disabled && props.setLegArray(inputdata);
                                                }}>
                                                    <option className="text-black" value="-1">Select Type</option>
                                                    <option className="text-black" value="UNDERLYING">Underlying</option>
                                                    <option className="text-black" value="INSTRUMENT">Instrument</option>
                                                </select>
                                            </div>
                                        </td>}

                                        {/* wait trade : a) Point++ b)Point-- c)Percent++ d)Percent-- */}
                                        {props.waitTrade && item['waitTrade'] !== -1 && <td>
                                            <div className='flex flex-row h-8 gap-1 m-1'>
                                                <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[100px]" value={item['waitTradeType']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['waitTradeType'] = e.target.value; props.setLegArray(inputdata);
                                                }}>
                                                    <option className="text-black" value="WT_POINT_INCREMENT">Point++</option>
                                                    <option className="text-black" value="WT_POINT_DECREMENT">Point--</option>
                                                    <option className="text-black" value="WT_PERCENT_INCREMENT">% ++</option>
                                                    <option className="text-black" value="WT_PERCENT_DECREMENT">% --</option>
                                                </select>
                                                <input type="text" className='border border-gray-300 text-center bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[60px]' value={item['waitTrade'] ? item['waitTrade'] : ''} placeholder='0' onChange={(e) => {
                                                    handleNumber(e, 'waitTrade', key);
                                                }} />
                                                {!disabled && <div className="cursor-pointer p-1 text-red-600 w-[30px] hover:bg-red-100 rounded-full transition-all" onClick={(e: any) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['waitTrade'] = -1; props.setLegArray(inputdata);
                                                }}><MdClose className="text-2xl font-semibold" /></div>}
                                            </div>

                                        </td>}
                                        {
                                            props.waitTrade && !disabled && item['waitTrade'] == -1 && <div className='cursor-pointer mt-2 p-2 text-blue-600 min-w-[160px] hover:bg-blue-100 rounded-full transition-all flex items-center justify-center' onClick={(e) => {
                                                const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                inputdata[key]['waitTrade'] = ''; props.setLegArray(inputdata);
                                            }}><IoMdAdd className="text-2xl font-semibold" /></div>
                                        }


                                        {/* Target Profit : a) tp point b) tp percent */}
                                        <td>
                                            {item['target'] !== -1 && <div className='flex flex-row gap-1 m-1'>
                                                <select className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={item['targetType']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['targetType'] = e.target.value; props.setLegArray(inputdata);
                                                }} disabled={disabled}>
                                                    <option className="text-black" value="POINT">Point</option>
                                                    <option className="text-black" value="PERCENT">%</option>
                                                </select>
                                                <input type="text" className='border border-gray-300 bg-gray-100 rounded-lg w-[80px] px-2 py-1 text-center outline-none focus:border-blue-500 transition-all' value={item['target']} onChange={(e) => {
                                                    handleNumber(e, 'target', key);
                                                }} />
                                                {!disabled && <div className="cursor-pointer p-1 text-red-600 w-[30px] hover:bg-red-100 rounded-full transition-all" onClick={(e: any) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['reEntryExecuteTimes'] = item['stopLossValue'] == -1 && item['reEntryExecuteTimes'] !== -1 ? -1 : item['reEntryExecuteTimes'];
                                                    inputdata[key]['reEntryDependency'] = item['reEntryDependency'] == 'TP' && item['stopLossValue'] !== -1 ? 'SL' : item['reEntryDependency'];
                                                    inputdata[key]['target'] = -1; props.setLegArray(inputdata);
                                                }}><MdClose className="text-2xl font-semibold" /></div>}
                                            </div>}
                                            {
                                                item['target'] == -1 && !disabled && <div className='cursor-pointer p-2 text-blue-600 min-w-[160px] hover:bg-blue-100 rounded-full transition-all flex items-center justify-center' onClick={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['target'] = 0; props.setLegArray(inputdata);
                                                }}><IoMdAdd className="text-2xl font-semibold" /></div>
                                            }
                                        </td>

                                        {/* stoploss : a) sl point b)sl percent c) spot point d) spot percent */}
                                        <td>
                                            {item['stopLossValue'] !== -1 && <div className='flex flex-row h-8 gap-1 m-1'>
                                                <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[110px]" value={item['stopLossChoice']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['stopLossChoice'] = e.target.value; props.setLegArray(inputdata);
                                                }}>
                                                    <option className="text-black" value="SL_POINT">SL Point</option>
                                                    <option className="text-black" value="SL_PERCENT">SL %</option>
                                                    <option className="text-black" value="SPOT_POINT">Spot Point</option>
                                                    <option className="text-black" value="SPOT_PERCENT">Spot %</option>
                                                </select>
                                                <input type="text" className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[80px] text-center' value={item['stopLossValue']} placeholder='0' onChange={(e) => {
                                                    handleNumber(e, 'stopLossValue', key);
                                                }} />
                                                {!disabled && <div className='cursor-pointer p-1 text-red-600 hover:bg-red-100 rounded-full transition-all' onClick={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['stopLossValue'] = -1;
                                                    inputdata[key]['reEntryExecuteChoice'] = item['reEntryExecuteTimes'] !== -1 && item['reEntryExecuteChoice'] === "RE_ENTRY" ? "RE_EXECUTE" : item['reEntryExecuteChoice'];
                                                    inputdata[key]['reEntryExecuteTimes'] = item['target'] !== -1 && item['reEntryExecuteTimes'] !== -1 ? item['reEntryExecuteTimes'] : -1;
                                                    inputdata[key]['reEntryDependency'] = item['reEntryDependency'] == 'SL' && item['target'] !== -1 ? 'TP' : item['reEntryDependency'];
                                                    inputdata[key]['trailLossChoice'] = false;
                                                    props.setLegArray(inputdata);
                                                }}><MdClose className="text-2xl font-semibold" /></div>}
                                            </div>}
                                            {
                                                item['stopLossValue'] === -1 && !disabled && <div className='cursor-pointer p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all flex items-center justify-center' onClick={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['stopLossValue'] = 0; props.setLegArray(inputdata);
                                                }}><IoMdAdd className="text-2xl font-semibold" /></div>
                                            }
                                        </td>

                                        {/* Trailloss:: a)pt b)percent */}
                                        <td>
                                            {item['trailLossChoice'] && item['stopLossValue'] !== -1 && <div className='flex flex-col gap-1 m-1'>
                                                <select disabled={disabled} className="border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={item['trailLossType']} onChange={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['trailLossType'] = e.target.value; props.setLegArray(inputdata);
                                                }}>
                                                    <option className="text-black" value="POINT">Point</option>
                                                    <option className="text-black" value="PERCENT">%</option>
                                                </select>
                                                <div className="flex flex-row gap-1">
                                                <input type="text" disabled={disabled} className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[60px]' value={item['trailProfit'] ? item['trailProfit'] : ''} placeholder='0' onChange={(e) => {
                                                    handleNumber(e, 'trailProfit', key);
                                                }} />
                                                <input type="text" disabled={disabled} className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all w-[60px]' value={item['trailStoploss'] ? item['trailStoploss'] : ''} placeholder='0' onChange={(e) => {
                                                    handleNumber(e, 'trailStoploss', key);
                                                }} />
                                                {!disabled && <div className='cursor-pointer p-1 text-red-600 hover:bg-red-100 rounded-full transition-all' onClick={(e) => {
                                                    const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                    inputdata[key]['trailLossChoice'] = false; props.setLegArray(inputdata);
                                                }}><MdClose className="text-2xl font-semibold" /></div>}
                                                </div>
                                            </div>}

                                            {!item['trailLossChoice'] && !disabled && <div className='cursor-pointer p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all flex items-center justify-center' onClick={(e) => {
                                                const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                if (item['stopLossValue'] !== -1 && (item['stopLossChoice'] == 'SL_POINT' || item['stopLossChoice'] == 'SL_PERCENT')) {
                                                    inputdata[key]['trailLossChoice'] = true;
                                                    setOpenTrailStoplossBox(true);
                                                    setCurrentKey(key);
                                                } else {
                                                    item['stopLossValue'] === -1 ? props.setMessage('Please Add Stoploss First') : props.setMessage('Trail Loss apply only at point/% of premium');
                                                }
                                                props.setLegArray(inputdata);
                                            }}><IoMdAdd className="text-2xl font-semibold" /></div>}
                                        </td>



                                        {/* reEntry or reExecute */}
                                        {props.reEntry && props.choice == 'LEG' && <td><div className="">
                                            {
                                                item['reEntryExecuteTimes'] !== -1 && (item['stopLossValue'] !== -1 || item['target'] !== -1) && <div className="flex flex-col gap-1">
                                                    <select disabled={disabled} className='border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 text-center outline-none focus:border-blue-500 transition-all' value={item['reEntryExecuteChoice']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['reEntryExecuteChoice'] = e.target.value;
                                                        props.setLegArray(inputdata);
                                                    }} >
                                                        {item['stopLossValue'] !== -1 && <option value="RE_ENTRY">Re-Entry</option>}
                                                        {props.waitTrade && <option value="RE_ENTRY_WWT">ReEntry[WT]</option>}
                                                        <option value="RE_EXECUTE">Re-Execute</option>
                                                        {props.waitTrade && <option value="RE_EXECUTE_WWT">ReExecute[WT]</option>}
                                                    </select>
                                                    <div className="flex flex-row gap-1">
                                                    {(item['reEntryExecuteChoice'] == 'RE_ENTRY' || item['reEntryExecuteChoice'] == 'RE_ENTRY_WWT') && item['stopLossValue'] !== -1 && <select className='border border-gray-300 bg-gray-100 rounded-lg w-[90px] px-2 py-1 text-center outline-none focus:border-blue-500 transition-all' value={item['reEntryDependency']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['reEntryDependency'] = e.target.value;
                                                        props.setLegArray(inputdata)
                                                    }} >
                                                        <option value="SL">SL</option>
                                                    </select>}
                                                    {(item['reEntryExecuteChoice'] === 'RE_EXECUTE' || item['reEntryExecuteChoice'] == 'RE_EXECUTE_WWT') && (item['stopLossValue'] !== -1 || item['target'] !== -1) && <select className='border border-gray-300 bg-gray-100 rounded-lg w-[90px] px-2 py-1 text-center outline-none focus:border-blue-500 transition-all' value={item['reEntryDependency']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['reEntryDependency'] = e.target.value;
                                                        props.setLegArray(inputdata)
                                                    }} >
                                                        {item['stopLossValue'] !== -1 && <option value="SL">SL</option>}
                                                        {item['target'] !== -1 && <option value="TP">TP</option>}
                                                        {(item['stopLossValue'] !== -1 || item['target'] !== -1) && <option value="SL_TP">SL/TP</option>}
                                                    </select>}
                                                    <select className='border border-gray-300 bg-gray-100 rounded-lg w-[80px] px-2 py-1 text-center outline-none focus:border-blue-500 transition-all' value={item['reEntryExecuteTimes']} onChange={(e) => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['reEntryExecuteTimes'] = e.target.value
                                                        props.setLegArray(inputdata)
                                                    }} >
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                    </select>
                                                    {!disabled && <div className='cursor-pointer p-1 text-red-600 hover:bg-red-100 rounded-full transition-all'><MdClose className="text-2xl font-semibold" onClick={() => {
                                                        const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                        inputdata[key]['reEntryExecuteTimes'] = -1;
                                                        props.setLegArray(inputdata);
                                                    }} /></div>}
                                                    </div>
                                                </div>}

                                            {item['reEntryExecuteTimes'] == -1 && !disabled && <div className='cursor-pointer p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-all flex items-center justify-center' onClick={() => {
                                                const inputdata = JSON.parse(JSON.stringify(props.legArray));
                                                if (item['stopLossValue'] !== -1 || item['target'] !== -1) {
                                                    inputdata[key]['reEntryExecuteTimes'] = 1;
                                                } else {
                                                    props.setMessage('Please Add Stoploss or Target First');
                                                    toast.warn('Please Add Stoploss or Target First');
                                                }
                                                props.setLegArray(inputdata)
                                            }}><IoMdAdd className="text-2xl font-semibold" /></div>}
                                        </div></td>}

                                        {/* Delete leg Icon */}
                                        <td className='flex text-center justify-center'>
                                            {!disabled && <MdDeleteForever className="text-[#DF0100] text-2xl cursor-pointer m-4" onClick={() => {
                                                const inputdata = [...props.legArray];
                                                inputdata.splice(key, 1);
                                                props.setLegArray(inputdata);
                                                props.setLegQuantity(props.legQuantity - 1);
                                            }} />}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
            <Dialog open={openTrailStoplossBox} onClose={() => {
                setOpenTrailStoplossBox(false); const inputdata = JSON.parse(JSON.stringify(props.legArray));
                inputdata[currentKey]['trailLossChoice'] = false; props.setLegArray(inputdata);
            }} sx={{ borderRadius: "10px" }}>
                <div className="flex flex-row bg-blue-400">
                    <div className="text-white text-[18px] p-2">Trailing Stoploss </div>
                    <div className="h-[24px] w-[24px] text-white flex-grow flex justify-end font-semibold p-2 cursor-pointer"><MdClose className="text-2xl font-semibold" onClick={() => { setOpenTrailStoplossBox(false); }} /></div>
                </div>
                <div className='grid grid-cols-2 p-1 mt-5'>
                    <div className='ml-2 font-[500] text-[#232323]'>If Profit  Moves By </div>
                    <div className=''>
                        <input
                            type="number"
                            placeholder="0"
                            value={trailProfit}
                            onChange={(e: any) => { setTrailProfit(e?.target?.value); }}
                            className="text-center justify-center  rounded-md bg-[#DAECF2] h-8  outline-0"
                        />
                        <select className="text-center justify-center  rounded-md h-8 bg-[#DAECF2] ml-2 outline-0" value={trailType} onChange={(e) => { setTrailType(e.target.value); }}>
                            <option value="POINT">Pt</option>
                            <option value="PERCENT">%</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-2 p-1'>
                    <div className='ml-2 font-[500] text-[#232323]'>Then Stoploss Moves By  </div>
                    <div className=''>
                        <input
                            type="text"
                            placeholder="0"
                            value={trailLoss}
                            onChange={(e: any) => { setTrailLoss(e.target.value); }}
                            className="text-center justify-center rounded-md h-8 bg-[#DAECF2] outline-0"
                        />
                        <select className='text-center justify-center  rounded-md h-8 bg-[#DAECF2] ml-2 outline-0' value={trailType} onChange={(e) => { setTrailType(e.target.value); }}>
                            <option value='POINT'>Pt</option>
                            <option value='PERCENT'>%</option>
                        </select>
                    </div>
                </div>
                <div className="text-[#FF3030] m-2">
                    <p className='text-[14px]'>***Profit Moves Must Be Greater Than Stoploss Movement!!.</p>
                    <p className='text-[14px]'>***It will be valid only on Stoploss Percent and Stoploss Point!!.</p>
                    <p className='text-[14px]'>***Every time instrument moves A pts in the profit direction then move stoploss B pts in same direction.</p>
                </div>
                <div className="flex justify-end p-2 bg-gray-200 gap-1 border-t-2 border-blue-400">
                    <button className="p-1 w-16 bg-white border-[1px] border-[#2D5BFF] rounded-lg justify-center text-center text-[#2D5BFF] cursor-pointer" onClick={() => {
                        setOpenTrailStoplossBox(false); const inputdata = JSON.parse(JSON.stringify(props.legArray));
                        inputdata[currentKey]['trailLossChoice'] = false; props.setLegArray(inputdata);
                    }}>Cancel</button>
                    <button className="p-1 w-16 hover:bg-blue-500 bg-blue-500 border-white border-[1px] rounded-lg justify-center text-center text-white cursor-pointer" onClick={() => { onHandleTrailSubmit(currentKey); }}>Ok</button>
                </div>
            </Dialog>
        </>
    )
}

export default Leg