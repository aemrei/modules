import { withAuthentication } from "src/features/auth/components/withAuthentication";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="text-slate-900">
      <h1 className="text-xl">This is Home Page</h1>
      <ul>
        <li>
          <Link href="/details/1">Details about 1</Link>
        </li>
        <li>
          <Link href="/details/2">Details about 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default withAuthentication("authenticated", HomePage);
