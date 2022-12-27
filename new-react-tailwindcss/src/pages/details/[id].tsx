import { useNavigate, useParams } from "react-router-dom";
import { withAuthentication } from "src/features/auth/components/withAuthentication";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    navigate("/404");
    return null;
  }
  return <span className="text-slate-900">Detail page about {id}</span>;
};

export default withAuthentication("authenticated", DetailPage);
