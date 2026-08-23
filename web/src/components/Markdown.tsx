import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";
import { useMemo, type ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

/** Turn an in-repo markdown href into a router path. */
function toRoute(href: string): string | null {
  if (/^[a-z]+:|^\/\//i.test(href) || href.startsWith("#")) return null;
  const clean = href.replace(/\.md$/, "").replace(/\/index$/, "").replace(/^\.\//, "");
  return "/" + clean.replace(/^\/+/, "");
}

export function Markdown({ source }: { source: string }) {
  const components = useMemo<Components>(
    () => ({
      a({ href, children, ...rest }) {
        const raw = href ?? "";
        const route = toRoute(raw);
        if (route) {
          return (
            <Link to={route} {...rest}>
              {children}
            </Link>
          );
        }
        const external = /^https?:/i.test(raw);
        return (
          <a
            href={raw}
            {...rest}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          >
            {children}
          </a>
        );
      },

      // Fences are wrapped by the `pre` handler below; inline code passes
      // through untouched so .prose :not(pre) > code can style it.
      code({ className, children, ...rest }) {
        return (
          <code className={className} {...rest}>
            {children}
          </code>
        );
      },

      pre({ children }) {
        // react-markdown nests <code> inside <pre>; lift the language out
        const child = children as { props?: { className?: string } } | undefined;
        const cls = child?.props?.className ?? "";
        const lang = /language-(\w+)/.exec(cls)?.[1] ?? "";
        return <CodeBlock language={lang}>{children as ReactNode}</CodeBlock>;
      },

      // relative image paths are repo-relative; resolve them against BASE_URL
      img({ src, alt, ...rest }) {
        const raw = typeof src === "string" ? src : "";
        // Site assets are flat at the base path, so drop any leading ./ or ../
        // segments — "../logo.png" from content/en/ must not escape the base.
        const resolved = /^(https?:|data:|\/)/i.test(raw)
          ? raw
          : import.meta.env.BASE_URL + raw.replace(/^(?:\.{1,2}\/)+/, "");
        return <img src={resolved} alt={alt ?? ""} loading="lazy" {...rest} />;
      },

      table({ children }) {
        return (
          <div style={{ overflowX: "auto" }}>
            <table>{children}</table>
          </div>
        );
      },
    }),
    [],
  );

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
