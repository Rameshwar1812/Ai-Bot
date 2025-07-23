import React, { useState } from "react";

export const ToggleModal = () => {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  return { modal, handleModal };
};
