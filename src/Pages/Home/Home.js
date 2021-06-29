import React from "react";
import { Header } from "../../Common/Header";
import { Posts } from "../../Common/Posts";
export const Home = () => {
  return (
    <div>
      <Header />
      <Posts showOnly={"All"} />
    </div>
  );
};
