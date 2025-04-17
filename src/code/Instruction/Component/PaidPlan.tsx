import { MdFavorite } from "react-icons/md";
import FAQs from "../../Plan/FAQs";

const PaidPlan = () => {
  let planDetail: any[] = [
    { "plan": "7-DAY FREE TRAIL", "pay": "FREE", "day": 7, "algoLimit": "6 algos once per day", "brokerConfiguration": "Multi-Broker", "features": ["All Features"], "offers": ["No Offers"] },
    { "plan": "PREMIUM", "pay": "250", "day": 15, "algoLimit": "25 algos once per day", "brokerConfiguration": "Multi-Broker", "features": ["All Features"], "offers": ["20% Discount of Fprognos Backtest User"] },
    { "plan": "SILVER", "pay": "500", "day": 30, "algoLimit": "40 algos once per day", "brokerConfiguration": "Multi-Broker", "features": ["All Features"], "offers": ["20% Discount of Fprognos Backtest User"] },
    { "plan": "GOLD", "pay": "1000", "day": 45, "algoLimit": "60 algos once per day", "brokerConfiguration": "Multi-Broker", "features": ["All Features"], "offers": ["20% Discount of Fprognos Backtest User"] },
    { "plan": "PLATINUM", "pay": "2000", "day": 60, "algoLimit": "80 algos once per day", "brokerConfiguration": "Multi-Broker", "features": ["All Features"], "offers": ["20% Discount of Fprognos Backtest User"] },
  ]
  return (
    <>
    <div className="text-center justify-center flex">
        <div className='flex flex-col mt-2'>
          <div className='text-4xl font-semibold'>
            <span className='text-blue-700 text-4xl font-semibold'>Simple</span> pricing for all your
          </div>
          <div className='text-4xl'>
            <span className='italic text-5xl font-semibold'>financial</span> needs
          </div>
          <div className='text-sm font-serif flex flex-row text-center justify-center mt-2'>start for free,upgrade when you <MdFavorite className="text-red-500 text-xl" /> it!.</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1">
        {planDetail.map((plan, index) => (
          <div
            key={index}
            className="border border-blue-400 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-4">{plan.plan}</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-green-500">{plan.pay}</span>
              <span className="text-sm text-gray-500">{plan.day} Days</span>
            </div>
            <p className="text-md text-gray-700 mb-2">
              <strong>Algo Limit:</strong> {plan.algoLimit}
            </p>
            <p className="text-md text-gray-700 mb-2">
              <strong>Broker Configuration:</strong> {plan.brokerConfiguration}
            </p>
            <div className="mb-2">
              <strong>Features:</strong>
              <ul className="list-disc list-inside text-gray-700">
                {plan.features.map((feature: any, i: any) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <strong>Offers:</strong>
              <ul className="list-disc list-inside text-gray-700">
                {plan.offers.map((offer: any, i: any) => (
                  <li key={i}>{offer}</li>
                ))}
              </ul>
            </div>
            <button className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Buy Plan
            </button>
          </div>
        ))}
      </div>
      <FAQs/>
    </>

  )
}

export default PaidPlan