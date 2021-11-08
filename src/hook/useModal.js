import { useState } from "react";

const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = (state = null) => {
    setModalVisible(state !== null ? state : !modalVisible);
  };

  return [modalVisible, toggleModal];
};

export default useModal;
