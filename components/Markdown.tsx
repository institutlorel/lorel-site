import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  children: string;
}

export function Markdown({ children }: Props) {
  return (
    <div className="prose prose-lg max-w-none font-body prose-headings:font-display prose-headings:text-brand-dark prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-dark prose-li:text-text-primary prose-p:text-text-primary prose-p:leading-[1.9] prose-p:mb-6 prose-img:rounded-xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
