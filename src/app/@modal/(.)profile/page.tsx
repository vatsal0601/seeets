import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProfileCard } from "~/components/profile-card";
import { ProfileModal } from "./modal";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <ProfileModal>
      <ProfileCard
        imageUrl={user.imageUrl}
        firstName={user.firstName ?? "John"}
        lastName={user.lastName ?? "Doe"}
        fullName={user.fullName ?? "John Doe"}
        createdAt={user.createdAt}
        shouldWrapInCard={false}
      />
    </ProfileModal>
  );
}
