import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type FileUploadProps = {
  onUpload: (file: File) => void;
  accept?: string;
  className?: string;
};

export default function FileUpload({
  onUpload,
  accept = ".json",
  className = "",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith(".json")) {
      onUpload(file);
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".json")) onUpload(file);
    else toast.error("Please upload a valid JSON file.");
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors",
        dragOver
          ? "border-salem-500 bg-salem-50 dark:bg-salem-950"
          : "border-gray-200",
        className
      )}
    >
      <UploadCloud className="mx-auto mb-2 text-muted-foreground" size={32} />
      <p className="text-sm text-muted-foreground">
        Click or drag & drop a <span className="font-medium">.json</span> file
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
