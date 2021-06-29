import React from "react";
import { Header } from "../../Common/Header";
import { Posts } from "../../Common/Posts";
export const Liked = () => {
  return (
    <div>
      <Header />
      <Posts showOnly={"Liked"} />
    </div>
  );
};
