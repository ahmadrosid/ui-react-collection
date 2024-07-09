import React from 'react';
import { Github, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="flex h-screen bg-transparent text-white">
      {/* Left side with background image and quote */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-[url('https://images.unsplash.com/photo-1611348586755-53860f7ae57a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center relative">
            <div className="bg-gray-900/50 absolute inset-0" /> 
            <div className='isolate'>
              <h1 className="text-3xl font-bold">Reflect</h1>
            </div>
            <div className='isolate'>
              <p className="text-sm italic">
                "By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest."
              </p>
            </div>
      </div>

      {/* Right side with login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-gray-900">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <p className="mb-8">Start your reflection journey</p>

          <div className="flex gap-4 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-600 rounded-md hover:bg-gray-800">
              <Github size={20} />
              Github
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-600 rounded-md hover:bg-gray-800">
              <span className="font-bold text-lg">G</span>
              Google
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">or</span>
            </div>
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
            >
              Continue
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;