import notify from './../assets/notification.webp';
import botToken from '../../Notification/assets/newBot.webp';
import botFather from '../../Notification/assets/bot_father.webp';
import newBot from '../../Notification/assets/bot.webp';
import startNotification from '../../Notification/assets/start_notification_process.webp'
import detach from './../assets/detach.webp';

const Notification = () => {
    return (
        <section className="mb-8">
            {/* Notification Title */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h2>

            {/* Error Notifications */}
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                <strong className="font-bold">Error Notification</strong>
                <span className="block sm:inline"> Something went wrong! Please try again.</span>
            </div>

            {/* Success Notification */}
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
                <strong className="font-bold">Success Notification</strong>
                <span className="block sm:inline"> Your order has been placed successfully!</span>
            </div>

            {/* Telegram Bot Reporting */}
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-6">
                <strong className="font-bold">Telegram Bot Reporting</strong>
                <p className="mt-2">
                    Stay updated by receiving notifications and reports via our Telegram bot. This bot will inform you about order statuses, trading reports, and more, directly on your Telegram account.
                </p>
                <img src={notify} alt="Telegram Bot Notification" className="rounded-lg shadow-md mt-4 max-w-full" />
            </div>

            {/* Setting up Telegram Bot */}

            <div className="border-[1px] border-blue-600 rounded-lg p-6">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">How to Enable Telegram Notifications</h2>

                {/* Step 1: Create a Telegram Bot */}
                <div className="mb-8 text-xl">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Create a Telegram Bot</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                        <li>
                            Open the <a href="https://telegram.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">BotFather</a> in Telegram, or search for the user “<span className="font-semibold text-blue-600">BotFather</span>”.
                        </li>
                        <img src={botFather} alt="Bot Father" className="h-full mx-auto rounded-md shadow mb-4" />

                        <li>
                            Click the <span className="font-semibold">START</span> button in the chat to view the list of available commands.
                        </li>

                        <li>
                            Type <span className="font-semibold">/newbot</span> and follow the instructions to create your bot.
                        </li>
                        <img src={startNotification} alt="Start Notification" className="h-full w-[300px] mx-auto rounded-md shadow mb-4" />

                        <li>
                            Name your bot <span className="font-semibold text-blue-600">“Fprognos Notifications”</span>.
                        </li>
                        <li>
                            Choose a unique username for your bot, ending with “Bot”, for example, <span className="font-semibold text-blue-600">“Fprognos_Notifications_RLSMHBot”</span>.
                        </li>
                        <li>
                            Once your bot is created, you will receive the <span className="font-semibold text-blue-600">Bot link</span> and <span className="font-semibold text-blue-600">Bot token</span>.
                        </li>
                        <img src={botToken} alt="Bot Token" className="h-full w-[300px] mx-auto rounded-md shadow mb-4" />
                    </ol>
                </div>

                {/* Step 2: Configure the Bot with Fprognos */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Configure the Bot with Fprognos</h3>
                    <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                        <li>
                            Open the bot link you received, for example <span className="text-blue-600 font-semibold">“t.me/Fprognos_Notifications_RLSMHBot”</span>, and click <span className="font-semibold">START</span> to activate the bot.
                        </li>
                        <li>
                            Copy the <span className="font-semibold text-blue-600">Bot token</span> from the last message in BotFather and paste it into the text box on the Fprognos Telegram Notifications page.
                        </li>
                        <li>
                            If you encounter an error like <span className="font-semibold text-red-500">"Unable to access telegram bot. Please verify token"</span>, go back to the bot and click <span className="font-semibold">/start</span> again before saving the token.
                        </li>
                        <li>
                            Once the token is saved correctly, you will see <span className="font-semibold text-green-600">“Enabled”</span> along with your Telegram username and bot name. You will also receive a confirmation message on Telegram, such as: <span className="font-semibold">“Hello {`{your_username}`}. Telegram notifications are now activated for your Fprognos account”</span>.
                        </li>
                        <img src={newBot} alt="New Bot" className="h-full w-[300px] mx-auto rounded-md shadow" />
                    </ol>
                </div>
            </div>

            {/* Detach and Deactivate */}
            <div className="bg-blue-100 border border-blue-400 mt-5 text-blue-700 px-4 py-3 rounded relative mb-6">
                <strong className="font-bold">Detach and Deactivate</strong>
                <p className="mt-2">If you wish to close the Telegram notifications, please click on the "Detach" and "Deactivate" buttons to disable the notifications.</p>
                <img src={detach} alt="Disconnect Notification" className="rounded-lg shadow-md mt-4 max-w-full" />
            </div>

        </section>

    )
}

export default Notification