import React from "react";
import { userActions } from "@/actions/user-actions/index";
import HeaderContainer from "./header-container";

// This component serves as a server wrapper for the header component.
// It fetches the user data from the database and passes it to the header component.
export default async function HeaderServerWrapper() {
  const user = await userActions.getInfo({ navigationLinks: true });
  return <HeaderContainer navigationLinks={user?.navigationLinks} />;
}
