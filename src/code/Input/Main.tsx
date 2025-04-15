import useDashboardStore from "../../store/dashboardStore";

const Main = (props:any) => {
    const {disabled} = useDashboardStore();
   
    return (
        <>
            <div className='p-2 mt-3 border-[1px] rounded-lg'>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2 lg:grid-cols-4">
                    
                    {/*MIS,NRML and CNC  */}
                    <div className=" flex flex-col">
                        <label className="text-[14px]">Product</label>
                        <select className="rounded border-[1px] text-[14px] outline-0 p-1 bg-[#F8F8F8] h-[35px]" disabled={disabled} value={props.product} onChange={(e) => { props.setProduct(e.target.value) }}>
                            {
                                props.productType.map((item:any,key:number)=>{
                                    return(
                                        <option className="text-black" key={key} value={item.name}>{item?.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* Weekly Expiry ,Monthly Expiry */}
                    <div className=" flex flex-col">
                        <label className="text-[14px]">Expiry</label>
                        <select className="border-[1px] text-[14px] rounded outline-0 font-sans p-1 bg-[#F8F8F8] h-[35px]" disabled={disabled} value={props.expiryType} onChange={(e) => { props.setExpiryType(e.target.value); }}>
                            <option className="text-black" value='WEEKLY'>WEEKLY</option>
                            <option className="text-black" value='MONTHLY'>MONTHLY</option>
                        </select>
                    </div>

                    {/* NSE,BSE,NFO,CDS,MCX */}
                    <div className=" flex flex-col">
                        <label className="text-[14px]">Exchange</label>
                        <div className="border-[1px] rounded outline-0 text-[14px] font-sans p-1 bg-[#F8F8F8] h-[35px]">
                        {props.exchange.value}
                        </div>
                    </div>

                    {/* Limit Order , Market Order ,Stoploss Market Order */}
                    <div className=" flex flex-col">
                        <label className="text-[14px]">Order Type</label>
                        <select className="rounded border-[1px] outline-0 text-[14px]  p-1 bg-[#F8F8F8] h-[35px]"  disabled={disabled} value={props.marketOrder.value} onChange={(e) => { props.setMarketOrder(e.target.value) }}>
                            {props.orderType.map((item:any, key:number) => (
                                <option className="text-black" key={key} value={item}>
                                    {item.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Regular,Iceberg,Cover,Auction Order */}
                    {/* <div className=" flex flex-col">
                        <label className="text-[14px]">Variety</label>
                        <select className="rounded border-[1px] outline-0 p-1 bg-[#F8F8F8]" disabled={disabled} value={props.variety ? props.variety.value : ''} onChange={(e) => { props.setVariety(props.varieties.find((item:any) => item.value === e.target.value)) }}>
                        {props.varieties.map((item:any, key:number) => (
                            <option className="text-black" key={key} value={item.value}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                    </div> */}

                    {/* Mutation Yes or No */}
                    {/* <div className=" flex flex-col">
                        <label className="text-[14px]">Mutation Execution</label>
                        <select className='border-[1px] rounded outline-0 p-1 bg-[#F8F8F8]' disabled={disabled} value={props.mutation} onChange={(e) => { props.setMutation(JSON.parse(e.target.value)); }}>
                            <option value={true.toString()}>YES</option>
                            <option value={false.toString()}>NO</option>
                        </select>
                    </div> */}

                    {/* IOC,TTL,DAY */}
                    {/* <div className=" flex flex-col">
                        <label className="text-[14px]">Validity</label>
                        <select className='border-[1px] rounded outline-0 p-1 bg-[#F8F8F8]' disabled={disabled}  value={props.validity} onChange={(e) => { props.setValidity(e.target.value); }}>
                            <option value="IOC">IOC</option>
                            <option value="TTL">TTL</option>
                            <option value="DAY">DAY</option>
                        </select>
                    </div> */}

                </div>
            </div>
        </>

    )
}

export default Main
