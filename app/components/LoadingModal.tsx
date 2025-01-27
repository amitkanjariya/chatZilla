"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const LoadingModal = () => {
  return (
    <div className="flex items-center justify-center ">
      <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <Dialog.Panel>
            <div className="flex flex-col items-center justify-center gap-4">
              {/* Loading Animation */}
              <div className="flex flex-row gap-2.5">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.2s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.4s]"></div>
              </div>
              {/* Loading Text */}
              <p className="text-gray-700 text-sm font-medium">Loading, please wait...</p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition.Root>
    </div>
  );
};

export default LoadingModal;
