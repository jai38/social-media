import React from "react";
import { Header } from "../../Common/Header";
import { Posts } from "../../Common/Posts";
export const Disliked = () => {
  return (
    <div>
      <Header />
      <Posts showOnly={"Disliked"} />
    </div>
  );
};
