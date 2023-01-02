import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withApollo } from "../../lib/withApollo";
import { useMeQuery, GetProductsQuery } from "../../graphql/generated/graphql";
import { ssrGetProducts } from "../../graphql/generated/page";
import { NextPage } from "next";

const Home = ({ data }: any) => {
  console.log("🚀 ~ file: index.tsx:11 ~ Home ~ data", data);
  const { user } = useUser();
  // const { data: me, loading, error } = useMeQuery();

  // if (error) {
  //   return <h1>error</h1>;
  // }

  // if (loading) {
  //   return <h1>loading</h1>;
  // }

  // console.log(data);

  return (
    <div>
      <h1>hell world</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {
      props: {},
    };
    // return getServerPageGetProducts({}, ctx);
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));
