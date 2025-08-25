import React from "react";
import { CheckCircle } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-medical-dark flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-medical-dark to-medical-surface p-12 flex-col justify-center relative overflow-hidden">
        {/* Logo and Branding */}
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <div className="relative">
              <CheckCircle className="w-12 h-12 text-dr-green" />
            </div>
            <h1 className="ml-3 text-3xl font-bold text-medical-text">
              Dr. Check
            </h1>
          </div>

          <h2 className="text-2xl font-semibold text-medical-text mb-4 leading-tight">
            Sua clínica organizada,
            <br />
            seus pacientes mais felizes.
          </h2>

          {/* Doctor Illustration Placeholder */}
          <div className="mt-12 relative">
            <div className="w-80 h-80 mx-auto relative">
              {/* Doctor Silhouette */}
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full text-medical-text-muted opacity-30"
                fill="currentColor"
              >
                {/* Computer/Chart Background */}
                <rect
                  x="20"
                  y="80"
                  width="100"
                  height="80"
                  rx="8"
                  className="stroke-current fill-none stroke-2"
                />
                <line
                  x1="35"
                  y1="95"
                  x2="85"
                  y2="95"
                  className="stroke-current stroke-2"
                />
                <line
                  x1="35"
                  y1="105"
                  x2="75"
                  y2="105"
                  className="stroke-current stroke-2"
                />
                <line
                  x1="35"
                  y1="115"
                  x2="80"
                  y2="115"
                  className="stroke-current stroke-2"
                />
                <line
                  x1="35"
                  y1="125"
                  x2="70"
                  y2="125"
                  className="stroke-current stroke-2"
                />
                <line
                  x1="35"
                  y1="135"
                  x2="85"
                  y2="135"
                  className="stroke-current stroke-2"
                />
                <line
                  x1="35"
                  y1="145"
                  x2="75"
                  y2="145"
                  className="stroke-current stroke-2"
                />

                {/* Doctor Figure */}
                <circle
                  cx="200"
                  cy="100"
                  r="35"
                  className="stroke-current fill-none stroke-2"
                />
                {/* Glasses */}
                <circle
                  cx="190"
                  cy="95"
                  r="8"
                  className="stroke-current fill-none stroke-2"
                />
                <circle
                  cx="210"
                  cy="95"
                  r="8"
                  className="stroke-current fill-none stroke-2"
                />
                <line
                  x1="198"
                  y1="95"
                  x2="202"
                  y2="95"
                  className="stroke-current stroke-2"
                />

                {/* Body */}
                <path
                  d="M 160 140 Q 200 135 240 140 L 240 240 Q 200 245 160 240 Z"
                  className="stroke-current fill-none stroke-2"
                />

                {/* Lab Coat */}
                <path
                  d="M 170 150 L 170 200 M 230 150 L 230 200"
                  className="stroke-current stroke-2"
                />
                <path
                  d="M 180 160 L 220 160"
                  className="stroke-current stroke-2"
                />

                {/* Stethoscope */}
                <path
                  d="M 185 170 Q 180 180 175 190 Q 170 200 175 210"
                  className="stroke-current fill-none stroke-2"
                />
                <circle
                  cx="175"
                  cy="215"
                  r="5"
                  className="stroke-current fill-none stroke-2"
                />
                <path
                  d="M 185 170 Q 200 165 215 170"
                  className="stroke-current fill-none stroke-2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-dr-green opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-dr-turquoise opacity-5 rounded-full blur-2xl"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-medical-surface border border-medical-border rounded-2xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-medical-text mb-8 text-center">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
