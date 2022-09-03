import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Profile: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/Auth");
    }
  }, []);

  return (
    <>
      <span>Profile</span>
      <button onClick={() => signOut({ callbackUrl: "/Auth" })}>LogOut</button>
    </>
  );
};

export default Profile;
