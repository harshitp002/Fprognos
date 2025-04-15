export const bullish: any[] = [
    {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Long Call",
        "url": "LongCall",
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "0",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Short Put",
        "url": "ShortPut",
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "0",
                "actionType": "SELL",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Bull Call Spread",
        "url": "BullCallSpread",
        "moveSlToCost": false,
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "200",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "positionNo": 2,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "-300",
                "actionType": "SELL",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    }, {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Bull Put Spread",
        "url": "BullPutSpread",
        "moveSlToCost": false,
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "200",
                "actionType": "SELL",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "positionNo": 2,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "-300",
                "actionType": "BUY",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Call Ratio Back Spread",
        "url": "CallRatioBackSpread",
        "moveSlToCost": false,
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "0",
                "actionType": "SELL",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "positionNo": 2,
                "lotSize": "2",
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "200",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Long Synthetic Future",
        "url": "LongSyntheticFuture",
        "moveSlToCost": false,
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "100",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "positionNo": 2,
                "lotSize": "2",
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "100",
                "actionType": "SELL",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:15",
        "endTime": "15:29",
        "startDate": "2024-10-03",
        "endDate": "2024-10-03",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE",
            "expiryTime": "15:30:0"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Range Forward",
        "url": "RangeForward",
        "moveSlToCost": false,
        "legs": [
            {
                "positionNo": 1,
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "400",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "positionNo": 2,
                "lotSize": "1",
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "-400",
                "actionType": "SELL",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 25,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries":
                        [
                            {
                                "id": 1,
                                "expiryType": "WEEKLY"
                            },
                            {
                                "id": 2,
                                "expiryType": "MONTHLY"
                            }
                        ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
        "days": []
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:20",
        "endTime": "15:20",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Bullish Butterfly",
        "url": "BullishButterfly",
        "stoplossChoice": false,
        "stoploss": 1000,
        "targetChoice": false,
        "target": 1000,
        "moveSlToCost": false,
        "legs": [
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "-200",
                "actionType": "BUY",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "0",
                "actionType": "SELL",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "0",
                "actionType": "SELL",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "200",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
    },
    {

        "productType": "INTRADAY",
        "startTime": "09:20",
        "endTime": "15:20",
        "script": {
            "id": 1,
            "value": "NIFTY",
            "strikeDifference": 50,
            "lotSize": 75,
            "expiryWeek": "THURSDAY",
            "name": "NIFTY 50",
            "exchange": {
                "id": 1,
                "value": "NSE",
                "expiryTime": "15:30:0"
            },
            "scriptExpiries": [
                {
                    "id": 1,
                    "expiryType": "WEEKLY"
                },
                {
                    "id": 2,
                    "expiryType": "MONTHLY"
                }
            ]
        },
        "expiryType": "WEEKLY",
        "exchange": {
            "id": 1,
            "value": "NSE"
        },
        "orderType": {
            "id": 1,
            "value": ""
        },
        "variety": {
            "id": 1,
            "value": ""
        },
        "placed": false,
        "status": "Unplaced",
        "reExecuteType":"LTP",
        "rangeBreakOut":false,
        "mutation": false,
        "strategyChoice": "LEG",
        "validity": "IOC",
        "strategyName": "Bullish Condor",
        "url": "BullishCondor",
        "stoplossChoice": false,
        "stoploss": 1000,
        "targetChoice": false,
        "target": 1000,
        "moveSlToCost": false,
        "legs": [
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "-200",
                "actionType": "BUY",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "-100",
                "actionType": "SELL",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "100",
                "actionType": "SELL",
                "optionType": "PE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            },
            {
                "lotSize": 1,
                "legType": "OPTION",
                "rangeBreakoutEntry":-1,
                "rangeBreakoutType":-1,
                "entryChoice": "ATM_POINT",
                "atmPoint": "200",
                "actionType": "BUY",
                "optionType": "CE",
                "script": {
                    "id": 1,
                    "value": "NIFTY",
                    "strikeDifference": 50,
                    "lotSize": 75,
                    "expiryWeek": "THURSDAY",
                    "name": "NIFTY 50",
                    "exchange": {
                        "id": 1,
                        "value": "NSE",
                        "expiryTime": "15:30:0"
                    },
                    "scriptExpiries": [
                        {
                            "id": 1,
                            "expiryType": "WEEKLY"
                        },
                        {
                            "id": 2,
                            "expiryType": "MONTHLY"
                        }
                    ]
                },
                "expiryType": "WEEKLY",
                "variation": 1,
                "segmentType": {
                    "id": 1,
                    "value": "NFO"
                },
                "target": -1,
                "stopLossValue": -1,

                "atmPercent": "0",
                "closestPremium": 100,
                "closestPremiumChoice": "~",
                "closestPremiumOnStraddle": "5%",

                "targetType": "PERCENT",
                "stopLossChoice": "SL_PERCENT",

                "trailLossChoice": false,
                "trailLossType": "POINT",
                "trailProfit": 10,
                "trailStoploss": 10,

                "reEntryExecuteChoice": "RE_EXECUTE",
                "reEntryExecuteTimes": -1,
                "reEntryDependency": 'SL',

                "waitTradeType": "WT_POINT_INCREMENT",
                "waitTrade": -1
            }
        ],
    },
]

