import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/clsx";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, top: -60 }}
      animate={{ opacity: 1, top: -40 }}
      exit={{ opacity: 0, top: -60 }}
      className={cn(
        "fixed flex items-center justify-center overflow-y-auto overflow-x-hidden",
        "inset-0 bg-black/25 z-10 text-[1.1rem] tracking-wide"
      )}
    >
      {children}
    </motion.div>,
    document.body
  );
};

type Props = {
  show: boolean;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ show, children }) => {
  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show ? <Wrapper>{children}</Wrapper> : null}
    </AnimatePresence>
  );
};
