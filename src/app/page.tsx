"use client";

import About from "@/components/home/About";
import Header from "@/components/home/Header";
import Workflow from "@/components/home/Workflow";
import Summary from "@/components/home/Summary";
import Services from "@/components/home/Services";
import Statistics from "@/components/home/Statistics";
import Skills from "@/components/home/Skills";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function Page() {
  return (
    <main>
      <Header />
      <section id="home">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="statistics">
        <Statistics />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="workflow">
        <Workflow />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Summary />
      <Footer />
    </main>
  );
}
