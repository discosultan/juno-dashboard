import { useState } from "react";
import { BacktestInput } from "../models";
import TextArea from "components/TextArea";
import { onTextAreaChange } from "./utils";

type RawProps = {
  input: BacktestInput;
  setInput: (input: BacktestInput) => void;
};

export default function Raw({ input, setInput }: RawProps) {
  const [rawInput, setRawInput] = useState(JSON.stringify(input, null, 2));

  return (
    <TextArea label="Input" value={rawInput} onChange={onTextAreaChange(setRawInput, setInput)} />
  );
}
