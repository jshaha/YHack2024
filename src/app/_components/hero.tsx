import { SignInButton } from "@clerk/nextjs";

export default function Hero() {
    return (
        <header>
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            The Efficient, Adaptive, and Interactive Lecture Platform
          </h1>
          <p className="mb-6 text-sm text-gray-500 sm:text-xl lg:mb-8">
            Transform your class slides into engaging, professor-like lectures accessible from anywhere, anytime. Whether you're a student, professional, or lifelong learner, our AI-driven platform brings your learning materials to life. Experience personalized, interactive lessons tailored to you.
          {/* Button */}
          <SignInButton>
                <button className="mr-6 inline-block items-center rounded-md bg-black px-8 py-4 text-center font-semibold text-white lg:mr-8">Sign In</button>
            </SignInButton>
        </div>
        {/* List */}
        <ul className="mt-16 grid gap-8 sm:mt-24 sm:grid-cols-3 sm:gap-12 md:grid-cols-5 md:gap-4">
          <li className="flex items-center justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FMicrosoft%20Logo.svg?alt=media&token=d9a0206b-8dfa-407e-af77-5c5d33abfbb3"
              alt=""
              className="inline-block h-9"
            />
          </li>
          <li className="flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FPayPal%20Logo.svg?alt=media&token=73b2c12b-b86c-4e6c-8158-ea096d5bacb5"
              alt=""
              className="inline-block h-9"
            />
          </li>
          <li className="flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FGroup.svg?alt=media&token=a908887b-af31-4e54-997a-d5e4dc3be56a"
              alt=""
              className="inline-block h-9"
            />
          </li>
          <li className="flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FChase%20Logo.svg?alt=media&token=f179fc6d-e765-4969-8966-62ff6ec35e8f"
              alt=""
              className="inline-block h-9"
            />
          </li>
          <li className="flex justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flowspark-1f3e0.appspot.com/o/Tailspark%20Images%2FWalmart%20Logo.svg?alt=media&token=614d63e8-5961-4c97-8dc5-cf69669c3848"
              alt=""
              className="inline-block h-9"
            />
          </li>
        </ul>
      </div>
    </header>
        
        )}
