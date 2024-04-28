import { auth } from "@clerk/nextjs/server";
import { IntervalTimerForPage } from "~/components/interval-timer";

export default function IntervalTimerPage() {
  const { userId } = auth();

  return <IntervalTimerForPage userId={userId} />;
}
