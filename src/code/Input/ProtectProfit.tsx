import { useEffect,useState } from "react"

const ProtectProfit = (props:any) => {
  
  return (
    <div className='flex flex-col'>
      <div className='flex justify-start gap-4'>
        <div className='flex flex-row gap-2'>
          <input type="checkbox" className="h-4 w-4" checked={props.protectProfitChoice==='lockMinimumProfit'} onChange={()=>{props.setProtectProfitChoice("lockMinimumProfit")}} />
          <div className='text-[14px]'>Lock Minimum Profit</div>
        </div>
        <div className='flex flex-row gap-2'>
          <input type="checkbox" className="h-4 w-4" checked={props.protectProfitChoice==='trailProfit'} onChange={()=>{props.setProtectProfitChoice("trailProfit")}}/>
          <div className='text-[14px]'>Trail Profit</div>
        </div>
        <div className='flex flex-row gap-2'>
          <input type="checkbox" className="h-4 w-4" checked={props.protectProfitChoice==='lockAndTrailProfit'} onChange={()=>{props.setProtectProfitChoice("lockAndTrailProfit")}}/>
          <div className='text-[14px]'>Lock & Trail Profit</div>
        </div>
      </div>
      <div className='flex text-center justify-start flex-wrap gap-4'>
        {(props.protectProfitChoice == 'lockAndTrailProfit' || props.protectProfitChoice == 'lockMinimumProfit') && <div className='flex flex-row gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='text-[14px] text-left'>Profit Reaches By</div>
          <div className="flex flex-col">
          <input type="number" className="h-[30px] border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={props.profitReaches} onChange={(e)=>{props.setProfitReaches(e.target.value);}}></input>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-[14px] text-left'>Lock Minimum Profit</div>
          <div className="flex flex-col">
          <input type="number" className="h-[30px] border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={props.lockMinimumProfit} onChange={(e)=>{props.setLockMinimumProfit(e.target.value);}}></input>
          </div>
        </div></div>}
        {(props.protectProfitChoice == 'lockAndTrailProfit' || props.protectProfitChoice == 'trailProfit') && <div className='flex flex-row gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='text-[14px] text-left'>If Profit Increase By</div>
          <div className="flex flex-col">
          <input type="number" className="h-[30px] border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={props.increaseProfit} onChange={(e)=>{props.setIncreaseProfit(e.target.value);}}></input>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-[14px] text-left'>Profit Trail By</div>
          <div className="flex flex-col">
          <input type="number" className="h-[30px] border border-gray-300 bg-gray-100 rounded-lg px-2 py-1 outline-none focus:border-blue-500 transition-all" value={props.trailProfit} onChange={(e)=>{props.setTrailProfit(e.target.value);}}></input>
          </div>
        </div>
        </div>}
      </div>
    </div>)
}
export default ProtectProfit;
