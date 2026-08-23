import { useCallback, useRef, useState, type ReactNode } from "react";
import { CopyIcon, CheckIcon } from "./icons";

interface Props {
  language: string;
  children: ReactNode;
}

/** Code fence with a language label and a copy button. */
export function CodeBlock({ language, children }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    const text = preRef.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard API needs a secure context; fall back to a temp selection
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, []);

  return (
    <div className="codeblock">
      <div className="codeblock__bar">
        <span className="codeblock__lang">{language || "text"}</span>
        <button
          type="button"
          className="codeblock__copy"
          onClick={copy}
          aria-label={copied ? "کپی شد" : "کپی کد"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "کپی شد" : "کپی"}
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}
