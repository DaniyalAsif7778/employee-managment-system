import React from "react";
import ProgressBar from "../componenets/ui/ProgressBar.js";
import StatusBatch from "../componenets/ui/StatusBatch.js";
import Avatar from "../componenets/ui/Avatar.js";
 const Home = () => {
 
   
   
 
  return (
    <main className="bg-bg  text-text-primary font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          EMPLO<span className="text-primary">MANAGE</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-6">
          Efficiently manage your employees, tasks, and team performance – all in one place.
        </p>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-lg font-medium transition">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navbar p-6 rounded-xl border border-border">
              <h3 className="text-xl font-bold mb-2">Task Management</h3>
              <p className="text-text-secondary">
                Assign, update, and track employee tasks in real-time.
              </p>
            </div>
            <div className="bg-navbar p-6 rounded-xl border border-border">
              <h3 className="text-xl font-bold mb-2">Secure Access</h3>
              <p className="text-text-secondary">
                Role-based authentication to ensure data protection.
              </p>
            </div>
            <div className="bg-navbar p-6 rounded-xl border border-border">
              <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
              <p className="text-text-secondary">
                Generate performance and attendance insights with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Preview Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Smart Dashboard Preview</h2>
          <div className="bg-surface border border-border-secondary rounded-xl p-10 md:p-20 shadow-lg">
            <div className="h-60 bg-navbar rounded-lg flex items-center justify-center text-text-secondary text-lg italic">
              Dashboard UI Preview (Screenshot Placeholder)
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-surface py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-text-secondary max-w-lg mx-auto mb-6">
          Join hundreds of teams already managing their employees smarter.
        </p>
        <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-lg font-medium transition">
          Start Now
        </button>
      </section>
          <section className="w-full h-full"><ProgressBar label={"Speed "} value={70} max={100} className='' />
          
          </section>
      {/* Footer */}
      <footer className="bg-navbar py-6 text-center text-text-secondary text-sm">
        © {new Date().getFullYear()} EMPLOMANAGE — Built with 💻 & 🧠
      </footer>
      
    </main>
  );
};

export default Home;
