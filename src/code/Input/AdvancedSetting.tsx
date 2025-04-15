
const AdvancedSetting = ({reExecuteMethod,setReExecuteMethod}:any) => {

    return (
        <>
            <div className="p-2 m-1 bg-white shadow rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Advanced Settings</h2>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-600">Re-Execute Method</label>
                        <select
                            className="w-[200px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                            value={reExecuteMethod}
                            onChange={(e: any) =>setReExecuteMethod(e.target.value)}
                        >
                            <option value="LTP">LTP</option>
                            <option value="CANDLE_CLOSE">CANDLE CLOSE</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvancedSetting