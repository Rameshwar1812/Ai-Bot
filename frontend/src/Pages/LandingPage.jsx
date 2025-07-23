import React from 'react'
import Navbar from './../components/Navbar';
import Landing from './../components/Landing';
import Marque from './../components/Marque';
import About from './../components/About';
import Eyes from './../components/Eyes';


function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <Landing />
      <Marque />
      <About />
      {/* <Eyes /> */}
    </div>
  );
}

export default LandingPage