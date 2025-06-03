import Splitter from "./components/Splitter";
import { Toaster } from "./components/ui/sonner";

import "./styles/globals.css";

function App() {
  return (
    <main className=" h-screen max-h-screen bg-background text-foreground p-4">
      <Splitter />
      <Toaster position="bottom-center" richColors theme="light" />
    </main>
  );
}

export default App;
