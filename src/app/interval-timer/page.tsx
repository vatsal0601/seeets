"use client";

import * as React from "react";

import { Minus, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { TimePickerInput } from "~/components/ui/time-picker-input";
import { Label } from "~/components/ui/label";

const getFormattedTime = (time: Date) => {
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-1.5 rounded-md border bg-secondary p-4">
      {children}
    </div>
  );
}

function SetsInput({
  sets,
  setSets,
}: {
  sets: number;
  setSets: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSets(parseInt(e.target.value, 10));
  };

  const handleSetIncrement = () => {
    setSets((prev) => prev + 1);
  };

  const handleSetDecrement = () => {
    setSets((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <Card>
      <Label htmlFor="sets" className="text-center text-lg">
        sets
      </Label>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSetDecrement}
          className="flex-shrink-0"
        >
          <Minus />
        </Button>
        <Input
          id="sets"
          type="number"
          min={0}
          value={sets}
          onChange={handleSetChange}
          className="text-center font-mono text-base tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleSetIncrement}
          className="flex-shrink-0"
        >
          <Plus />
        </Button>
      </div>
    </Card>
  );
}

function TimeInput({
  label,
  date,
  setDate,
}: {
  label: string;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <Card>
      <Label htmlFor="sets" className="text-center text-lg">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <div className="w-full">
          <TimePickerInput
            picker="minutes"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onRightFocus={() => secondRef.current?.focus()}
            className="w-full"
          />
          <Label
            htmlFor="minutes"
            className="mt-1.5 block text-center text-muted-foreground"
          >
            (minutes)
          </Label>
        </div>
        <div className="w-full">
          <TimePickerInput
            picker="seconds"
            date={date}
            setDate={setDate}
            ref={secondRef}
            onLeftFocus={() => minuteRef.current?.focus()}
            className="w-full"
          />
          <Label
            htmlFor="seconds"
            className="mt-1.5 block text-center text-muted-foreground"
          >
            (seconds)
          </Label>
        </div>
      </div>
    </Card>
  );
}

export default function IntervalTimerPage() {
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  const [sets, setSets] = React.useState<number>(6);
  const [prepare, setPrepare] = React.useState<Date | undefined>(
    new Date(new Date().setHours(0, 0, 10, 0)),
  );
  const [work, setWork] = React.useState<Date | undefined>(
    new Date(new Date().setHours(0, 0, 12, 0)),
  );
  const [rest, setRest] = React.useState<Date | undefined>(
    new Date(new Date().setHours(0, 0, 24, 0)),
  );
  const [dataToDisplay, setDataToDisplay] = React.useState<{
    time: string;
    phase: "prepare" | "work" | "rest";
  }>({ time: "00:00", phase: "prepare" });

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

  if (!isTimerRunning) {
    const areSetsZero = sets === 0;
    const isPrepareZero =
      prepare && prepare.getMinutes() === 0 && prepare.getSeconds() === 0;
    const isWorkZero =
      work && work.getMinutes() === 0 && work.getSeconds() === 0;
    const isRestZero =
      rest && rest.getMinutes() === 0 && rest.getSeconds() === 0;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const isDisabled = areSetsZero || isPrepareZero || isWorkZero || isRestZero;

    return (
      <main className="flex h-full flex-col items-center justify-between gap-4 p-5 lg:p-10">
        <div className="grid w-full gap-4 md:max-w-md">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              interval timer
            </h1>
            <p className="text-sm text-muted-foreground">
              pro tip: create your account to save your timers
            </p>
          </div>
          <div className="grid w-full gap-4 md:max-w-md">
            <SetsInput sets={sets} setSets={setSets} />
            <TimeInput label="prepare" date={prepare} setDate={setPrepare} />
            <TimeInput label="work" date={work} setDate={setWork} />
            <TimeInput label="rest" date={rest} setDate={setRest} />
          </div>
        </div>
        <div className="w-full md:max-w-md">
          <Button
            size="lg"
            onClick={toggleTimer}
            className="w-full text-lg"
            disabled={isDisabled}
          >
            start
          </Button>
        </div>
      </main>
    );
  }

  if (!prepare || !work || !rest) {
    return (
      <main className="grid h-full place-content-center p-5 lg:p-10">
        <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          oops something went wrong! :(
        </h1>
      </main>
    );
  }

  return (
    <main className="flex h-full flex-col items-center justify-between gap-4 p-5 lg:p-10">
      <div className="grid w-full flex-grow place-content-center md:max-w-md">
        <h1 className="text-center font-mono text-8xl font-extrabold tabular-nums tracking-tight lg:text-9xl">
          {dataToDisplay.time}
        </h1>
        <p className="text-center text-4xl text-muted-foreground">
          {dataToDisplay.phase}
        </p>
      </div>
      <div className="w-full md:max-w-md">
        <Button onClick={toggleTimer} size="lg" className="w-full text-lg">
          cancel
        </Button>
      </div>
    </main>
  );
}
