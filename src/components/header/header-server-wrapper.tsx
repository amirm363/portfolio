import React from "react";
import userActions from "@/actions/user-actions/index";
import Header from "./header";
export default async function HeaderServerWrapper() {
  const user = await userActions.getInfo();
  return <Header user={user} />;
}
