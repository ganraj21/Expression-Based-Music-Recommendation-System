import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
// import InnerFrontPage from './../Page/InnerFrontPage';
import 'react-phone-input-2/lib/style.css';
import { useState, useEffect } from 'react';
import { auth } from './../firebase.config';
import './../App.css';

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const Phone_Auth = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVarify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSignup();
          },
          'expired-callback': () => {},
        }
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVarify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+' + ph;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sended Successfully !');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res.user);
        setUser(res.user);
        setLoading(false);
        localStorage.setItem('User-Phone', res.user);
      })
      .catch((err) => {
        setLoading(false);
        toast.error('OTP Invalid');
      });
  }

  useEffect(() => {
    if (localStorage.getItem('User-Phone')) {
      setUser(localStorage.getItem('User-Phone'));
    }
  }, []);
  return (
    <section className="phone_container bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />

        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            Login Successfull👍
            {/* <InnerFrontPage /> */}
          </h2>
        ) : (
          <div className="ph_container">
            <div className="form_container">
              <div className="w-90 flex flex-col gap-4 rounded-lg p-4">
                <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                  Welcome to <br />
                  Music Recomender AI
                </h1>
                {showOTP ? (
                  <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-white text-center"
                    >
                      Enter your OTP
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      OTPLength={6}
                      otpType="number"
                      disable={false}
                      autoFocus
                      className="otp-container"
                    ></OtpInput>
                    <button
                      onClick={onOTPVerify}
                      className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={21} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                      <BsTelephoneFill size={30} />
                    </div>
                    <label
                      htmlFor="ph"
                      className="font-bold text-xl text-white text-center"
                    >
                      Verify your phone number
                    </label>
                    <PhoneInput country={'in'} value={ph} onChange={setPh} />
                    <button
                      onClick={onSignup}
                      className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Send code via SMS</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </section>
  );
};

export default Phone_Auth;
