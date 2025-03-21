import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="SignIn Dashboard"
        description="Sign in SUGUSCorp!"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
