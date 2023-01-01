import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  console.log("🚀 ~ file: index.tsx:5 ~ Home ~ user", user);

  return (
    <div>
      <h1>hell world</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link href="/api/auth/logout" />
    </div>
  );
}
