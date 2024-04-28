"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/hooks/use-media-query";

export function IntervalTimerModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  React.useEffect(() => {
    if (!open) {
      setOpen(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOnOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        router.back();
      }
      setOpen(open);
    },
    [router],
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOnOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">interval timer</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOnOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl">interval timer</DrawerTitle>
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
