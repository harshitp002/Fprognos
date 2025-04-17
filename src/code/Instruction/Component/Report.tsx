import report from './../assets/report.jpg';
import report1 from './../assets/report1.webp';

const Report = () => {
    return (
        <>
            <div className="font-bold text-3xl mb-6">Trade Report Download</div>

            {/* Section Introduction */}
            <section className="mb-6">
                <p className="text-lg mb-4">
                    On this page, you can download trading reports for a specific date or a range of dates.
                    The report contains detailed information about your trades, including entry, exit, profit/loss, and more.
                </p>
                <img src={report} alt="Report Example" className="mb-4" />
            </section>

            {/* How to Download Reports Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">How to Download Your Report</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Select a specific date or a range of dates for which you want to download the report.</li>
                    <li>Click on the <span className="font-semibold">Download Report</span> button to generate your trade details report.</li>
                    <li>The report will be downloaded in a PDF format, containing all relevant trading data.</li>
                </ol>
                <img src={report1} alt="Date Range Selector Example" className="mb-4" />
            </section>

            {/* Additional Details Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">What’s Included in the Report</h2>
                <p className="mb-4">
                    The report includes detailed trading information, such as:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Date and time of trades</li>
                    <li>Entry and exit prices</li>
                    <li>Profit or loss for each trade</li>
                    <li>Total cumulative profit or loss</li>
                    <li>Trading strategy used (if applicable)</li>
                </ul>
            </section>
        </>

    )
}

export default Report