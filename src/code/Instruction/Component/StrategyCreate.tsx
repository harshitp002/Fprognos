import defau from './../assets/Default.webp';
import execute from './../assets/execute.webp';
import leg from './../assets/leg.webp';
import main from './../assets/main2.webp';
import rangeBreakout from './../assets/range_breakout.webp';
import section from './../assets/section1.webp';
import strategy from './../assets/strategy.webp';

const StrategyCreate = () => {
    return (
        <section className="mb-8">
            {/* Title and Introduction */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Creating a Trading Strategy</h2>
            <p className="text-lg text-gray-700 mb-4">
                This section provides a step-by-step guide to creating a trading strategy. Follow the instructions and use the visual aids to set up your strategy efficiently.
            </p>

            {/* Strategy Creation Steps */}
            <div className="space-y-12">
                {/* Default Strategy Setup */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">1. Default Strategy Setup</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Begin by setting up the default parameters for your strategy. This includes defining the basic criteria and initial settings that your strategy will use.
                    </p>
                    <div className="mt-4">
                        <img src={defau} alt="Default strategy setup screenshot" className="rounded-lg shadow-md max-w-full" />
                    </div>
                </div>

                {/* Sectioning and Layout */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">2.Feature of Square Off One Leg</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Organize your strategy into sections for better clarity and management. This helps in tracking performance and making adjustments more efficiently.
                    </p>
                    <div className="mt-4">
                        <img src={section} alt="Sectioning and layout screenshot" className="rounded-lg shadow-md max-w-full" />
                    </div>
                </div>

                {/* Main Strategy Settings */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">3.Feature of Square Off All Leg</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Adjust the main settings of your strategy, including risk management, stop-loss, and take-profit levels. Ensure these settings align with your trading goals.
                    </p>
                    <div className="mt-4">
                        <img src={main} alt="Main strategy settings screenshot" className="rounded-lg shadow-md max-w-full" />
                    </div>
                </div>

                {/* Leg Configuration */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">4.Leg wise Detail</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Define the legs of your strategy. Each leg represents a different component or trade setup within your overall strategy. Configure each leg according to your trading plan.
                    </p>
                    <div className="mt-4">
                        <img src={leg} alt="Leg configuration screenshot" className="rounded-lg shadow-md max-w-full" />
                    </div>
                </div>

                {/* Range Breakout Configuration */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">5. Range Breakout Configuration</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        Set up range breakout parameters to define how your strategy will react to price movements breaking out of predefined ranges. This is crucial for strategies that depend on volatility.
                    </p>
                    <div className="mt-4">
                        <img src={rangeBreakout} alt="Range breakout configuration screenshot" className="rounded-lg shadow-md max-w-full" />
                    </div>
                </div>
                

                {/* Execute Strategy */}
                <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">6. Execute Strategy</h3>
                    <p className="text-lg text-gray-700 mb-4">
                        After configuring the default settings, you need to execute your strategy to start testing or applying it to real trades. Ensure all parameters are set correctly before execution.
                    </p>
                    <div className="mt-4">
                        <img src={execute} alt="Execute strategy screenshot" className="rounded-lg shadow-md max-w-full" />
                    </div>
                </div>

                
            </div>
        </section>

    )
}

export default StrategyCreate