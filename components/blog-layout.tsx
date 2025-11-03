// import {hydrate} from "next-mdx-remote/hydrate";

import { Container } from "@/components/Container";

import { BlurImage } from "@/components/BlurImage";
import moment from "moment";
import { CallToAction } from "@/components/CTA";

export function BlogLayout({ blog, children }: any) {
  return (
    <Container>
      <div className="max-w-5xl mx-auto">
        <Header blog={blog} />
      </div>
      <div className="prose prose-sm lg:prose-lg mx-auto max-w-3xl pb-10">
        {children}
      </div>
      <CallToAction
        headerText={`Need Help building your website? We are here`}
        bodyText={`We are a team of experienced web developers who can help you build your website. We can help you with everything from design to deployment. Get in touch with us today!`}
      />
    </Container>
  );
}

const Header = ({ blog }: any) => {
  return (
    <div className="my-10">
      <div className="w-full h-52 md:h-96 rounded-lg relative flex justify-center mb-4 overflow-hidden">
        <BlurImage
          src={blog.image}
          alt="thumbnail"
          className="rounded-lg object-cover"
          layout="fill"
          // width="800"
          // height="800"
        />
      </div>
      <div className="flex space-x-2  my-2 items-center justify-between max-w-7xl mb-20 ">
        <div className="flex flex-row justify-between space-x-2 w-full">
          <div className="flex flex-row space-x-2 items-center">
            <div className="border-2 border-gray-100  rounded-full flex items-center">
              <BlurImage
                src={blog.authorAvatar}
                width="20"
                height="20"
                className="rounded-full object-cover "
              />
            </div>
            <span className="text-zinc-700 font-semibold"> {blog.author}</span>
          </div>

          <span className="text-zinc-400 text-base">
            {moment(blog.publishedAt).format("Do MMM YYYY")}
          </span>
        </div>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-6xl text-zinc-700 font-extrabold  mx-auto text-left mt-10 mb-10 md:mb-20">
        {blog.title}
      </h1>
    </div>
  );
};
