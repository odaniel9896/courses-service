import { getAccessToken, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <h1>hell world</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link href="/api/auth/logout" />
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async ({ req, res }) => {
    console.log(await getAccessToken(req, res));
    return {
      props: {},
    };
  },
});
