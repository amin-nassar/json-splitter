import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { toast } from "sonner";
import FileUploader from "../FileUpload";
import { Label } from "../ui/label";
import { trackEvent } from "../../analytics";

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
      <h1 className="text-6xl font-bold mb-10 max-sm:text-4xl">
        JSON Splitter
      </h1>
      <Card className="w-[30%] max-[1048px]:w-[60%] max-md:w-[100%] mx-auto">
        <CardContent className="flex flex-col gap-6 ">
          <FileUploader onUpload={handleUploadFile} />
          {parsedKeysCount > 0 && (
            <>
              <div className="grid gap-2">
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
              <div className="flex flex-col gap-3">
                <Button className="cursor-pointer" onClick={handleCopy}>
                  Copy Result
                </Button>
                <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="px-4 text-sm text-muted-foreground">OR</span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>
                <div className="flex items-end gap-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
                  <div className="grow flex flex-col gap-1">
                    <Label htmlFor="fileName">File Name</Label>
                    <Input
                      id="fileName"
                      placeholder="File name (without.json)"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                    />
                  </div>
                  <Button className="cursor-pointer" onClick={handleDownload}>
                    Download
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
