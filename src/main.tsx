import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./contexts/taskContext.tsx";
import { DialogProvider } from "./contexts/dialogContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <DialogProvider>
  <TaskProvider>
  <StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <App />
  </StrictMode>
  </TaskProvider>
  </DialogProvider>
  </BrowserRouter>
);
