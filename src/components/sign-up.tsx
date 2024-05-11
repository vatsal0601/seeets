"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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

function SignUpPage() {
  return (
    <main className="grid h-full w-full grow items-center p-5 sm:justify-center lg:p-10">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <SignUp.Step name="start">
              <Card className="w-full sm:w-96">
                <CardHeader>
                  <CardTitle>let&apos;s get started</CardTitle>
                  <CardDescription>
                    welcome! please sign up to continue
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
                  <div className="grid w-full">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-muted-foreground"
                      asChild
                    >
                      <Link href="/sign-in">
                        already have an account? sign in
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </SignUp.Step>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </main>
  );
}

export { SignUpPage as SignUp };
