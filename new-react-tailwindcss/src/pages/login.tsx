import { LoginForm } from "src/features/auth/components/LoginForm";
import { withAuthentication } from "src/features/auth/components/withAuthentication";

export default withAuthentication("unauthenticated", LoginForm);
