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
          </p>
          {/* Button */}
          <SignInButton>
            <button className="mr-6 inline-block items-center rounded-md bg-black px-8 py-4 text-center font-semibold text-white lg:mr-8">
              Sign In
            </button>
          </SignInButton>
        </div>
        {/* List */}
        <ul className="mt-16 grid gap-8 sm:mt-24 sm:grid-cols-2 md:grid-cols-4 md:gap-12 lg:gap-16">
          <li className="flex items-center justify-center">
            <img
              src="https://logos-world.net/wp-content/uploads/2022/02/UC-Berkeley-Symbol.png"
              alt="UC Berkeley"
              className="inline-block h-12 md:h-16 lg:h-20"
            />
          </li>
          <li className="flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Yale_University_logo.svg/800px-Yale_University_logo.svg.png"
              alt="Yale"
              className="inline-block h-12 md:h-16 lg:h-20"
            />
          </li>
          <li className="flex items-center justify-center">
            <img
              src="https://1000logos.net/wp-content/uploads/2022/08/NYU-Logo.png"
              alt="NYU"
              className="inline-block h-12 md:h-16 lg:h-20"
            />
          </li>
          <li className="flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Harvard_University_logo.svg/2560px-Harvard_University_logo.svg.png"
              alt="Harvard"
              className="inline-block h-12 md:h-16 lg:h-20"
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
