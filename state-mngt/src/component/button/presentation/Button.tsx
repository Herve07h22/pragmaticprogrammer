import React from "react";
import { useButton } from "../hooks/useButton";
import style from "./Button.module.css";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const waitFor1second = async () => {
  console.log("waiting for 1 second");
  await sleep(1000);
  console.log("done waiting for 1 second");
};

export const Button: React.FC<{ label: string }> = ({ label }) => {
  const { pending, onClick } = useButton({
    onClick: waitFor1second,
  });
  return (
    <button className={style.large} onClick={onClick}>
      {pending ? "loading..." : label}
    </button>
  );
};
