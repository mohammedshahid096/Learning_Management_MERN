import React, { useEffect, useState } from "react";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { RiWifiOffLine } from "react-icons/ri";
import "../styles/progress.css";

export const OnlineNavigator = () => {
  const [onlineNavigatorState, setonlineNavigatorState] = useState(
    navigator?.onLine || false
  );

  function onlineFunction() {
    setonlineNavigatorState(true);
  }
  function offlineFunction() {
    setonlineNavigatorState(false);
  }

  useEffect(() => {
    window.addEventListener("online", onlineFunction);
    window.addEventListener("offline", offlineFunction);

    return () => {
      window.removeEventListener("online", onlineFunction);
      window.removeEventListener("offline", offlineFunction);
    };
  }, []);
  return (
    <>
      {onlineNavigatorState ? null : (
        <div className="fixed inset-0 flex justify-center items-cente bg-transparent bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 h-screen">
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                <RiWifiOffLine className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Your are offline please try to connect the internet
              </div>
              <Toast.Toggle />
            </Toast>
            <div className="flex justify-center items-center h-full">
              <div class="pulse">
                <div class="progress blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
