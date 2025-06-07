import { useState } from "react";
import { Card, CardContent } from "@/ui/card";
import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Input } from "@/ui/input";
import { toast } from "sonner";
import FileUploader from "@components/FileUpload";
import { Label } from "@/ui/label";
import { trackEvent } from "@/analytics";
import { Download } from "lucide-react";

export default function Splitter() {
  const [parsedKeys, setParsedKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [originalObject, setOriginalObject] = useState<Record<string, any>>({});
  const [fileName, setFileName] = useState("output");

  const handleCheckbox = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const getFilteredJSON = () => {
    const result: typeof originalObject = {};
    selectedKeys.forEach((key) => {
      result[key] = originalObject[key];
    });
    return result;
  };

  const handleCopy = () => {
    trackEvent("Clicked Copy", "Button", "Home Page");
    navigator.clipboard.writeText(JSON.stringify(getFilteredJSON(), null, 2));

    toast.success("Copied to clipboard!");
  };

  const handleDownload = () => {
    trackEvent("Clicked Download", "Button", "Home Page");
    const stringJSON = JSON.stringify(getFilteredJSON(), null, 2);
    const blob = new Blob([stringJSON], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.json`;
    link.click();
    toast.success("File Uploaded Successfully!");
  };

  const handleUploadFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      try {
        const obj = JSON.parse(text);
        if (typeof obj !== "object" || Array.isArray(obj)) throw new Error();
        setOriginalObject(obj);
        setParsedKeys(Object.keys(obj));
        setSelectedKeys([]);
      } catch {
        toast.error("Invalid JSON in file");
      }
    };
    reader.readAsText(file);
  };

  const parsedKeysCount = Object.keys(parsedKeys).length;

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Card className="w-full md:w-[70%] xl:w-[50%] 2xl:w-[30%] mx-auto max-h-full">
        <CardContent className="flex flex-col gap-6 max-sm:gap-3 max-h-full">
          <FileUploader onUpload={handleUploadFile} />
          {parsedKeysCount > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 columns-2 gap-y-2 gap-x-4 grow-1 overflow-auto">
                {parsedKeys.map((key) => (
                  <label
                    key={key}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedKeys.includes(key)}
                      onCheckedChange={() => handleCheckbox(key)}
                    />
                    <span>{key}</span>
                  </label>
                ))}
              </div>
              <div className="flex flex-col gap-3 max-sm:gap-2">
                <Button className="cursor-pointer" onClick={handleCopy}>
                  Copy Result
                </Button>
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="px-4 text-sm text-muted-foreground">OR</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>
                <div className="flex items-end gap-3">
                  <div className="grow flex flex-col gap-1">
                    <Label htmlFor="fileName">File Name</Label>
                    <Input
                      id="fileName"
                      placeholder="File name (without.json)"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleDownload} className="cursor-pointer">
                    <Download />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
