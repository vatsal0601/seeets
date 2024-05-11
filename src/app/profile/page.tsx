import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProfileCard } from "~/components/profile-card";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="flex h-full items-center justify-center px-5 pb-8 pt-16 lg:px-10">
      <ProfileCard
        imageUrl={user.imageUrl}
        firstName={user.firstName ?? "John"}
        lastName={user.lastName ?? "Doe"}
        fullName={user.fullName ?? "John Doe"}
        createdAt={user.createdAt}
        shouldWrapInCard={true}
      />
    </main>
  );
}
