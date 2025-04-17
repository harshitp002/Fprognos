
const HelpSupport = () => {
    return (
        <section className="mb-8 p-6 bg-white shadow-md rounded-lg">
            {/* Help and Support Title */}
            <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">Help & Support</h2>

            {/* Introduction Section */}
            <p className="text-lg text-gray-700 mb-6 text-center">
                Welcome to the Fprognos Help & Support page. If you need assistance, you’re in the right place! We are here to help you with any queries or issues you may have.
            </p>

            {/* Support Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="p-6 border rounded-lg bg-blue-50">
                    <h3 className="text-2xl font-semibold mb-4">Account Setup</h3>
                    <p className="text-gray-700 mb-4">Learn how to create and manage your account on Fprognos, update your profile, and secure your account settings.</p>
                    <a href="#" className="text-blue-500 font-medium">Learn more &rarr;</a>
                </div>

                <div className="p-6 border rounded-lg bg-green-50">
                    <h3 className="text-2xl font-semibold mb-4">Broker Integration</h3>
                    <p className="text-gray-700 mb-4">Get detailed steps on how to integrate and set up your brokers (IIFL, Zerodha, etc.) with our platform.</p>
                    <a href="#" className="text-blue-500 font-medium">Learn more &rarr;</a>
                </div>

                <div className="p-6 border rounded-lg bg-yellow-50">
                    <h3 className="text-2xl font-semibold mb-4">Backtesting & Strategies</h3>
                    <p className="text-gray-700 mb-4">Learn how to create, backtest, and compare strategies for optimized trading performance.</p>
                    <a href="#" className="text-blue-500 font-medium">Learn more &rarr;</a>
                </div>

                <div className="p-6 border rounded-lg bg-purple-50">
                    <h3 className="text-2xl font-semibold mb-4">Reports & Analytics</h3>
                    <p className="text-gray-700 mb-4">Get help on generating, downloading, and understanding detailed reports of your trading activity.</p>
                    <a href="#" className="text-blue-500 font-medium">Learn more &rarr;</a>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-10">
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions (FAQs)</h3>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">How do I reset my password?</h4>
                    <p className="text-gray-700">
                        You can reset your password by visiting the <a href="https://fprognos.com/forget_password" className="text-blue-500">Forgot Password</a> page and following the instructions.
                    </p>
                </div>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">How do I set up a new broker on the platform?</h4>
                    <p className="text-gray-700">
                        To set up a new broker, navigate to the Broker section on your dashboard and follow the on-screen prompts. You can also visit the <a href="#" className="text-blue-500">Broker Setup Guide</a> for detailed instructions.
                    </p>
                </div>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">How can I contact support for more assistance?</h4>
                    <p className="text-gray-700">
                        If you need further assistance, you can contact us by emailing <a href="mailto:support@fprognos.com" className="text-blue-500">support@fprognos.com</a> or by using the contact form below.
                    </p>
                </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
                <h3 className="text-3xl font-bold mb-6 text-gray-800">Contact Support</h3>
                <p className="text-gray-700 mb-6">If you didn’t find the answer to your question, feel free to reach out to our support team directly by filling out the form below.</p>

                <form action="#" method="POST" className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Your Name</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Email Address</label>
                        <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Your Message</label>
                        <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
                        Send Message
                    </button>
                </form>
            </div>
        </section>

    )
}

export default HelpSupport