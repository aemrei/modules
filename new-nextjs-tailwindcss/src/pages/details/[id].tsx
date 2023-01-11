import { withAuthentication } from "src/features/auth/components/withAuthentication";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface Props {
  id: string;
}

const DetailPage = ({ id }: Props) => {
  const router = useRouter();

  if (!id) {
    router.push("/404");
    return null;
  }
  return <span className="text-slate-900">Detail page about {id}</span>;
};

export default withAuthentication("authenticated", DetailPage);

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (
  context,
) => {
  const { id } = context.params || {};
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: { id },
  };
};
