import { Container } from "@/components/Container";
import { CallToAction } from "@/components/CTA";
import { Templates } from "@/components/Templates";
import { Testimonial } from "@/components/Testimonial";
import { testimonials } from "constants/testimonials";
import type { NextPage } from "next";

const TemplatesPage: NextPage = () => {
  return (
    <Container
      title={`Templates | Agency Template`}
      description={` Carefully crafted website templates that are ready to be customized
    and launched.`}
    >
      <div id="work" className=" max-w-6xl mx-auto antialiased">
        <h2 className="font-bold text-4xl text-center text-slate-700  mt-10 md:mt-20">
          Website templates that
          <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500 z-10">
            {" "}
            stand out
          </span>
        </h2>
        <p className="text-base text-slate-500 font-normal text-center max-w-2xl mx-auto my-4">
          Carefully crafted website templates that are ready to be customized
          and launched.
        </p>

        <Templates />
      </div>
      <Testimonial testimonial={testimonials[0]} />
      <CallToAction headerText={`Want to customize templates? We are here!`} />
    </Container>
  );
};

export default TemplatesPage;
