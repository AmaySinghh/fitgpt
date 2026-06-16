import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profile";
import ProfileForm from "@/components/shared/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const profile = await getProfile();

  return (
    <div className="min-h-screen bg-black px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">
            {profile ? "Edit your profile" : "Set up your profile"}
          </h1>
          <p className="text-zinc-400 text-sm">
            We use this to calculate your daily calorie target and personalize
            your meal plans.
          </p>
        </div>
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
