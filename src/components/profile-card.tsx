"use client";

import { useClerk } from "@clerk/nextjs";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Icons } from "~/components/ui/icons";
import { useMediaQuery } from "~/hooks/use-media-query";
import { ConditionalWrapper, cn, getUserInitials } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface User {
  imageUrl: string;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: number;
  shouldWrapInCard: boolean;
}

function ProfileCard({
  firstName,
  lastName,
  fullName,
  imageUrl,
  createdAt,
  shouldWrapInCard,
}: User) {
  const [isLoading, setIsLoading] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut(() => router.replace("/"));
  };

  return (
    <ConditionalWrapper
      condition={shouldWrapInCard}
      wrapper={(children) => <Card className="w-full sm:w-96">{children}</Card>}
    >
      <ConditionalWrapper
        condition={!shouldWrapInCard && !isDesktop}
        wrapper={(children) => (
          <div className="grid gap-4 px-4 pt-4">{children}</div>
        )}
      >
        <CardHeader className={cn(!shouldWrapInCard && "p-0")}>
          <div className="flex flex-col items-center justify-between gap-5">
            <Avatar className="size-20">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>
                {getUserInitials(firstName, lastName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-center">{fullName}</CardTitle>
              <CardDescription className="text-center">
                (member since: {format(new Date(createdAt), "MMMM yyyy")})
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent
          className={cn("flex flex-col gap-4", !shouldWrapInCard && "p-0")}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="powerlifter-mode">powerlifter mode</Label>
            <Switch id="powerlifter-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pt-mode">personal trainer mode</Label>
            <Switch id="pt-mode" />
          </div>
        </CardContent>
        <CardFooter className={cn(!shouldWrapInCard && "p-0")}>
          <Button
            variant={!shouldWrapInCard && !isDesktop ? "outline" : "default"}
            onClick={handleSignOut}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 size-5 animate-spin" />
            ) : null}
            <span>{isLoading ? "signing out..." : "sign-out"}</span>
          </Button>
        </CardFooter>
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
}

export { ProfileCard };
