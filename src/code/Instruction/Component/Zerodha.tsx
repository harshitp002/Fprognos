import broker from './../assets/Broker.webp';
import iifl from './../assets/iifl.webp';
import zerodha from './../assets/zerodha.webp';
import create_app from './../assets/ZERODHA/create_app.webp';
import kite_billing from './../assets/ZERODHA/kit_billing.webp';
import kite_app from './../assets/ZERODHA/kite_app.webp';
import kite_connect from './../assets/ZERODHA/kite_connect.webp';
import kite_signup from './../assets/ZERODHA/kite_signup.webp';

const Zerodha = () => {
    return (
        <>
            <div className=''>
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Zerodha Broker Setup</h2>

                    {/* Zerodha Section */}
                    <div className="mb-10">
                        <p className="text-lg text-gray-700 mb-4">
                            Zerodha is a popular discount brokerage firm in India, known for its low fees and advanced trading platforms. They offer a robust API for algorithmic trading, available through their Kite platform.
                        </p>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">Steps to Set Up API with Zerodha:</h4>
                        <ol className="list-decimal list-inside text-lg text-gray-700 mb-6 space-y-3">
                            <li>Register for a Zerodha account at <a href="https://kite.zerodha.com/" className="text-blue-600 underline">https://kite.zerodha.com/</a></li>
                            <div className='flex flex-row flex-wrap'>
                            <img src={kite_connect}/>
                            <img src={kite_signup}/>
                            </div>
                            
                            <li>Subscribe to Zerodha's API service, which costs ₹2000 per month.</li>
                            <img src={kite_billing}/>
                           
                            <li>Generate your API key and secret from the Zerodha Developer Console.</li>
                            
                            <img src={create_app}/>
                            <li>Integrate the API keys with your trading platform to begin placing trades.</li>
                            <img src={kite_app}/>
                            <li>Ensure all API settings are correctly configured for optimal performance.</li>
                        </ol>
                        <div className="mt-6">
                            <img src={zerodha} alt="Zerodha setup screenshot" className="rounded-lg shadow-md max-w-full" />
                        </div>
                    </div>

                    {/* Broker Setup on Website Section */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Setting Up a Broker on Our Platform</h3>
                        <p className="text-lg text-gray-700 mb-4">
                            To set up a broker on our website, follow these steps:
                        </p>
                        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-3">
                            <li>Log in to your account on our platform.</li>
                            <li>Navigate to the "Broker Setup" section under your account settings.</li>
                            <li>Select the broker (IIFL or Zerodha) that you want to integrate.</li>
                            <li>Enter your broker API keys and other required information.</li>
                            <li>Save the configuration, and your broker will be linked to your account for trading.</li>
                        </ol>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Zerodha