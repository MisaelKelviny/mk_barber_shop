import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";

export interface StepsProps {
  labels: string[];
  children: any;
  allowNextStep: boolean;
  allowNextStepChange(value: boolean): void;
}

export default function Steps(props: Readonly<StepsProps>) {
  const [actualStep, setActualStep] = useState(0);

  function stepBefore() {
    setActualStep(actualStep - 1);
    props.allowNextStepChange(true);
  }

  function nextStep() {
    setActualStep(actualStep + 1);
    props.allowNextStepChange(false);
  }

  function renderSteps() {
    return (
      <div className="flex flex-col md:flex-row gap-4 md:gap-7">
        {props.labels.map((label, i) => {
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                key={i}
                className={`
                    flex justify-center items-center w-9 h-9 p-1 rounded-full font-bold
                    ${i === actualStep ? "bg-white text-black" : "text-zinc-500 bg-zinc-700"} 
                                `}
              >
                {i + 1}
              </span>
              <span
                className={i === actualStep ? "text-white" : "text-zinc-700"}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center lg:items-stretch">
      <div>{renderSteps()}</div>
      <div>{props.children?.[actualStep] ?? props.children}</div>
      <div className="flex gap-3 select-none">
        <button
          onClick={stepBefore}
          disabled={actualStep === 0}
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <IconChevronLeft size={20} />
          <span>Anterior</span>
        </button>
        <button
          onClick={nextStep}
          disabled={
            actualStep === (props.children?.length ?? 0) - 1 ||
            !props.allowNextStep
          }
          className="flex gap-1 items-center bg-zinc-700 text-sm text-white px-4 py-1.5 rounded-md disabled:opacity-30"
        >
          <span>Próximo</span>
          <IconChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
