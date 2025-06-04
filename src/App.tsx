import Splitter from "./components/Splitter";
import { Toaster } from "./components/ui/sonner";

import "./styles/globals.css";

function App() {
  return (
    <>
      <main className=" h-screen max-h-screen bg-background text-foreground p-4">
        <Splitter />
        <Toaster position="top-center" richColors theme="light" />
      </main>
      <footer className="fixed bottom-0 w-full text-center py-3 text-sm text-muted-foreground border-t shadow-inner bg-background">
        Built with ❤ by{" "}
        <a
          href="https://www.linkedin.com/in/amin-m-nassar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary font-bold underline"
        >
          Amin Nassar
        </a>
      </footer>
    </>
  );
}

export default App;
