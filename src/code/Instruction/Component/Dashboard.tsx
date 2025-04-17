import rename from './../assets/Rename.webp';
import enable from './../assets/enable.webp';
import duplicate from './../assets/duplicate.webp';
import detail from './../assets/detail.webp';
import indexprice from './../assets/indexprice.webp';
import openstrategy from './../assets/openStrategy.webp';
import strategy from './../assets/strategy.webp'

const Dashboard = () => {
  return (
    <>
      <section className="mb-8">
        {/* Dashboard Title */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

        {/* Introduction */}
        <p className="text-lg text-gray-700 mb-4">
          The dashboard provides a comprehensive view of various indices, strategy details, and configuration options. Below are the main components displayed on your dashboard:
        </p>

        {/* Index Price Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Index Price</h3>
          <p className="text-lg text-gray-700 mb-4">
            This section shows the real-time price of various stock market indices. Users can track index movements and monitor market trends.
          </p>
          <div className="mt-4">
            <img src={indexprice} alt="Index Price screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>

        {/* Detailed Information Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Detailed Information</h3>
          <p className="text-lg text-gray-700 mb-4">
            The details section provides additional insights into the selected index, including historical performance, market news, and analysis.
          </p>
          <div className="mt-4">
            <img src={detail} alt="Detail section screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>

        {/* Strategy Overview */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Strategy Overview</h3>
          <p className="text-lg text-gray-700 mb-4">
            Review the overall strategy setup to ensure everything is correctly configured. This overview helps you finalize and confirm your strategy before applying it.
          </p>
          <div className="mt-4">
            <img src={strategy} alt="Strategy overview screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>

        {/* Strategy Management Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Strategy Management</h3>
          <p className="text-lg text-gray-700 mb-4">
            The dashboard allows users to manage their trading strategies. Users can view their active strategies and configure settings.
          </p>
          <div className="mt-4">
            <img src={openstrategy} alt="Strategy section screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>

        {/* Enable/Disable Features Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Enable or Disable Features</h3>
          <p className="text-lg text-gray-700 mb-4">
            This section provides options to enable or disable specific features or strategies as per user preferences.
          </p>
          <div className="mt-4">
            <img src={enable} alt="Enable features screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>

        {/* Duplicate Strategy Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Duplicate Strategies</h3>
          <p className="text-lg text-gray-700 mb-4">
            Users can duplicate an existing strategy with ease, allowing them to modify or backtest without affecting the original one.
          </p>
          <div className="mt-4">
            <img src={duplicate} alt="Duplicate strategy screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>

        {/* Rename Strategy Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Rename Strategies</h3>
          <p className="text-lg text-gray-700 mb-4">
            Easily rename your strategies to keep them organized and clearly identified for future reference.
          </p>
          <div className="mt-4">
            <img src={rename} alt="Rename strategy screenshot" className="rounded-lg shadow-md max-w-full" />
          </div>
        </div>
      </section>

    </>
  )
}

export default Dashboard