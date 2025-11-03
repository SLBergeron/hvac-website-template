import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CTA";
import { Products } from "@/components/Products";
import { Testimonial } from "@/components/Testimonial";
import { testimonials } from "constants/testimonials";
import type { NextPage } from "next";

const Work: NextPage = () => {
  return (
    <Container title={`Work | Agency Template`}>
      <div id="work" className=" max-w-6xl mx-auto antialiased">
        <h2 className="font-bold text-4xl text-center text-slate-700  mt-10 md:mt-20">
          A glimpse into our{" "}
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500 z-10">
            projects
          </span>
        </h2>
        <p className="text-base text-slate-500 font-normal text-center max-w-2xl mx-auto my-4">
          A look at some of the amazing websites that we've built recently.
        </p>

        <Products />
      </div>
      <Testimonial testimonial={testimonials[0]} />
      <CallToAction />
    </Container>
  );
};

export default Work;
