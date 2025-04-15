
const Mutation = (props:any) => {
    return (
        <>
            {/* --------- Mutation Result --------- */}
            <div className='flex text-center justify-center gap-2 m-2 p-2 rounded flex-wrap'>
                <div className='flex flex-row gap-2'>
                    <div className='font-[500] text-[16px]'>Triggering Basis</div>
                    <select className='border-[1px] outline-0 rounded'>
                        <option value="Premium">Premium</option>
                        <option value="StrikePrice">StrikePrice</option>
                        <option value="MarkToMark">MarkToMark</option>
                        <option value="Stoploss">Stoploss</option>
                        <option value="Profit">Profit</option>
                        <option value="LTP">Last Traded Price</option>
                    </select>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='font-[500] text-[16px]'>Comparison</div>
                    <select className='border-[1px] outline-0 rounded' value={props.comparison} onChange={(e)=>{props.setComparison(e.target.value);}}>
                        <option value=">=">Greater than</option>
                        <option value="<=">Less than</option>
                        <option value="=">Equal to </option>
                    </select>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='font-[500] text-[16px]'>Value</div>
                    <div className='grid grid-cols-2 gap-2'>
                        <input type="number" placeholder='value' className='border-[1px] outline-0 rounded'  value={props.value} onChange={(e)=>{props.setValue(e.target.value);}}/>
                        <select className='border-[1px] outline-0 rounded'>
                            <option value="point">point</option>
                            <option value="percent">percent</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <div className='font-[500] text-[16px]'>Quantity</div>
                    <select className='border-[1px] outline-0 rounded' value={props.quantity} onChange={(e)=>{props.setQuantity(e.target.value);}}>
                        <option value="same">Same</option>
                        <option value="half">Half</option>
                        <option value="quarter">Quarter</option>
                        <option value="double">Double</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Mutation