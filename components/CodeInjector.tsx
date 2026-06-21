"use client";

import { useEffect } from "react";

interface Props {
  html: string | null;
  position: "head" | "body-start" | "body-end";
}

export function CodeInjector({ html, position }: Props) {
  useEffect(() => {
    if (!html?.trim()) return;

    const container = document.createElement("div");
    container.innerHTML = html;

    const injected: Node[] = [];

    container.childNodes.forEach((node) => {
      let target: Node;

      if (node.nodeName === "SCRIPT") {
        const original = node as HTMLScriptElement;
        const script = document.createElement("script");
        Array.from(original.attributes).forEach((attr) => {
          script.setAttribute(attr.name, attr.value);
        });
        script.textContent = original.textContent;
        target = script;
      } else {
        target = node.cloneNode(true);
      }

      if (position === "head") {
        document.head.appendChild(target);
      } else if (position === "body-start") {
        document.body.insertBefore(target, document.body.firstChild);
      } else {
        document.body.appendChild(target);
      }

      injected.push(target);
    });

    return () => {
      injected.forEach((node) => node.parentNode?.removeChild(node));
    };
  }, [html, position]);

  return null;
}
