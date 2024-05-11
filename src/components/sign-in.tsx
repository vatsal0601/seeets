"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Icons } from "./ui/icons";

function SignInPage() {
  return (
    <main className="grid h-full w-full grow items-center p-5 sm:justify-center lg:p-10">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <SignIn.Step name="start">
              <Card className="w-full sm:w-96">
                <CardHeader>
                  <CardTitle>sign in to seeets</CardTitle>
                  <CardDescription>
                    welcome back! please sign in to continue
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-y-4">
                  <div className="grid gap-y-4">
                    <Clerk.Connection name="google" asChild>
                      <Button variant="outline" disabled={isGlobalLoading}>
                        <Clerk.Loading scope="provider:google">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-5 animate-spin" />
                            ) : (
                              <>
                                <Icons.google className="mr-2 size-5" />
                                google
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                    <Clerk.Connection name="github" asChild>
                      <Button variant="outline" disabled={isGlobalLoading}>
                        <Clerk.Loading scope="provider:github">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-5 animate-spin" />
                            ) : (
                              <>
                                <Icons.gitHub className="mr-2 size-5" />
                                github
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                    <Clerk.Connection name="twitter" asChild>
                      <Button variant="outline" disabled={isGlobalLoading}>
                        <Clerk.Loading scope="provider:twitter">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-5 animate-spin" />
                            ) : (
                              <>
                                <Icons.twitter className="mr-2 size-5" />
                                twitter
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </Button>
                    </Clerk.Connection>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="grid w-full gap-y-4">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-muted-foreground"
                      asChild
                    >
                      <Link href="/sign-up">
                        don&apos;t have an account? sign up
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </SignIn.Step>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </main>
  );
}

export { SignInPage as SignIn };
