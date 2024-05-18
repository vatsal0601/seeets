"use client";

import { Minus, Plus, Save } from "lucide-react";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TimePickerInput } from "~/components/ui/time-picker-input";
import { useIntervalTimer } from "~/hooks/use-interval-timer";

const MAX_SETS = 50;

function SetsInput({
  sets,
  setSets,
}: {
  sets: number;
  setSets: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleSetIncrement = () => {
    setSets((prev) => (prev < MAX_SETS ? prev + 1 : prev));
  };

  const handleSetDecrement = () => {
    setSets((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") return;
    e.preventDefault();
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = sets + step;

      if (newValue < 0) return;

      setSets(newValue);
    }
    if (e.key >= "0" && e.key <= "9") {
      let newValue = sets === 0 ? e.key : sets.toString() + e.key;

      if (parseInt(newValue, 10) > MAX_SETS) newValue = e.key;

      setSets(parseInt(newValue, 10));
    }
  };

  return (
    <Card className="flex flex-col space-y-1.5 p-4">
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
          type="tel"
          inputMode="decimal"
          min={0}
          value={sets}
          onKeyDown={handleKeyDown}
          className="w-full text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none"
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
      {sets >= MAX_SETS && (
        <p className="text-error text-center text-sm text-destructive-foreground">
          you&apos;ve reached max sets
        </p>
      )}
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
    <Card className="flex flex-col space-y-1.5 p-4">
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

function IntervalTimerForPage({ userId }: { userId: string | null }) {
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
  const { isTimerRunning, toggleTimer, dataToDisplay } = useIntervalTimer({
    sets,
    prepare,
    work,
    rest,
  });

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
      <main className="page-container flex flex-col items-center justify-between gap-4 bg-muted/20">
        <div className="grid w-full gap-4 md:max-w-md">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              interval timer
            </h3>
            {userId ? (
              <Button variant="outline">
                <Save className="mr-2 size-5" />
                <span>save timer</span>
              </Button>
            ) : null}
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
      <main className="page-container grid place-content-center bg-muted/20">
        <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          oops something went wrong! :(
        </h1>
      </main>
    );
  }

  return (
    <main className="page-container flex flex-col items-center justify-between gap-4 bg-muted/20">
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

export { IntervalTimerForPage };
