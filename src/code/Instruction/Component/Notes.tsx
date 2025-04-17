import correlationFormula from './../../assets/correlationFormula.webp'
import note from './../../../assets/55.webp'

const Notes = () => {
    return (
        <>
            <div className=" bg-[#DAECF2] pb-10 p-2 text-black">
                <div className='text-4xl flex flex-wrap text-black text-center justify-center font-bold'><img src={note} className='h-16 w-16' />Deep Dive into description of <span className='text-blue-600'>&nbsp;All feature</span></div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">1.Basic Glossary</div>
                    <ul className='ml-5'>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">a.</span> Trade Symbol:-<span className="text-black font-[500]">A unique code representing a company's stock on the stock exchange.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">b.</span> Intraday:-<span className="text-black font-[500]">Trading activities occurring within the same trading day, opening and closing positions before the day ends.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">c.</span> Positional:-<span className="text-black font-[500]">Holding investment positions for a long time based on market analysis.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">d.</span> Expiry Type:-<span className="text-black font-[500]">The predetermined end date for financial contracts like options or futures.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">e.</span> Start Time:-<span className="text-black font-[500]">The beginning time of a trading strategy.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">f.</span> End Time:-<span className="text-black font-[500]">The finishing time of a trading strategy.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">g.</span> Premium Price:-<span className="text-black font-[500]">The cost of acquiring an options contract.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">h.</span> Spot Price:-<span className="text-black font-[500]">The current market price for immediate asset settlement</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">i.</span> Future Price:-<span className="text-black font-[500]">Agreed price for buying or selling an asset in a futures contract..</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">j.</span> Lot:-<span className="text-black font-[500]">Quantity of Future & Options Contract, e.g., one lot of Nifty contains 50 units.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">k.</span> ATM:-<span className="text-black font-[500]">Option with a strike price close to the market price.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">l.</span> ITM:-<span className="text-black font-[500]">Option favorable for the holder as the market price is in its favor.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">m.</span> OTM:-<span className="text-black font-[500]">Option with a strike price not favorable for immediate exercise.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">n.</span> Strategy Profit:-<span className="text-black font-[500]">The net financial gain or loss from executing a specific trading or investment strategy. If the strategy generates profit, it will be squared off entirely.</span></li>
                        <li className='text-black  p-2 rounded-lg font-[600]'><span className="text-black">o.</span> Strategy Stoploss:-<span className="text-black font-[500]">A predetermined price level set by a trader to limit potential losses by automatically exiting a position if the market moves unfavorably.</span></li>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className='font-[600] text-[18px]'>2.Square Off</div>
                    <div className='ml-5'>
                        <div className="font-[600] ">a.Square Off one Leg</div>
                        <ul className='ml-5'>
                            <li>If any leg of the strategy reaches the target profit or stop loss, it will be squared off individually.</li>
                            <li className="font-[600]">Example: 1</li>
                            <ul className='ml-5 list-disc'>
                                <li> Sell Call ATM NIFTY TargetProfit:15 point EntryPrice:: 80</li>
                                <li> Sell Put ATM NIFTY TargetProfit:15 point  EntryPrice:: 65 </li>
                            </ul>
                            <li>If at 11:30, If the first leg achieves the target profit, it will be squared off while the second leg continues until it reaches its target or stop loss.</li>
                        </ul>
                        <div className="font-[600]">b.Square Off all Leg</div>
                        <ul className='ml-5'>
                            <li>If any leg reaches the target profit or stop loss, all legs will be squared off simultaneously. </li>
                            <li className="font-[600]">Example: 1</li>
                            <ul className='ml-5 list-disc'>
                                <li> Sell Call ATM NIFTY TargetProfit:15 point EntryPrice:: 80</li>
                                <li> Sell Put ATM NIFTY TargetProfit:15 point  EntryPrice:: 65 </li>
                            </ul>
                            <li>If at 11:30,If the first leg achieves the target profit, both legs will be squared off immediately..</li>
                        </ul>
                    </div>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">3. SquareOff Condition for Particular Leg</div>
                    <ul className='ml-5'>
                        <li className='font-[600]'>CASE I: Target Profit Achieved</li>
                        <ul className='ml-5'>
                            <li className='font-[600]'>a.TP Point</li>
                            <ul className='ml-5 list-disc'>
                                <li>For Buy, Target Profit &ge; Current Price - Start Price</li>
                                <li>For Sell, Target Profit &le; Start Price - Current Price</li>
                            </ul>
                        </ul>
                        <ul className='ml-5'>
                            <li className='font-[600]'>b.TP Percent</li>
                            <ul className='ml-5 list-disc'>
                                <li>For Buy, Target Profit Percent &ge; ((Current Price - Start Price)*100)/Start Price</li>
                                <li>For Sell, Target Profit Percent &ge; ((Start Price - Current Price)*100)/Start Price</li>
                            </ul>
                        </ul>
                        <li className='font-[600]'>Case II.Target Stoploss Achieved</li>
                        <ul className='ml-5'>
                            <li className='font-[600]'>a.SL Point</li>
                            <ul className='ml-5 list-disc'>
                                <li>For Buy, Target Stoploss &ge; Start Price - Current Price</li>
                                <li>For Sell, Target Stoploss &ge; Current Price - Start Price</li>
                            </ul>
                        </ul>
                        <ul className='ml-5'>
                            <li className='font-[600]'>b.SL %</li>
                            <ul className='ml-5 list-disc'>
                                <li>For Buy, Target Stoploss Percent &ge; ((Start Price - Current Price)*100)/Start Price</li>
                                <li>For Sell, Target Stoploss Percent &ge; ((Current Price - Start Price)*100)/Start Price</li>
                            </ul>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">4.Move SL To Cost</div>
                    <ul className='ml-5'>
                        <ul className='ml-5 list-disc'>
                            <li> This feature applies only when using the "Square Off One Leg" option and not with "Square Off All Leg.".</li>
                            <li> When the stop loss is triggered on one leg of the strategy, the stop loss on the opposing leg is adjusted to the entry price.</li>
                            <li> It's important to note that both legs of the strategy must be either Buy or Sell, not a mix of both.</li>
                        </ul>
                        <li className='font-[600]'>For Instance:</li>
                        <li className='ml-2'>If a Call Option is squared off due to hitting the stop loss, all Put Options will have their stop loss revised to the entry price.</li>
                        <li className="font-[600]">Lets take an Example::</li>

                        <li className=" font-[600]">Example 1:</li>
                        <ul className='ml-5 list-disc'>
                            <li>In a strategy with 2 legs - Sell CE & Sell PE.</li>
                            <li>If Sell CE hits stoploss, Sell PE's stoploss will be revised to cost (ie. entry price).</li>
                        </ul>

                        <li className=" font-[600]">Example 2:</li>
                        <ul className='ml-5 list-disc'>
                            <li>In a strategy with 2 legs - Buy CE, Buy PE </li>
                            <li>If Buy CE hits stoploss,then Buy PE's stoploss will be revised to cost (ie. entry price).</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">4.Wait&Trade</div>
                    <ul className='ml-5' >
                        <li>With this feature, a leg of the strategy waits for a specific price level. Upon reaching the desired price, it enters into the trade.</li>
                        <li className=" font-[600]">Scenario::</li>
                        <ul className='ml-5 list-disc'>
                            <li>In a strategy with two legs involving selling a Call Option and a Put Option:</li>
                            <li>If the market price drops by x points, both legs will enter the market.</li>
                            <li>If either leg meets the condition, it will enter the market.</li>
                        </ul>
                        <li className=" font-[600]">Let's take an Example::</li>
                        <ul className='ml-5 list-disc'>
                            <li>Suppose the entry price for selling a Call Option (CE) is 150 and for selling a Put Option (PE) is 125.</li>
                            <li>The "Wait&Trade" value for a Call Option is 15 point-- and put Option is 15 point++.</li>
                            <li>It Implies that Call Option will enter into the market when the price will be less than 135.</li>
                            <li>Sell put Option will enter into the market when the price will be above 140.</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">5.Re-Entry/Re-Execute</div>
                    <ul className='ml-5'>
                        <li className="font-[600]">a.RE-Entry</li>
                        <li><span className='font-[600] ml-5'>Applicability</span>:This feature is applicable only when using "Square Off One Leg" and specifically for managing stop losses..</li>
                        <div className='ml-8'>
                            <div className='-ml-3'>Example:</div>
                            <ul className='list-disc ml-5'>
                            <li><span className="font-[600]">Side:</span> Sell</li>
                            <li><span className="font-[600]">SL:</span> 15 points</li>
                            <li><span className="font-[600]">Re-entry method:</span> LTP</li>
                            <li><span className="font-[600]">No. of times re-entry:</span> 3</li>
                            </ul>
                            <ul className='ml-8'>
                            <li className=" font-[600]">1.Original entry (1st entry):</li>
                            <li className='ml-5'>Entry price: 215</li>
                            <li className='ml-5'>Stoploss price: 230</li>
                            <li className=" font-[600]">2.First Re-Entry:</li>
                            <li className='ml-5'>SL hit at 230</li>
                            <li className='ml-5'>Re-entry at 214 (average entry price / any price the entry is executed at or below 215)</li>
                            <li className='ml-5'>SL set to 229</li>
                            <li className=" font-[600]">3.Second Re-Entry:</li>

                            <li className='ml-5'>SL Hit at 229</li>
                            <li className='ml-5'>Re-entry at 210 (average entry price / any price the entry is executed at or below 214)</li>
                            <li className='ml-5'>SL set to 225</li>
                            <li className=" font-[600]">4.Third Re-Entry:</li>

                            <li className='ml-5'>SL Hit at 225</li>
                            <li className='ml-5'> Re-entry at 210 (any price at or below 210)</li>
                            <li className='ml-5'> SL set to 105</li>
                            </ul>
                        </div>
                        <li className=" font-[600]">b.Re-Execute</li>
                        <li><span className="font-[600] ml-5">Applicability:</span>This feature is applicable for both "Square Off One Leg" and "Square Off All Leg" and can be used for managing stop losses, profits, or both..</li>
                        <div className='ml-8'>
                            <div className='-ml-3'>Example:</div>
                            <ul className='list-disc ml-5'>
                            <li><span className='font-[600]'>Side:</span> Sell</li>
                            <li><span className='font-[600]'>SL:</span>15 points</li>
                            <li><span className='font-[600]'>Re-Execute method:</span> LTP</li>
                            <li><span className='font-[600]'>No. of times Re-Execute:</span> 3</li>
                            </ul>
                            <ul className='ml-8'>
                            <li className=" font-[600]">1.Original Execution (1st entry):</li>
                            <li className='ml-5'>Entry price: 210</li>
                            <li className='ml-5'>Stoploss price: 225</li>
                            <li className=" font-[600]">2.First Re-Execute:</li>

                            <li className='ml-5'>SL hit at 225</li>
                            <li className='ml-5'>Re-Execute at next minute with current strike price.</li>
                            <li className=" font-[600]">3.Second Re-Execute:</li>

                            <li className='ml-5'>SL Hit at 240</li>
                            <li className='ml-5'>Re-Execute at next minute with current strike price.</li>
                            <li className=" font-[600]">4.Third Re-Execute:</li>
                            <li className='ml-5'>SL Hit at 250</li>
                            <li className='ml-5'>Re-Execute at next minute with current strike price.</li>
                            </ul>
                        </div>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">6.Closest Premium</div>
                    <ul className='ml-5'>
                        <li>In this feature, we select the strike price based on the premium value closest to the user-defined value.</li>
                        <li className=" font-[600]">Example:</li>
                        <ul className='list-disc ml-5'>
                            <li>  Suppose the current spot price is 30016, and the ATM strike is 30000.</li>
                            <li>  If the user has set a premium value of 120 ~CP, then the entry premium closest to 120 will be selected.</li>
                            <li>  Finally, a strike price with a premium close to 120 will be chosen for entry.</li>
                            <li>  Similarly, if the user selects higher or lower values, the selected strikes will have premiums higher or lower than the specified value.</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">7.Closest Premium Based on Straddle</div>
                    <ul className='ml-5'>
                        <li>This feature considers the total straddle premium price and selects the closest one.</li>
                        <li className=" font-[600]">Example:</li>
                        <ul className='list-disc ml-5'>
                            <li>Suppose the current spot price is 30016, and the ATM strike is 30000.</li>
                            <li>If the ATM CE premium is 216 and the ATM PE premium is 284, then the total straddle premium would be 500.</li>
                            <li>If the user has set a premium value of ~40% SP, then the entry premium is calculated as 40% of 500, resulting in 200.</li>
                            <li>Finally, a strike price with a premium close to 200 will be selected for entry.</li>
                            <li>Similarly, if the user selects higher or lower values, the selected strikes will have premiums higher or lower than the specified value.</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">8.Protect Profit</div>
                    <ul className='ml-5'>
                        <li>It will protect the profit using three method.</li>
                        <li className='text-l font-[600]'>a.Lock Minimum Profit b.Trail Profit c.Lock & Trail profit</li>
                        <ul className='list-disc ml-5'>
                            <li><span className="font-[600]">Lock Minimum Profit</span>:Locks profits when the total profit reaches a specified limit..</li>
                            <li><span className="font-[600]">Trail Profit</span>:Trails the profit by a specified unit when a specified limit is reached.</li>
                            <li><span className="font-[600]">Lock & Trail Profit</span>:Initially locks the profit and then trails it as it increases by a specified unit.</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2 mb-10">
                    <div className="font-[600] text-[18px]">9.ATM Percent and ATM Point</div>
                    <ul className='ml-5'>
                        <li><span className='font-[600]'>a.ATM Percent:</span> Adjusts the strike price based on a percentage of the ATM strike..</li>
                        <li className='font-[600] bg-blue-400 p-1 text-white'>STRIKEPRICE=ATM+ATM*ATM_PERCENT</li>
                        <li><span className='font-[600]'>b.ATM POINT:</span> It will take strikprice after deduction or addition of some point of atm.</li>
                        <li className='font-[600] bg-blue-400 p-1 text-white'>STRIKEPRICE=ATM+ATM_point</li>
                        <li className=" font-[600]">Examples:</li>
                        <ul className='ml-5'>
                        <li> 1. Given the current spot price of 40842.25 and ATM strike of 40800:</li>
                        <li className=" font-[600]">Case I : ATM + 1.5% PE</li>
                        <li>Strike Price = 40800 + (40800 x 1.5%)</li>
                        <li>Closest strike to 41208 is 41200, so the selected strike will be 41200 PE.</li>

                        <li className=" font-[600]">Case II: ATM + 100 PE</li>
                        <li>Strike Price = 40800 + 100</li>
                        <li>Closest strike is 40900, so the selected strike will be 40900 PE.</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">10.Formula of Maximum Drawdown Ratio</div>
                    <ul className='ml-5'>
                        <li>The Maximum Drawdown Ratio (MDDR) serves as a crucial metric in trading for evaluating the risk associated with a trading strategy or investment portfolio. It is determined by the following formula:</li>

                        <li className='font-[600] bg-blue-400 p-1 text-white'>MDDR= Maximum Drawdown/Peak Value</li>

                        <li className='font-[600]'>Definition:</li>
                        <ul className='ml-5 list-disc'>
                            <li><span className='font-[600]'>Maximum Drawdown:</span> This represents the largest percentage decrease in the value of a portfolio from its peak to the lowest point before a new peak is achieved..</li>

                            <li><span className='font-[600]'>Peak Value:</span> This denotes the highest value attained by the portfolio before experiencing a significant decline.</li>
                        </ul>
                        <li>In essence, the MDDR quantifies the extent of loss relative to the peak value, providing insights into the risk exposure of the trading strategy or investment portfolio.</li>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">11.Formula of Maximum Drawdown Recovery Period</div>
                    <ul className='ml-5'>
                        <li>The Maximum Drawdown Recovery Period (MDRP) represents the duration required for an investment to bounce back from its maximum drawdown.</li>

                        <li>Calculating the MDRP may vary depending on the methodology used, but a common approach involves the following steps:</li>
                        <ul className='ml-5 list-disc'>

                            <li><span className='font-[600]'>Identify the Peak Date (PD):</span> This marks the date when the investment attained its highest value before experiencing a drawdown.</li>

                            <li><span className='font-[600]'>Identify the Trough Date (TD):</span> This signifies the date when the investment reached its lowest point during the drawdown period.</li>

                            <li><span className='font-[600]'>Identify the Recovery Date (RD):</span> This indicates the date when the investment's value rebounds to or surpasses its peak value before the drawdown.</li>
                        </ul>
                        <li className=" font-[600] text-white bg-blue-400 p-1">MDRP=RD−TD</li>

                        <li>In simple terms, MDRP measures the number of days necessary for the investment to recover from its lowest point to a level where it matches or exceeds its previous peak value.</li>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">12.Stoploss and Target Profit</div>
                    <ul className='ml-5'>
                        <li className=''>In trading, both stoploss and target profit are crucial components for managing risk and maximizing returns. Below are the actions associated with each option type:</li>
                        <li className=" font-[600]">Case I: Stoploss</li>
                        <table className='border-2 shadow-lg p-4 m-2 bg-white text-center min-w-[400px]'>
                            <thead>
                                <tr className="border-2 border-gray-400"><th>Option</th><th>Future Price</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <tr className="border-2 border-gray-400"><td>Sell Call(SC)</td><td>Increase</td><td>loss</td></tr>
                                <tr className="border-2 border-gray-400"><td>Sell Put(SP)</td><td>Decrease</td><td>loss</td></tr>
                                <tr className="border-2 border-gray-400"><td>Buy Call(BC)</td><td>Decrease</td><td>loss</td></tr>
                                <tr className="border-2 border-gray-400"><td>Buy Put(BP)</td><td>Increase</td><td>loss</td></tr>
                            </tbody>
                        </table>
                        <ul className='list-disc ml-5'>
                            <li>In this scenario, the action taken when the stoploss is triggered depends on the type of option and its relation to the future price. For instance:</li>
                            <li>If you sell a call option (SC) and the future price increases, it leads to a loss.</li>
                            <li>Conversely, if you sell a put option (SP) and the future price decreases, it also results in a loss.</li>
                            <li>Buying call (BC) and put (BP) options incur losses when the future price moves against the expected direction.</li>
                        </ul>
                        <li className=" font-[600]">Case II:Target Profit</li>
                        <table className='border-2 shadow-lg p-4 m-2 bg-white text-center min-w-[400px]'>
                            <thead>
                                <tr className="border-2 border-gray-400"><th>Option</th><th>Future Price</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                <tr className="border-2 border-gray-400"><td>Sell Call(SC)</td><td>Decrease</td><td>profit</td></tr>
                                <tr className="border-2 border-gray-400"><td>Sell Put(SP)</td><td>Increase</td><td>profit</td></tr>
                                <tr className="border-2 border-gray-400"><td>Buy Call(BC)</td><td>Increase</td><td>profit</td></tr>
                                <tr className="border-2 border-gray-400"><td>Buy Put(BP)</td><td>Decrease</td><td>profit</td></tr>
                            </tbody>
                        </table>
                        <ul className='list-disc ml-5'>
                            <li>When the target profit is achieved, the action varies based on the type of option and its relation to the future price:</li>
                            <li>Selling call options (SC) generates profits when the future price decreases.</li>
                            <li>Conversely, selling put options (SP) results in profits when the future price increases.</li>
                            <li>Buying call (BC) and put (BP) options yield profits when the future price moves in the expected direction.</li>
                        </ul>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-3">
                    <div className="font-[600] text-[18px]">13.Expectancy Ratio</div>
                    <ul className='ml-5'>
                        <li>The Expectancy Ratio is a vital metric used in trading to assess the profitability of a trading strategy. It is calculated using the formula:</li>
                        <li className='font-[600] text-white bg-blue-400 p-1'>(Reward-to-Risk Ratio X Win Ratio) - (Loss Ratio) = Expectancy Ratio</li>
                        <li className="font-[600]">For example:</li>
                        <ul className='ml-5'>
                        <li><span className='font-[600]'>Scenario 1:</span> Positive Expectancy</li>
                        <ul className='list-disc ml-5'>

                            <li><span className='font-[600]'>Reward-to-Risk:</span> 1 </li>

                            <li><span className='font-[600]'>Win Ratio:</span> 0.6 or 60% </li>

                            <li><span className='font-[600]'>Loss Ratio:</span> 0.4 or 40% </li>

                            <li><span className='font-[600]'>Calculation: </span>(1 X 0.6) - (0.4) = 0.2 </li>

                            <li className='font-[600]'>Interpretation</li>
                        </ul>
                        <li>A positive expectancy ratio of 0.2 indicates that for every unit of risk, this trade will return 0.2 times the size of your losing trades. This suggests a profitable outcome and provides a benchmark for comparing with other trade options.</li>

                        <li className=''><span className='font-[600]'>Scenario 2:</span> Negative Expectancy</li>
                        <ul className='list-disc ml-5'>
                            <li><span className="font-[600]">Reward-to-Risk:</span> 0.5</li>

                            <li><span className="font-[600]">Win Ratio:</span> 0.6 or 60% </li>

                            <li><span className="font-[600]">Loss Ratio:</span> 0.4 or 40% </li>

                            <li><span className='font-[600]'>Calculation: </span>(0.5 X 0.6) - (0.4) = -0.1 </li>
                            <li className='font-[600]'>Interpretation</li>
                        </ul>
                        </ul>
                        <li>In this scenario, despite having a higher win ratio than the loss ratio, the expectancy ratio is negative at -0.1. This indicates that the trade will return -0.1 times the size of your losing trades. A negative expectancy suggests that this trade will likely result in a loss in the future and is not advisable to pursue..</li>
                        <li>Understanding the expectancy ratio is crucial for traders as it helps them evaluate the potential profitability of their trading strategies and make informed decisions regarding their trades.</li>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-3">
                    <div className="font-[600] text-[18px]">14.Trail Stoploss</div>
                    <ul className='ml-5'>
                        <li>Trail Stoploss is a dynamic method of adjusting stoploss levels based on price movements in the profitable direction. It ensures that as the price moves in favor of the trade, the stoploss is trailed or adjusted accordingly to lock in profits or minimize losses.</li>
                        <li className="font-[600] text-[18px]">1.Trail Stoploss Point</li>
                        <ol className='m-4'>
                            <li className=" font-[600]">a. Example for Buy:</li>
                            <ul className='list-disc ml-5'>
                                <li className=''><span className='font-[600]'>Scenario:</span> Buying </li>
                                <li><span className='font-[600]'>Profit Point (A):</span> 10 Rupee</li>
                                <li><span className='font-[600]'>Stoploss Point (B):</span> 5 Rupee</li>
                                <li><span className='font-[600]'>Initial Premium Price:</span> 100 Rupee</li>
                            </ul>
                            <table className='border-2 shadow-lg shadow-blue-500 p-4 m-2 bg-white text-center min-w-full'>
                                <thead>
                                    <tr className="border-2 border-gray-400"><th>S.No</th><th>Time</th><th>Premium</th><th>With Trailing Stoploss</th><th>Without Trailing Stoploss</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="border-2 border-gray-400"><td>1</td><td>09:30</td><td>80</td><td>60</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>2</td><td>10:30</td><td>90</td><td>65</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>3</td><td>11:30</td><td>100</td><td>70</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>4</td><td>12:30</td><td>110</td><td>75</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>5</td><td>13:30</td><td>120</td><td>80</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400 bg-blue-300"><td>6</td><td>14:30</td><td>85</td><td>85</td><td>60</td></tr>
                                </tbody>
                            </table>
                            <li className="font-[600]">Stoploss Hit!!</li>

                            <li className=" font-[600]">b. Example for Sell:</li>
                            <ul className='list-disc ml-5'>
                                <li className=''><span className='font-[600]'>Scenario:</span> Selling</li>
                                <li><span className='font-[600]'>Profit Point (A):</span> 10 Rupee</li>
                                <li><span className='font-[600]'>Stoploss Point (B):</span> 5 Rupee</li>
                                <li><span className='font-[600]'>Initial Premium Price:</span> 100 Rupee</li>
                            </ul>
                            <table className='border-2 shadow-lg shadow-blue-500 p-4 m-2 bg-white text-center min-w-full'>
                                <thead>
                                    <tr className="border-2 border-gray-400"><th>S.No</th><th>Time</th><th>Premium</th><th>With Trailing Stoploss</th><th>Without Trailing Stoploss</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="border-2 border-gray-400"><td>1</td><td>09:30</td><td>80</td><td>100</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>2</td><td>10:30</td><td>70</td><td>95</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>3</td><td>11:30</td><td>60</td><td>90</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>4</td><td>12:30</td><td>50</td><td>85</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>5</td><td>13:30</td><td>40</td><td>80</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400 bg-blue-300"><td>6</td><td>14:30</td><td>70</td><td>75</td><td>100</td></tr>
                                </tbody>
                            </table>
                            <li className="font-[600]">Stoploss Hit!!</li>
                            <li></li>
                        </ol>
                        <li className="font-[600] text-[18px]">2.Trail Stoploss Percent</li>
                        <ol className='m-4'>
                            <li className=" font-[600]">a. Example for Buy:</li>
                            <ul className='list-disc ml-5'>
                                <li className=''><span className='font-[600]'>Scenario:</span> Buying</li>
                                <li><span className='font-[600]'>Profit Point (A):</span> 10%</li>
                                <li><span className='font-[600]'>Stoploss Point (B):</span> 5%</li>
                                <li><span className='font-[600]'>Initial Premium Price:</span> 100 Rupee</li>
                            </ul>
                            <table className='border-2 shadow-lg shadow-blue-500 p-4 m-2 bg-white text-center min-w-full'>
                                <thead>
                                    <tr className="border-2 border-gray-400"><th>S.No</th><th>Time</th><th>Premium</th><th>With Trailing Stoploss</th><th>Without Trailing Stoploss</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="border-2 border-gray-400"><td>1</td><td>09:30</td><td>80</td><td>60</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>2</td><td>10:30</td><td>90</td><td>65</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>3</td><td>11:30</td><td>100</td><td>70</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>4</td><td>12:30</td><td>110</td><td>75</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400"><td>5</td><td>13:30</td><td>120</td><td>80</td><td>60</td></tr>
                                    <tr className="border-2 border-gray-400 bg-blue-300"><td>6</td><td>14:30</td><td>80</td><td>85</td><td>60</td></tr>
                                </tbody>
                            </table>
                            <li className="font-[600]">Stoploss Hit!!</li>
                            <li className=" font-[600]">b. Example for Sell:</li>
                            <ul className='list-disc ml-5'>
                                <li className=''><span className='font-[600]'>Scenario:</span> Selling</li>
                                <li><span className='font-[600]'>Profit Point (A):</span> 10%</li>
                                <li><span className='font-[600]'>Stoploss Point (B):</span> 5%</li>
                                <li><span className='font-[600]'>Initial Premium Price:</span> 100 Rupee</li>
                            </ul>
                            <table className='border-2 shadow-lg shadow-blue-500 p-4 m-2 bg-white text-center min-w-full'>
                                <thead>
                                    <tr className="border-2 border-gray-400"><th>S.No</th><th>Time</th><th>Premium</th><th>With Trailing Stoploss</th><th>Without Trailing Stoploss</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="border-2 border-gray-400"><td>1</td><td>09:30</td><td>80</td><td>100</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>2</td><td>10:30</td><td>70</td><td>95</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>3</td><td>11:30</td><td>60</td><td>90</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>4</td><td>12:30</td><td>50</td><td>85</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400"><td>5</td><td>13:30</td><td>40</td><td>80</td><td>100</td></tr>
                                    <tr className="border-2 border-gray-400 bg-blue-300"><td>6</td><td>14:30</td><td>70</td><td>75</td><td>100</td></tr>
                                </tbody>
                            </table>
                            <li className="font-[600]">Stoploss Hit!!</li>
                        </ol>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-3">
                    <div className="font-[600] text-[18px]">15. Range BreakOut Feature</div>
                    <ul className='ml-5'>
                        <li>The Range Breakout feature determines the direction of trading based on a recorded price range within a specified time frame. It triggers trades based on the high or low of the range and is applicable to tradable instruments and underlying spot prices</li>
                        <li><span className='font-[600]'>Example:</span> 1</li>
                        <li><span className='font-[600] ml-4'>Range Start Time:</span> 09:30</li>
                        <li><span className='font-[600] ml-4'>Range End Time:</span> 09:40</li>
                        <table className='border-2 shadow-lg shadow-blue-500 p-4 m-2 bg-white text-center min-w-full'>
                            <thead><tr className="border-2 border-gray-400"><th>S.No</th><th>Time</th><th>Premium low Price</th><th>Premium High Price</th><th>Premium Closing Prices</th></tr></thead>
                            <tbody>
                                <tr className="border-2 border-gray-400"><td>1</td><td>09:30</td><td>10</td><td>40</td><td>35</td></tr>
                                <tr className="border-2 border-gray-400"><td>2</td><td>09:31</td><td>30</td><td>10</td><td>25</td></tr>
                                <tr className="border-2 border-gray-400"><td>3</td><td>09:32</td><td>5</td><td>60</td><td>45</td></tr>
                                <tr className="border-2 border-gray-400"><td>4</td><td>09:33</td><td>25</td><td>30</td><td>27</td></tr>
                                <tr className="border-2 border-gray-400"><td>5</td><td>09:34</td><td>40</td><td>80</td><td>65</td></tr>
                                <tr className="border-2 border-gray-400"><td>6</td><td>09:35</td><td>18</td><td>20</td><td>20</td></tr>
                                <tr className="border-2 border-gray-400"><td>7</td><td>09:36</td><td>23</td><td>36</td><td>36</td></tr>
                                <tr className="border-2 border-gray-400"><td>8</td><td>09:37</td><td>77</td><td>95</td><td>88</td></tr>
                                <tr className="border-2 border-gray-400"><td>9</td><td>09:38</td><td>34</td><td>35</td><td>34.5</td></tr>
                                <tr className="border-2 border-gray-400"><td>10</td><td>09:39</td><td>38</td><td>76</td><td>48.5</td></tr>
                                <tr className="border-2 border-gray-400"><td>11</td><td>09:40</td><td>23</td><td>34</td><td>28.9</td></tr>
                            </tbody>
                        </table>
                        <div className='rounded-lg border-2 m-2 p-2'>
                            <div className=''><span className='font-[600]'>1. Maximum High Range Value:</span>=95</div>
                            <div className=''><span className='font-[600]'>2. Maximum Low Range Value:</span>=5</div>
                        </div>
                        <table className='border-2 shadow-lg shadow-blue-500 p-4 m-2 bg-white text-center min-w-full mb-10'>
                            <thead>
                                <tr className="border-2 border-gray-400"><th>S.No</th><th>Option</th><th>Start Price</th></tr>
                            </thead>
                            <tbody>
                                <tr className="border-2 border-gray-400"><td>1</td><td className='font-[600]'>Sell </td><td>if Premium is less than the Minimum Low Range value.</td></tr>
                                <tr className="border-2 border-gray-400"><td>2</td><td className='font-[600]'>Buy </td><td>if Premium is greater than the Maximum High Range value.</td></tr>
                            </tbody>
                        </table>
                        <ol className=''>
                            <li className='text-l font-bold'>1.Example 1::</li>
                            <ul className='list-disc ml-5'>
                                <li className=''><span className='font-[600]'>Scenario:</span>Two-leg strategy (Sell Call and Buy Call)</li>
                                <div className='flex flex-row  gap-6'>
                                <li><span className='font-[600]'>Range Start Time:</span>09:15</li>
                                <li><span className='font-[600]'>Range Start Time:</span>09:30</li>
                                <li><span className=''>Initial Future Price (09:15):</span>12037</li>
                                </div>
                                <div className='flex flex-row gap-6'>
                                <li><span className='font-[600]'>Leg: 1</span>  (Sell Call)</li>
                                <li><span className='font-[600]'>Strike Price:</span> 12050</li>
                                <li><span className='font-[600]'>Low Value:</span> 85</li>
                                <li><span className='font-[600]'>High Value:</span> 120</li>
                                </div>
                                <div className='flex flex-row  gap-6'>
                                <li><span className='font-[600]'>Leg: 2</span> (Buy Call)</li>
                                <li><span className='font-[600]'>Strike Price:</span> 12050</li>
                                <li><span className='font-[600]'>Low Value:</span> 70</li>
                                <li><span className='font-[600]'>High Value:</span> 105</li>
                                </div>
                            </ul>
                            <li className='text-l font-bold'>2.Example 2::</li>
                            <ul className='list-disc ml-5'>
                                <li><span className='font-[600]'>Scenario:</span> Two-leg strategy (Sell Call with Closest Premium ~ 100 and Buy Call with Closest Premium &ge; 100)</li>
                                <div className='flex flex-row  gap-6'>
                                <li><span className='font-[600]'>Range Start Time:</span> 09:15</li>
                                <li><span className='font-[600]'>Range End Time:</span> 09:30</li>
                                <li><span className='font-[600]'>Closest Premium of Leg 1:</span> 12100</li>
                                <li><span className='font-[600]'>Closest Premium of Leg 2:</span> 12050</li>
                                </div>
                                <div className='flex flex-row  gap-6'>
                                <li><span className='font-[600]'>Leg: 1</span> (Sell Call)</li>
                                <li><span className='font-[600]'>Strike Price:</span> 12100</li>
                                <li><span className='font-[600]'>Low Value:</span> 85</li>
                                <li><span className='font-[600]'>High Value:</span> 120</li>
                                </div>
                                <div className='flex flex-row  gap-6'>
                                <li><span className='font-[600]'>Leg: 2</span> (Buy Call)</li>
                                <li><span className='font-[600]'>Strike Price:</span> 12050</li>
                                <li><span className='font-[600]'>Low Value:</span> 70</li>
                                <li><span className='font-[600]'>High Value:</span> 105</li>
                                </div>
                            </ul>
                        </ol>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-3">
                    <div className="font-[600] text-[18px]">16.Monthly Expiry with Positional Trading</div>
                    <ul className='ml-5 mb-10'>
                        <li>In positional trading, the approach to monthly and weekly expiries differs slightly. With monthly expiry, the entire month is considered, while with weekly expiry, only one week is taken into account.</li>
                        <li className='font-[600]'>Key Points:</li>
                        <ul className='list-disc ml-5'>
                            <li><span className='font-[600]'>Application:</span> Monthly expiry applies when all legs have monthly expiry; otherwise, it defaults to one week.</li>
                            <li><span className='font-[600]'>Entry Criteria:</span> Trades are initiated on the start day (x days before expiry) and at the specified start time.</li>
                            <li><span className='font-[600]'>Exit Criteria:</span> Market exits occur when the strategy reaches its profit or stop loss targets, reaches the end day, reaches expiry, or when all legs have been squared off (excluding re-entry scenarios).</li>
                        </ul>
                    </ul>
                    <div className=''>This approach ensures a methodical and strategic trading process, optimizing trade execution within the context of monthly expiries while accommodating for specific entry and exit conditions</div>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">17.The formula to calculate the Rate of Interest (ROI) is expressed as follows:</div>
                    <ul className='ml-5'>
                        <li>
                            Rate of Interest(ROI)= (Profit/Margin)*100
                        </li>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">18.Forex trading -- Gold Terminology:</div>
                    <ul className='ml-5'>
                        <li> a) In this trading,we will initiate the transaction at start time. </li>
                        <li> b) If target difference got then we will buy it. </li>
                        <li> c) If target profit got then we will sell it. </li>
                        <li> d) At the expiry , we will forward pending trade to next expiry month.(This is called rollOver.) </li>
                        <li> e) so ,There is two profit . i) Booked Profit ii) RollOver Profit</li>
                    </ul>
                </div>
                <div className="shadow-md bg-white m-4 rounded-xl p-2">
                    <div className="font-[600] text-[18px]">18.Future and Option Series Trading:</div>
                    <ul className='ml-5'>
                        <li> a) In this trading,we will initiate the transaction at start time. </li>
                        <li> b) If target difference got then we will buy it. </li>
                        <li> c) If target profit got then we will sell it. </li>
                        <li> d) At the expiry , we will forward pending trade to next expiry month.(This is called rollOver.) </li>
                        <li> e) so ,There is two profit . i) Booked Profit ii) RollOver Profit</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Notes