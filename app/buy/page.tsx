"use client"
import { useGlobalContext } from "../Context/store";

export default function About() {
  const { accounts } = useGlobalContext();
  return <>Buy {JSON.stringify(accounts)}</>;
}
