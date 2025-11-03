import { type MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { MarkdownImage } from "./components/MarkdownImage/MarkdownImage";

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    MarkdownImage: (props: ImageProps) => <MarkdownImage {...props} />,
  };
}
