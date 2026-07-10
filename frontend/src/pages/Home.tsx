// import React from "react";
// import ProgressBar from "../componenets/ui/ProgressBar.js";
// import StatusBatch from "../componenets/ui/StatusBatch.js";
// import Avatar from "../componenets/ui/Avatar.js";
//  const Home = () => {
 
   
   
 
//   return (
//     <main className="bg-bg  text-text-primary font-sans">
//       {/* Hero Section */}
//       <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           EMPLO<span className="text-primary">MANAGE</span>
//         </h1>
//         <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-6">
//           Efficiently manage your employees, tasks, and team performance – all in one place.
//         </p>
//         <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-lg font-medium transition">
//           Get Started
//         </button>
//       </section>

//       {/* Features Section */}
//       <section className="bg-surface py-20 px-6">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-semibold mb-12">Key Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-navbar p-6 rounded-xl border border-border">
//               <h3 className="text-xl font-bold mb-2">Task Management</h3>
//               <p className="text-text-secondary">
//                 Assign, update, and track employee tasks in real-time.
//               </p>
//             </div>
//             <div className="bg-navbar p-6 rounded-xl border border-border">
//               <h3 className="text-xl font-bold mb-2">Secure Access</h3>
//               <p className="text-text-secondary">
//                 Role-based authentication to ensure data protection.
//               </p>
//             </div>
//             <div className="bg-navbar p-6 rounded-xl border border-border">
//               <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
//               <p className="text-text-secondary">
//                 Generate performance and attendance insights with ease.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Usage Preview Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6">Smart Dashboard Preview</h2>
//           <div className="bg-surface border border-border-secondary rounded-xl p-10 md:p-20 shadow-lg">
//             <div className="h-60 bg-navbar rounded-lg flex items-center justify-center text-text-secondary text-lg italic">
//               Dashboard UI Preview (Screenshot Placeholder)
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="bg-surface py-20 px-6 text-center">
//         <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//         <p className="text-text-secondary max-w-lg mx-auto mb-6">
//           Join hundreds of teams already managing their employees smarter.
//         </p>
//         <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl text-lg font-medium transition">
//           Start Now
//         </button>
//       </section>
//           <section className="w-full h-full"><ProgressBar label={"Speed "} value={70} max={100} className='' themeColor="red" />
          
//           </section>
//       {/* Footer */}
//       <footer className="bg-navbar py-6 text-center text-text-secondary text-sm">
//         © {new Date().getFullYear()} EMPLOMANAGE — Built with 💻 & 🧠
//       </footer>
      
//     </main>
//   );
// };

// export default Home;


import React from "react";

const completedModules = [
  "Authentication",
  "Organization Registration",
  "Employee Management",
  "Dashboard UI",
  "Responsive Design",
];

const inProgressModules = [
  "Attendance Module",
  "Leave Management",
  "Reports & Analytics",
  "Notifications",
  "Payroll",
];

const plannedFeatures = [
  {
    title: "Multi Organization",
    icon: "🏢",
  },
  {
    title: "Employee Management",
    icon: "👥",
  },
  {
    title: "Attendance",
    icon: "📅",
  },
  {
    title: "Task Management",
    icon: "✅",
  },
  {
    title: "Role Permissions",
    icon: "🔐",
  },
  {
    title: "Analytics",
    icon: "📊",
  },
  {
    title: "Reports",
    icon: "📄",
  },
  {
    title: "Notifications",
    icon: "🔔",
  },
];

const stats = [
  {
    title: "Frontend",
    value: 85,
  },
  {
    title: "Backend",
    value: 55,
  },
  {
    title: "Database",
    value: 70,
  },
  {
    title: "Security",
    value: 45,
  },
];

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex rounded-full border border-blue-500/40 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 animate-pulse">
            🚧 Project in Progress
          </div>

          <h1 className="mt-8 text-5xl font-extrabold md:text-6xl">
            Employee Management System
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
            A modern platform for managing organizations, employees, attendance,
            tasks, and business operations. The project is actively being built
            with scalability and security in mind.
          </p>

          <div className="mx-auto mt-12 max-w-xl">
            <div className="mb-2 flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>62%</span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000" />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-24 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="mb-6 text-2xl font-bold text-green-400">
              Completed Modules
            </h2>

            <div className="space-y-4">
              {completedModules.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-4"
                >
                  <span className="text-green-400">✔</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="mb-6 text-2xl font-bold text-yellow-400">
              Currently Building
            </h2>

            <div className="space-y-4">
              {inProgressModules.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-slate-800 p-4"
                >
                  <span className="animate-spin">⚙️</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="mt-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Planned Features</h2>
            <p className="mt-4 text-slate-400">
              The roadmap for future development.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plannedFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:-translate-y-2 hover:border-blue-500"
              >
                <div className="text-4xl">{feature.icon}</div>

                <h3 className="mt-5 text-xl font-semibold">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Development Stats */}
        <section className="mt-24">
          <h2 className="mb-10 text-center text-4xl font-bold">
            Development Status
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
              >
                <div className="mb-3 flex justify-between">
                  <span className="font-medium">{item.title}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 border-t border-slate-800 pt-10 text-center text-slate-400">
          <p className="text-lg">
            Building secure software takes time, testing, and a healthy distrust
            of bugs that swear they're "fixed."
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <span>React</span>
            <span>TypeScript</span>
            <span>Tailwind CSS</span>
            <span>Redux Toolkit</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB</span>
          </div>

          <p className="mt-8 text-sm">
            Version 0.1.0 • © 2026 Employee Management System
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Home;