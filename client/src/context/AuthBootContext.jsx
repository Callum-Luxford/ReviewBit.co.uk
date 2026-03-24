import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthBootOverlay from "../components/auth/AuthBootOverlay";

const AuthBootContext = createContext(null);

export function AuthBootProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [progress, setProgress] = useState(0);

  const progressIntervalRef = useRef(null);
  const navigateTimeoutRef = useRef(null);
  const finishTimeoutRef = useRef(null);

  function clearBootTimers() {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (navigateTimeoutRef.current) clearTimeout(navigateTimeoutRef.current);
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
  }

  useEffect(() => {
    return () => clearBootTimers();
  }, []);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setOpen(false);
      setProgress(0);
      clearBootTimers();
    }
  }, [location.pathname]);

  function startAuthBoot(target = "login") {
    const destination = target === "signup" ? "/signup" : "/login";

    if (location.pathname === destination) {
      navigate(destination);
      return;
    }

    clearBootTimers();

    setMode(target);
    setProgress(0);
    setOpen(true);

    let currentProgress = 0;

    progressIntervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 8 + 3;

      if (currentProgress >= 96) {
        currentProgress = 96;
        clearInterval(progressIntervalRef.current);
      }

      setProgress(currentProgress);
    }, 120);

    navigateTimeoutRef.current = setTimeout(() => {
      clearInterval(progressIntervalRef.current);
      setProgress(100);

      finishTimeoutRef.current = setTimeout(() => {
        navigate(destination);
      }, 300);
    }, 1800);
  }

  return (
    <AuthBootContext.Provider value={{ startAuthBoot }}>
      {children}
      <AuthBootOverlay open={open} mode={mode} progress={progress} />
    </AuthBootContext.Provider>
  );
}

export function useAuthBoot() {
  const context = useContext(AuthBootContext);

  if (!context) {
    throw new Error("useAuthBoot must be used inside AuthBootProvider");
  }

  return context;
}
