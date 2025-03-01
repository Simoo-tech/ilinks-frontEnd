import React from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <main className="overflow-y-auto h-full">
      <Navbar />
      <section className="container max-w-full flex flex-col gap-6 w-full py-5 ">
        <div
          className="flex justify-between items-center gap-5
        sm:flex-col-reverse
        lg:flex-row"
        >
          <div className="flex flex-col gap-2 sm:w-full lg:w-8/12">
            <h1 className="text-3xl uppercase text-primaryColor font-semibold ">
              About us
            </h1>
            <span>
              Welcome to Ilinks, the ultimate platform designed to help
              professionals showcase their skills, experience, and projects
              through personalized portfolio websites. Our mission is to bridge
              the gap between talented individuals and companies looking for the
              perfect candidates by providing an innovative and efficient
              solution for job seekers and recruiters alike.Welcome to Ilinks,
              the ultimate platform designed to help professionals showcase
              their skills, experience, and projects through personalized
              portfolio websites. Our mission is to bridge the gap between
              talented individuals and companies looking for the perfect
              candidates by providing an innovative and efficient solution for
              job seekers and recruiters alike.
            </span>
          </div>
          <img
            src="/assets/bearded-engineer-his-home-office-night-working-gear-mechanism.jpg"
            width={500}
          />
        </div>
        <div
          className="flex justify-between items-center gap-5
        sm:flex-col-reverse
        lg:flex-row-reverse"
        >
          <div className="flex flex-col gap-2 sm:w-full lg:w-9/12">
            <h2 className="text-3xl uppercase text-primaryColor font-semibold ">
              Our Vision
            </h2>
            <span>
              We aim to revolutionize the hiring process by creating a dynamic
              and interactive space where professionals can present their
              expertise in a visually compelling way. We believe that a
              well-crafted portfolio speaks louder than a traditional resume,
              and our platform empowers users to build their personal brand
              effortlessly. alike.
            </span>
          </div>
          <img src="/assets/3.jpg" width={400} />
        </div>
        <div
          className="flex justify-between items-center gap-5
        sm:flex-col-reverse
        lg:flex-row"
        >
          <div className="flex flex-col gap-2 sm:w-full lg:w-9/12">
            <h3 className="text-3xl uppercase text-primaryColor font-semibold ">
              Our Mission
            </h3>
            <span>
              We aim to revolutionize the hiring process by creating a dynamic
              and interactive space where professionals can present their
              expertise in a visually compelling way. We believe that a
              well-crafted portfolio speaks louder than a traditional resume,
              and our platform empowers users to build their personal brand
              effortlessly. alike.
            </span>
          </div>
          <img src="/assets/4.jpg" width={400} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
