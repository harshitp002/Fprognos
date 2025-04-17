const Features = () => {
    return (
        <>
            <div className='font-bold text-3xl mb-6'>List of All Features</div>
            
            {/* Trade Logic Features Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Features (Trade Logic)</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <span className="font-semibold">Entry by Premium:</span> Enter trades when the premium of an option reaches a specific value.
                    </li>
                    <li>
                        <span className="font-semibold">Entry by ATM %:</span> Trigger entries based on a percentage of the ATM (At-the-Money) strike price.
                    </li>
                    <li>
                        <span className="font-semibold">Entry by Straddle Width:</span> Enter trades when the combined width of a straddle position reaches a predefined limit.
                    </li>
                    <li>
                        <span className="font-semibold">Entry by Straddle Premium:</span> Initiate trades based on the total premium collected from a straddle strategy.
                    </li>
                    <li>
                        <span className="font-semibold">Move Stoploss to Cost:</span> Adjust the stop-loss to your cost price once the trade is in profit to lock in gains.
                    </li>
                    <li>
                        <span className="font-semibold">Positional Trades:</span> Manage trades over multiple days, ideal for swing or positional traders.
                    </li>
                    <li>
                        <span className="font-semibold">Premium Matching Functionality:</span> Ensures that entry premiums match user-defined criteria for precision in trade execution.
                    </li>
                    <li>
                        <span className="font-semibold">Re-Entry / Re-Execute:</span> Automatically re-enter trades after exit criteria are met or re-execute an order if certain conditions are satisfied.
                    </li>
                    <li>
                        <span className="font-semibold">Wait & Trade:</span> Wait for market conditions to align with the strategy before placing trades, minimizing impulsive entries.
                    </li>
                    <li>
                        <span className="font-semibold">Underlying Based Entries & Exits:</span> Enter or exit trades based on the movement or price of the underlying asset.
                    </li>
                    <li>
                        <span className="font-semibold">Range Breakout:</span> Enter trades when the market price breaks a defined range, indicating a strong price move.
                    </li>
                </ul>
            </section>
            
            {/* Advanced Settings Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Advanced Settings</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <span className="font-semibold">Entry Order Delay & Exit Order Delay:</span> Control the timing of order execution to reduce slippage or react to market conditions.
                    </li>
                    <li>
                        <span className="font-semibold">Calculate Entry & Exit Using Average Price or LTP:</span> Choose between average price or Last Traded Price (LTP) for accurate trade calculations.
                    </li>
                    <li>
                        <span className="font-semibold">Re-Entry Method:</span> Define specific rules for how and when re-entry should happen after exiting a trade.
                    </li>
                    <li>
                        <span className="font-semibold">Re-Entry Timing Settings:</span> Fine-tune the timing of re-entries, specifying how long to wait before re-entering a position.
                    </li>
                    <li>
                        <span className="font-semibold">SL Order Placement Delay:</span> Delay stop-loss order placements to allow the market to settle before applying risk controls.
                    </li>
                    <li>
                        <span className="font-semibold">Re-Entry Max Count Type:</span> Limit the number of times a re-entry can occur within a session or strategy to control risk.
                    </li>
                    <li>
                        <span className="font-semibold">Re-Execute Order Delay:</span> Delay the re-execution of an order after it is canceled or adjusted to better align with market conditions.
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Features;
