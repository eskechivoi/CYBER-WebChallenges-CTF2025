import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="SignUp Dashboard"
        description="Sign up to be a new minion for SUGUS Corp!"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
