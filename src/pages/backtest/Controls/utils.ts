import { ChangeEvent } from "react";

export function onTextAreaChange(action1: (str: string) => void, action2: (obj: any) => void) {
  return function (e: ChangeEvent<HTMLTextAreaElement>): void {
    const rawValue = e.target.value;
    action1(rawValue);

    let value = undefined;
    try {
      value = JSON.parse(rawValue);
    } catch (e) {
      return;
    }
    action2(value);
  };
}
