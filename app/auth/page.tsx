"use client";
import LoginModal from "@/components/modals/LoginModal";

import React, { useEffect } from "react";
import useLoginModal from "../hooks/useLoginModal";

const AuthPage = () => {
  const onOpen = useLoginModal((state) => state.onOpen);
  const isOpen = useLoginModal((state) => state.isOpen);

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);
  useEffect(() => {
    onOpen();
  }, [onOpen]);
  return null;
};

export default AuthPage;
