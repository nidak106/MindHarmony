import React from "react";
import { Menu, ArrowLeft, Calendar, Users, Phone, Heart } from "lucide-react";

// Renamed from App to HeroSection for clarity and consistency with App.jsx import
export default function HeroSection({ setCurrentView, isAuthenticated }) {

  return (
    <div className="min-h-screen bg-cream-50 text-gray-800 antialiased flex flex-col">
      {/* Full-width hero with background image */}
     <header
  className="relative min-h-[65vh] md:min-h-screen flex flex-col justify-center bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/hero-bg.png')" }}
>
  {/* White overlay for readability */}
  <div className="absolute inset-0 bg-white/50"></div>

  {/* Hero content */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 px-4 sm:px-8 md:px-16 lg:px-32 flex-1 py-12 md:py-0">
    {/* Text section */}
    <div className="flex-1 text-center lg:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-green-900 to-green-900 bg-clip-text text-transparent leading-tight">
        Mind Harmony
      </h1>
      <p className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-700">
        A peaceful, safe online space for therapy and wellbeing. Find a
        provider that suits your needs and begin your path to healing.
      </p>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
      <button
  onClick={() => setCurrentView(isAuthenticated ? "app" : "auth")}
  className="inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-semibold text-teal-700 bg-white border border-teal-200 rounded-full hover:bg-teal-50 shadow-md transition-all duration-200"
>
  Get Started
  <Heart className="ml-2 w-5 h-5 sm:w-6 sm:h-6" />
</button>
        <button className="inline-flex items-center px-6 sm:px-4 md:px-10 py-3 sm:py-3 s md:py-5 text-base sm:text-lg font-semibold text-teal-700 bg-white border border-teal-200 rounded-full hover:bg-teal-50 shadow-md transition-all duration-200">
          <ArrowLeft className="mr-2 w-5 h-5 sm:w-6 sm:h-6" />
          Learn More
        </button>
      </div>
    </div>
{/* video section */}
    <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl mt-8 lg:mt-0 md:h-96">
      <video
        src="/mindharmony.mp4"
        loop
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</header>

      {/* Steps Section */}
   <main className="flex flex-col">
  <section className="px-6 lg:px-8 py-20  bg-gradient-to-l from-teal-600 to-teal-900">
    <h2 className="text-4xl font-semibold text-white text-center">
      Few Steps to Begin
    </h2>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
      <Card
        title="Step 1: Complete the Form"
        icon={
          <img
            src="/chat.png"
            alt="Calendar Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
          />
        }
      >
        Tell us about your needs, availability, and preferences.
      </Card>
      <Card
        title="Step 2: Get Matched"
        icon={
          <img
            src="/match.png"
            alt="Match Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
          />
        }
      >
        We'll match you with a provider who fits your goals and style.
      </Card>
      <Card
        title="Step 3: Attend Appointment"
        icon={
          <img
            src="/booking.png"
            alt="Booking Icon"
            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
          />
        }
      >
        Book and attend your session online or in-person.
      </Card>
    </div>


  </section>
        {/* Therapy Formats */}
 <section className="px-8 lg:px-20 py-20 bg-gradient-to-l from-green-50 to-green-100">
  <h1 className="md:text-6xl text-4xl font-mono font-extrabold mb-10 text-center text-teal-700">Therapy Formats</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 ">
    {/* Individual */}
    <div className="relative group overflow-hidden cursor-pointer rounded-2xl">
      <img
        src="/alone.png"
        alt="Individual Therapy"
        className="w-full h-[455px] object-cover transition-transform duration-500 group-hover:opacity-90 "
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex flex-col justify-end p-8 text-white round">
        <h4 className="text-3xl md:text-4xl font-semibold">Individual</h4>
        <div className="w-35 h-[2px] bg-white/50 my-3"></div>
        <p className="text-base text-gray-200">
          One-on-one sessions focused on your goals and needs.
        </p>
      </div>
    </div>

    {/* Couples */}
    <div className="relative group overflow-hidden cursor-pointer rounded-2xl">
      <img
        src="/couple.png"
        alt="Couples Therapy"
        className="w-full h-[455px] object-cover transition-transform duration-500 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex flex-col justify-end p-8 text-white">
        <h4 className="text-3xl md:text-4xl font-semibold">Couples</h4>
        <div className="w-30 h-[2px] bg-white/50 my-3"></div>
        <p className="text-base text-gray-200">
          Work on relationship dynamics, communication, and healing together.
        </p>
      </div>
    </div>
  </div>
</section>



      
       <section className="relative px-8 lg:px-20 py-20 bg-gradient-to-l from-green-50 to-green-100 flex justify-center items-center">
  <div className="relative w-full max-w-5xl h-[70vh] bg-[url('/pic1.jpg')] bg-cover bg-center rounded-3xl shadow-2xl flex items-center justify-center">
    
    <div className="backdrop-blur-md bg-white/10 border border-white/50 rounded-xl p-6 max-w-sm text-center shadow-lg">
      <p className="text-lg md:text-2xl font-medium text-black font-mono" >
        "Healing isn't always a  <span className="text-teal-800"> Straight line</span> but it doesn't have to be a  <span className="text-teal-600"> Circle</span>
      </p>
      {/* UPDATED: Change view to "auth" to show Login/Sign Up page */}
     <button 
  onClick={() => setCurrentView(isAuthenticated ? "app" : "auth")} 
  className="inline-flex items-center px-8 p-2 mt-2 text-lg font-semibold text-teal-700 bg-white border border-teal-200 rounded-full hover:bg-teal-50 hover:text-xl cursor-pointer shadow-md transition-all duration-200"
>
  Chat
</button>

    </div>

  </div>
</section>

      </main>

   
    </div>
  );
}

function Card({ title, icon, children }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center gap-3 max-w-xs w-full mx-auto transition transform hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="bg-white/70 rounded-xl p-3 shadow-sm flex items-center justify-center">{icon}</div>
      <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-green-900">{title}</h3>
      {children && (
        <p className="text-base sm:text-lg text-gray-700 mt-2 leading-relaxed">{children}</p>
      )}
    </div>
  );
}
