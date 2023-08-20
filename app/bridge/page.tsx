"use client";

import { useGlobalContext } from "../Context/store";

export default function About() {
  const { isAuthenticated } = useGlobalContext();
  console.log(isAuthenticated);

  return <>{JSON.stringify(isAuthenticated)} a</>;
}
