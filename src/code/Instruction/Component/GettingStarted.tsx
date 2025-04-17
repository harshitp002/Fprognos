import home from './../assets/home.webp';
import login from './../assets/login.webp';
import signup from './../assets/register.webp';
import forget from './../assets/forget.webp';
import terms from './../assets/terms.webp';
import plan from './../assets/plan.webp'

const GettingStarted = () => {
  return (
    <div className="p-4">

      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Getting Started</h2>

        <h3 className="text-2xl font-semibold mb-4 text-gray-700">How to Begin with Fprognos</h3>
        
        <ol className="list-decimal list-inside mb-6 space-y-8">

          {/* Step 4: Homepage */}
          <li className="text-lg text-gray-700">
            Firstly,Visit <a href="https://fprognos.com" className="text-blue-600 underline">Fprognos.com</a> then there is two option,One is Start Trading and another is start Backtesting.If you want to do trade then Click of 
            Start Trading button then you will visit at login.If you have already registered user then login here,visit at trading platform and If Not then click on signup button to visite signup Page.
            <div className="mt-4">
              <img src={home} alt="Homepage screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </li>

          {/* Step 1: Sign Up */}
          <li className="text-lg text-gray-700">
            This is the registration page where you will register on our platform and you will also get confirmation of email from official email.
            <div className="mt-4">
              <img src={signup} alt="Sign Up page screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </li>

          {/* Step 2: Accept Terms and Conditions */}
          <li className="text-lg text-gray-700">
            You have to accept terms and condition to registeration.This is compulsory for all user.
            <div className="mt-4">
              <img src={terms} alt="Terms and Conditions page screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </li>

          {/* Step 3: Log In */}
          <li className="text-lg text-gray-700">
            This is the login page where you will enter the credential then visit the trading platform.
            <div className="mt-2 text-gray-500">
              If you've forgotten your password, you can reset it here:
              <a href="https://fprognos.com/forget_password" className="text-blue-600 underline ml-1">Forgot Password?</a>
            </div>
            <div className="mt-4">
              <img src={login} alt="Login page screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </li>

          

          {/* Step 5: Forgot Password */}
          <li className="text-lg text-gray-700">
            If you forget your password, Then you have to visit this page.
            <a href="https://fprognos.com/forget_password" className="text-blue-600 underline ml-1">Forgot Password page</a>.
            <div className="mt-4">
              <img src={forget} alt="Forgot Password page screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </li>

          {/* step 6: Subscribe to paid plan */}
          <li className="text-lg text-gray-700">
             Click on Buy Coin button or visit.
            <a href="https://fprognos.com/plan" className="text-blue-600 underline ml-1">Buy Plan</a>.
            <div className="mt-4">
              <img src={plan} alt="Forgot Password page screenshot" className="rounded-lg shadow-md max-w-full" />
            </div>
          </li>
        </ol>
      </section>


    </div>
  );
};

export default GettingStarted;
