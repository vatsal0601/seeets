import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignIn } from "~/components/sign-in";

export default function SignInPage() {
  const { userId } = auth();

  if (userId) {
    return redirect("/dashboard");
  }

  return <SignIn />;
}
