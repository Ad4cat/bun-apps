import React, { useState } from "react";
import { Button } from "./button";
import { Check, Copy } from "lucide-react";

const CopyButton = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={onCopy}
        className={className}
        aria-label="コピー"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy"}
      </Button>
    </>
  );
};

export default CopyButton;
