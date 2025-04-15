export const StraddlePremiumSeries = ['5%SP', '10%SP', '15%SP', '20%SP', '25%SP', '30%SP', '35%SP', '40%SP', '45%SP', '50%SP', '55%SP', '60%SP', '65%SP', '70%SP','80%SP','90%SP','100%SP']
export const pointnifty = [
    "ATM-1050", "ATM-1000", "ATM-950", "ATM-900", "ATM-850", "ATM-800", "ATM-750", "ATM-700", "ATM-650", 
    "ATM-600", "ATM-550", "ATM-500", "ATM-450", "ATM-400", "ATM-350", "ATM-300", "ATM-250", "ATM-200","ATM-150","ATM-100", 
    "ATM-50", "ATM", "ATM+50", "ATM+100", "ATM+150", "ATM+200", "ATM+250", "ATM+300", "ATM+350", "ATM+400", "ATM+450", 
    "ATM+500", "ATM+550", "ATM+600", "ATM+650", "ATM+700", "ATM+750", "ATM+800", "ATM+850", "ATM+900", "ATM+950", 
    "ATM+1000"
  ];
  
export const pointbanknifty = [
    "ATM-2000", "ATM-1900", "ATM-1800", "ATM-1700", "ATM-1600", "ATM-1500", "ATM-1400", "ATM-1300", "ATM-1200", "ATM-1100", 
    "ATM-1000", "ATM-900", "ATM-800", "ATM-700", "ATM-600", "ATM-500", "ATM-400", "ATM-300", "ATM-200", "ATM-100", "ATM", 
    "ATM+100", "ATM+200", "ATM+300", "ATM+400", "ATM+500", "ATM+600", "ATM+700", "ATM+800", "ATM+900", "ATM+1000", 
    "ATM+1100", "ATM+1200", "ATM+1300", "ATM+1400", "ATM+1500", "ATM+1600", "ATM+1700", "ATM+1800", "ATM+1900", "ATM+2000"
  ];
// export const percentarray = Array.from({ length: 21 }, (_, i) => `ATM${i - 10 >= 0 ? `+${i - 10.5}` : i - 10.5}%`);4
export const percentarray = ["ATM-4.5%","ATM-4%","ATM-3.5%","ATM-3%","ATM-2.5%","ATM-2%","ATM-1.5%","ATM-1%","ATM-0.5%","ATM","ATM+0.5%","ATM+1%","ATM+1.5%","ATM+2%","ATM+2.5%","ATM+3%","ATM+3.5%","ATM+4%","ATM+4.5%","ATM+5%","ATM+5.5%","ATM+6%","ATM+6.5%"]


export const script=[{"id":1, "value":"NIFTY"},{"id":2,"value":"BANKNIFTY"}]
export const exchange= [ { "id": 1, "value": "NSE"},{ "id": 2, "value": "BSE"},{ "id": 3,"value": "NFO"}, {"id": 4,"value": "CDS" }, { "id": 5, "value":"MCX" }]
export const clientid = [{"id":1 ,"clientId":"GK4791"}]
export const orderType = [{"id":1,"type":"market"},{"id":2,"type":"limit"}]
export const variety = [{"id":1,"type":"regular"},{"id":2,"type":"auction"}]

export const point=[-25,-24,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

export const short_name:any={"NIFTY":"N","NIFTY 50":"N","NIFTY BANK":"BN","BANKNIFTY":"BN","SENSEX":"SX","MIDCPNIFTY":"MCN","NIFTY MID SELECT":"MCN","FINNIFTY":"FIN"}

export const wt_short:any={"WT_POINT_INCREMENT":"pt","WT_POINT_DECREMENT":"pt","WT_PERCENT_INCREMENT":"%++","WT_PERCENT_DECREMENT":"%--"}

export const status:any={"Completed":"CLOSED",'Partial':'ACTIVE','Unplaced':'READY','Placed':'ACTIVE','Failed':'FAILED','Pending':'PENDING','Terminated & Squared Off':'TERMINATED'}

export const short_stoploss:any={"SL_POINT":'pt',"SL_PERCENT":'%',"SPOT_POINT":"spot-pt","SPOT_PERCENT":"spot-%"}

export const short_target:any={"PERCENT":"%","POINT":"pt"}