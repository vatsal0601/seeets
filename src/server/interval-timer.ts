import "server-only";

import { sql, eq } from "drizzle-orm";
import type { InsertInetervalTimer } from "~/server/db/schema";
import { IntervalTimer } from "~/server/db/schema";
import { db } from "./db";

const intervalTimerQuery = db
  .select({
    id: IntervalTimer.id,
    name: IntervalTimer.name,
    sets: IntervalTimer.sets,
    prepare: IntervalTimer.prepare,
    work: IntervalTimer.work,
    rest: IntervalTimer.rest,
  })
  .from(IntervalTimer)
  .where(eq(IntervalTimer.userId, sql.placeholder("id")))
  .prepare("getIntervalTimers");

export async function getIntervalTimers(userId: string) {
  return intervalTimerQuery.execute({ id: userId });
}

export async function addIntervalTimer(values: InsertInetervalTimer) {
  return db.insert(IntervalTimer).values(values).returning({
    id: IntervalTimer.id,
    name: IntervalTimer.name,
    sets: IntervalTimer.sets,
    prepare: IntervalTimer.prepare,
    work: IntervalTimer.work,
    rest: IntervalTimer.rest,
  });
}
