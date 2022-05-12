import { useCallback, useState } from "react";
import { http } from "../services/HttpService";
import { Modal } from "antd";

const BranchesHook = () => {
  const getBranchesList = async () => {
    return await http.get("/branches/");
  };

  return {
    getBranchesList,
  };
};

export default BranchesHook;
