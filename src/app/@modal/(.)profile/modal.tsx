"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/hooks/use-media-query";

export function ProfileModal({ children }: { children: React.ReactNode }) {
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
        <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOnOpenChange}>
      <DrawerContent className="max-h-[96%]">
        {children}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button>close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
