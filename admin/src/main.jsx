import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ContextProvider1, ContextProvider2, ContextProvider3 } from "@/context";
import "@/assets/css/tailwind.css";
import "@/assets/fonts/fontAwasome.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <BrowserRouter>
      <ThemeProvider>
         <ContextProvider1>
            <ContextProvider2>
               <ContextProvider3>
                  <App />
               </ContextProvider3>
            </ContextProvider2>
         </ContextProvider1>
      </ThemeProvider>
   </BrowserRouter>
);
