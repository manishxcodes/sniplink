"use client";

import { Check, Copy, ExternalLink, Trash2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface UrlCardProps {
  id: string;
  title: string;
  targetURL: string;
  shortCode: string;
  onDelete: (id: string) => void;
}

export function UrlCard({
  id,
  title,
  targetURL,
  shortCode,
  onDelete,
}: UrlCardProps) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const shortUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Failed to copy: ", err);
    }
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      onDelete(shortCode);
      await handleDelete();
    } catch (err) {
      console.error("Failed to delete:", err);
      setIsDeleting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 -mt-1"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Delete URL"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">
            Original URL
          </span>
          <a
            href={targetURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground hover:text-primary truncate flex items-center gap-1 group"
          >
            <span className="truncate">{targetURL}</span>
            <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">
            Short URL
          </span>
          <div className="flex items-center gap-2">
            <code className="text-sm bg-muted px-2 py-1 rounded-md flex-1 truncate">
              {shortUrl}
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="shrink-0 bg-transparent"
              aria-label={copied ? "Copied" : "Copy short URL"}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
