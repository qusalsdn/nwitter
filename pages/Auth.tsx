import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Auth: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div>
        <button onClick={() => signIn("google", { callbackUrl: "/" })}>Continue with Google</button>
        <button onClick={() => signIn("github", { callbackUrl: "/" })}>Continue with Github</button>
      </div>
    </>
  );
};

export default Auth;
