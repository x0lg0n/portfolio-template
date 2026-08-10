import CodeBlock from "@/components/code-block";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
  rehypePlugins?: Parameters<typeof Markdown>[0]["rehypePlugins"];
}

export default function MarkdownContent({
  content,
  rehypePlugins,
}: MarkdownContentProps) {
  return (
    <Markdown
      rehypePlugins={rehypePlugins}
      components={{
        pre: ({ children }) => <>{children}</>,
        code: ({ node, className: codeClassName, children, ...props }) => {
          const match = /language-(\w+)/.exec(codeClassName ?? "");
          const isBlock = match || String(children).includes("\n");
          if (isBlock) {
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                lang={match?.[1]}
              />
            );
          }
          return (
            <code
              {...props}
              className={cn(
                "rounded bg-muted border border-border px-1.5 py-0.5 font-mono text-[0.85em]",
                codeClassName
              )}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}