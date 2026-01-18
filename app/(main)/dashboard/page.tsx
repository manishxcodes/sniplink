"use client";

import { Button } from "@/components/ui/button";
import { UrlCard } from "@/components/url-card";
import { CreateUrlDialog } from "@/components/create-url-dialog";
import { deleteUrl, getAllUrls } from "@/services/url-service";
import { useEffect, useState } from "react";
import { Plus, Link2, Loader2 } from "lucide-react";

interface UrlData {
  id: string;
  title: string;
  shortCode: string;
  targetURL: string;
  userId: string;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async () => {
    setLoading(true);
    const urls = await getAllUrls();
    setUrls(urls.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    await deleteUrl(id);
    setUrls((prev) => prev.filter((url) => url.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pt-8">
      <div className="w-full flex flex-col items-center pt-8 md:pt-16 px-4">
        <div className="max-w-3xl w-full space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center bg-card border rounded-xl py-4 px-6 shadow-sm">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl md:text-2xl font-semibold text-foreground">
                Welcome back!
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your shortened URLs
              </p>
            </div>
            <CreateUrlDialog onUrlCreated={getUrls} />
          </div>

          {/* URLs Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Link2 className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-medium text-foreground">
                Your Links
              </h2>
              <span className="text-sm text-muted-foreground">
                ({urls.length})
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : urls.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border rounded-xl bg-card">
                <Link2 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No URLs yet
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first shortened URL to get started
                </p>
                <CreateUrlDialog
                  onUrlCreated={getUrls}
                  trigger={
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create your first link
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="grid gap-4">
                {urls.map((url) => (
                  <UrlCard
                    key={url.id}
                    id={url.id}
                    title={url.title}
                    targetURL={url.targetURL}
                    shortCode={url.shortCode}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
