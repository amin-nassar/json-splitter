// import React, { useState } from "react";
// import { Card, CardContent } from "../ui/card";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import { Checkbox } from "../ui/checkbox";
// import { Input } from "../ui/input";
// import { toast } from "sonner";
// import FileUploader from "../FileUpload";
// import { Label } from "../ui/label";

// export default function JSONSplitter() {
//   const [rawJSON, setRawJSON] = useState("");
//   const [parsedKeys, setParsedKeys] = useState<string[]>([]);
//   const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
//   const [originalObject, setOriginalObject] = useState<Record<string, any>>({});
//   const [fileName, setFileName] = useState("filtered");

//   const handleParse = () => {
//     try {
//       const obj = JSON.parse(rawJSON);
//       if (typeof obj !== "object" || Array.isArray(obj)) throw new Error();
//       setOriginalObject(obj);
//       setParsedKeys(Object.keys(obj));
//       setSelectedKeys([]);
//     } catch {
//       alert("Invalid JSON");
//     }
//   };

//   const handleCheckbox = (key: string) => {
//     setSelectedKeys((prev) =>
//       prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
//     );
//   };

//   const getFilteredJSON = () => {
//     const result: Record<string, any> = {};
//     selectedKeys.forEach((key) => {
//       result[key] = originalObject[key];
//     });
//     return result;
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(JSON.stringify(getFilteredJSON(), null, 2));

//     toast.success("Copied to clipboard!");
//   };

//   const handleDownload = () => {
//     const blob = new Blob([JSON.stringify(getFilteredJSON(), null, 2)], {
//       type: "application/json",
//     });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = `${fileName}.json`;
//     link.click();
//   };

//   const handleUploadFile = (file: File) => {
//     // const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const text = event.target?.result as string;
//       setRawJSON(text);
//       try {
//         const obj = JSON.parse(text);
//         if (typeof obj !== "object" || Array.isArray(obj)) throw new Error();
//         setOriginalObject(obj);
//         setParsedKeys(Object.keys(obj));
//         setSelectedKeys([]);
//       } catch {
//         alert("Invalid JSON in file");
//       }
//     };
//     reader.readAsText(file);
//   };

//   // return (
//   //   <div className="h-full flex gap-4">
//   //     <Card className="w-1/2 h-full flex flex-col">
//   //       <CardContent className="flex flex-col pt-2 gap-2 items-start flex-1 overflow-hidden">
//   //         <div className="flex gap-4 shrink-0">
//   //           <Button onClick={handleParse}>Parse JSON</Button>
//   //           <Input type="file" accept=".json" onChange={handleUploadFile} />
//   //         </div>
//   //         <Textarea
//   //           placeholder="Paste your JSON here..."
//   //           value={rawJSON}
//   //           onChange={(e) => setRawJSON(e.target.value)}
//   //           className="flex-1 overflow-auto"
//   //         />
//   //       </CardContent>
//   //     </Card>

//   //     <Card className="w-1/2 h-full flex flex-col">
//   //       <CardContent className="pt-2 flex flex-col gap-2 items-start overflow-hidden">
//   //         <div className="flex gap-4 shrink-0">
//   //           <Button onClick={handleCopy}>Copy Result</Button>
//   //           <Button onClick={handleDownload}>Download JSON</Button>

//   //           <Input
//   //             id="fileName"
//   //             placeholder="File name"
//   //             value={fileName}
//   //             onChange={(e) => setFileName(e.target.value)}
//   //           />
//   //         </div>
//   //         <div className="flex-1 overflow-auto">
//   //           {parsedKeys.map((key) => (
//   //             <label
//   //               key={key}
//   //               className="flex items-center space-x-2 cursor-pointer"
//   //             >
//   //               <Checkbox
//   //                 checked={selectedKeys.includes(key)}
//   //                 onCheckedChange={() => handleCheckbox(key)}
//   //               />
//   //               <span>{key}</span>
//   //             </label>
//   //           ))}
//   //         </div>
//   //       </CardContent>
//   //     </Card>
//   //   </div>
//   // );

//   return (
//     <div className="h-full flex flex-col justify-center items-center">
//       <h1 className="text-6xl font-bold mb-4">JSON Splitter</h1>
//       <Card className="w-[50%] max-md:w-[100%] mx-auto">
//         <CardContent className="pt-2 flex flex-col gap-4 ">
//           <FileUploader onUpload={handleUploadFile} />
//           <div className="grid gap-2">
//             {parsedKeys.map((key) => (
//               <label
//                 key={key}
//                 className="flex items-center space-x-2 cursor-pointer"
//               >
//                 <Checkbox
//                   checked={selectedKeys.includes(key)}
//                   onCheckedChange={() => handleCheckbox(key)}
//                 />
//                 <span>{key}</span>
//               </label>
//             ))}
//           </div>
//           <Button onClick={handleCopy}>Copy Result</Button>
//           <div className="flex items-center">
//             <div className="flex-grow border-t border-gray-300" />
//             <span className="px-4 text-sm text-muted-foreground">OR</span>
//             <div className="flex-grow border-t border-gray-300" />
//           </div>
//           <div className="flex items-end gap-3">
//             <div className="grow flex flex-col gap-1">
//               <Label htmlFor="fileName">File Name</Label>
//               <Input
//                 id="fileName"
//                 placeholder="File name (without.json)"
//                 value={fileName}
//                 onChange={(e) => setFileName(e.target.value)}
//               />
//             </div>
//             <Button onClick={handleDownload}>Download</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
