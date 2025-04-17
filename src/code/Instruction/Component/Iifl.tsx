import iifl from './../assets/iifl.webp';
import s from './../assets/IIFL/iifl.webp';
import create_app from './../assets/IIFL/iifl_create_app.webp';

const Iifl = () => {
  return (
    <>
      <div className=''>
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">IIFL Broker Setup</h2>


          {/* IIFL Section */}
          <div className="mb-10">
            <p className="text-lg text-gray-700 mb-4">
              IIFL (India Infoline Limited) is one of the largest brokerage firms in India, providing services for stock trading, commodity trading, and more. To access their API, they provide a platform called TTBlaze.
            </p>
            <div className=" text-gray-700">
              <h2 className="text-2xl font-semibold mb-4">Important Points for IIFL F&O Activation and BLAZE API Setup (for Fprognos Integration)</h2>

              <div>
                <h3 className="text-lg font-semibold">I. Ensure F&O Segment Activation for IIFL Account</h3>
                <p className="mt-2">
                  <strong>Activate F&O Segment:</strong>
                  <br />Login to IIFL’s TTWEB terminal:
                  <a href="https://ttweb.indiainfoline.com" className="text-blue-600 underline">https://ttweb.indiainfoline.com</a>
                  <br />Navigate to: <strong>Dashboard {'>'} My Account {'>'} My Details {'>'} Derivatives Activation</strong> and ensure the F&O segment is enabled.
                </p>
                <img src={s} className='m-2'/>
              </div>

              <div>
                <h3 className="text-lg font-semibold">II. Using IIFL BLAZE System for Fprognos</h3>
                <p className="mt-2">
                  <strong>Trading Execution via BLAZE:</strong>
                  <br />For all trades associated with Fprognos, manual or algorithmic, you must use IIFL's BLAZE (Symphony XTS API) system. The IIFL TTWEB platform or any other trading system cannot be used for this purpose. BLAZE will serve as the exclusive gateway for executing orders.
                </p>
                <p className="mt-2">
                  <strong>Fund Transfers:</strong>
                  <br />Pay-in and pay-out of funds will be handled exclusively through the BLAZE terminal’s back office:
                  <a href="https://ttblaze.iifl.com" className="text-blue-600 underline">https://ttblaze.iifl.com</a>
                </p>
                <img src={create_app} />
              </div>

              <div>
                <h3 className="text-lg font-semibold">Activating IIFL BLAZE Terminal & API Services for Fprognos</h3>

                <div className="ml-4 mt-2">
                  <h4 className="font-semibold">Step 1: Activating BLAZE Terminal</h4>
                  <ul className="list-disc ml-6">
                    <li>
                      <strong>Email IIFL Support for Activation:</strong> Send an email to <a href="mailto:ttblazesupport@iifl.com" className="text-blue-600 underline">ttblazesupport@iifl.com</a> from your registered email address requesting activation of the BLAZE system for your account.
                      <br />Attach the required Excel sheet containing your account details. Download the sheet here: <a href="https://bit.ly/3H0GDD3" className="text-blue-600 underline">bit.ly/3H0GDD3</a>
                    </li>
                    <li>
                      <strong>Receive Credentials:</strong> IIFL will send you an email with the login credentials (client ID and password) around 5:30 PM on the same day. These credentials will grant you access to the BLAZE web terminal, along with download links for the mobile apps (iOS, Android) and desktop version.
                    </li>
                  </ul>
                </div>

                <div className="ml-4 mt-4">
                  <h4 className="font-semibold">Step 2: Activating API Services for Fprognos</h4>
                  <ul className="list-disc ml-6">
                    <li>
                      <strong>Register for BLAZE API:</strong> After receiving the BLAZE login credentials, visit
                      <a href="https://ttblaze.iifl.com/dashboard" className="text-blue-600 underline">https://ttblaze.iifl.com/dashboard</a> and click on ‘Create an Account’. Enter your IIFL client ID as the user ID, create a password, and complete the signup process.
                    </li>
                    <li>
                      <strong>Login to API Dashboard:</strong> Once registered, log in and proceed to create two separate API applications:
                      <ul className="ml-6">
                        <li>Interactive Order API</li>
                        <li>Market Data API</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Step 1: Setting Up API Applications</h3>
                <p className="mt-2">
                  <strong>Create New API Apps:</strong>
                  <br />Log in to the BLAZE API Dashboard and click <strong>My App {'>'} Create New Application</strong>. Provide details such as App name, description, and select the appropriate API package (Interactive Order API or Market Data API). Submit the form.
                </p>
                <p className="mt-2">
                  <strong>Activation Timeline:</strong>
                  <br />New API apps will initially show as Deactive. It may take up to 24 hours for the broker to activate the API. The status will change to Active once it is fully set up.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Integrating IIFL Broker with Fprognos</h3>
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    <strong>Input API Credentials:</strong> After activation, go to the Broker Setup page in Fprognos. Enter your IIFL Client ID, Interactive Order API Key & Secret, and Market Data API Key & Secret.
                  </li>
                  <li>
                    <strong>Save and Proceed:</strong> Once the details are entered, click Save and navigate to the broker login section to proceed.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Common Error & Resolution</h3>
                <p className="mt-2">
                  <strong>Error:</strong> Gateway: Exchange Details is Missing
                </p>
                <p className="mt-2">
                  <strong>Solution:</strong> Retrieve RM details from TTWEB Terminal under <strong>My Account {'>'} Profile {'>'} RM & Branch Details</strong>. Contact your RM to activate the F&O segment for BLAZE/XTS, then retry the integration.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <img src={iifl} alt="IIFL setup screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </div>

        </section>

      </div>
      </>
  )
}

export default Iifl