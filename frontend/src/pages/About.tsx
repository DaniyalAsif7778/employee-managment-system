import React from 'react'

const About = () => {
  return (
    <main className="bg-bg  text-text-primary  font-sans">
      {/* Hero / Intro Section */}
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-primary ">EMPLOMANAGE</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary  max-w-2xl">
          A powerful and intuitive employee management interface, built for modern teams and smart
          productivity.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-surface  py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            At EMPLOMANAGE, our goal is to eliminate the hassle of workforce management. We provide
            easy-to-use tools for task tracking, employee monitoring, and performance analytics —
            all in a beautifully simple UI.
          </p>
        </div>
      </section>

      {/* Tech Stack / Tools Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Built With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-text-secondary text-lg">
            <div className="bg-navbar  p-4 rounded-xl border border-border ">React.js</div>
            <div className="bg-navbar  p-4 rounded-xl border border-border ">Tailwind CSS</div>
            <div className="bg-navbar p-4 rounded-xl border border-border ">Responsive Design</div>
            <div className="bg-navbar  p-4 rounded-xl border border-border ">Dark UI Theme</div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-surface  py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Have Feedback or Questions?</h2>
        <p className="text-text-secondary  max-w-xl mx-auto mb-6">
          We'd love to hear from you! Connect with us through email or social links.
        </p>
        <a
          href="#"
          className="inline-block bg-primary  hover:bg-primary-hover  text-white px-6 py-3 rounded-xl text-lg transition"
        >
          Contact Support
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-navbar  py-6 text-center text-text-secondary text-sm">
        © {new Date().getFullYear()} EMPLOMANAGE. All rights reserved.
      </footer>
    </main>
  )
}

export default About
