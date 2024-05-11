import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUp } from "~/components/sign-up";

export default function SignUpPage() {
  const { userId } = auth();

  if (userId) {
    return redirect("/dashboard");
  }

  return <SignUp />;
}
