import * as React from "react";

const getFormattedTime = (time: Date) => {
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export function useIntervalTimer({
  sets,
  prepare,
  work,
  rest,
}: {
  sets: number;
  prepare: Date | undefined;
  work: Date | undefined;
  rest: Date | undefined;
}) {
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  const [dataToDisplay, setDataToDisplay] = React.useState<{
    time: string;
    phase: "prepare" | "work" | "rest";
  }>({ time: "00:00", phase: "prepare" });

  const startTimer = ({
    currentPrepare,
    currentWork,
    currentRest,
    currentSet,
    currentPhase,
  }: {
    currentPrepare: Date | undefined;
    currentWork: Date | undefined;
    currentRest: Date | undefined;
    currentSet: number;
    currentPhase: "prepare" | "work" | "rest";
  }) => {
    if (!currentPrepare || !currentWork || !currentRest) {
      return;
    }

    const phaseMapper = {
      prepare: new Date(currentPrepare),
      work: new Date(currentWork),
      rest: new Date(currentRest),
    } as const;

    let timer: NodeJS.Timeout | undefined = undefined;
    timer = setInterval(() => {
      const minutes = phaseMapper[currentPhase].getMinutes();
      const seconds = phaseMapper[currentPhase].getSeconds();
      const formattedTime = getFormattedTime(phaseMapper[currentPhase]);
      setDataToDisplay({ time: formattedTime, phase: currentPhase });

      if (minutes === 0 && seconds === 0) {
        if (currentPhase === "work" && currentSet === sets) {
          setIsTimerRunning(false);
          clearInterval(timer);
          return;
        }

        if (currentPhase === "prepare") {
          clearInterval(timer);
          startTimer({
            currentPrepare,
            currentWork,
            currentRest,
            currentSet: 1,
            currentPhase: "work",
          });
          return;
        } else if (currentPhase === "work") {
          clearInterval(timer);
          startTimer({
            currentPrepare,
            currentWork,
            currentRest,
            currentSet,
            currentPhase: "rest",
          });
          return;
        } else if (currentPhase === "rest") {
          clearInterval(timer);
          startTimer({
            currentPrepare,
            currentWork,
            currentRest,
            currentSet: currentSet + 1,
            currentPhase: "work",
          });
          return;
        }
      }

      phaseMapper[currentPhase].setSeconds(seconds - 1);
    }, 1000);
  };

  const toggleTimer = () => {
    if (!isTimerRunning && prepare && work && rest) {
      const formattedTime = getFormattedTime(prepare);
      setDataToDisplay({ time: formattedTime, phase: "prepare" });

      startTimer({
        currentPrepare: prepare,
        currentWork: work,
        currentRest: rest,
        currentSet: 0,
        currentPhase: "prepare",
      });
    }

    setIsTimerRunning((prev) => !prev);
  };

  return {
    isTimerRunning,
    dataToDisplay,
    toggleTimer,
  };
}
