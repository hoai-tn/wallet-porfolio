"use client";
import useAuth from "../hooks/useAuth";

export default function About() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return <>{JSON.stringify(isAuthenticated)} a</>;
}
