import Button from "@/shared/ui-components/button";
import Text from "@/shared/ui-components/text";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { verifyEmailSchema } from "./-types/authTypes";
import { publicApi } from "@/configuration/axios";
import emailVerificationBg from "@/shared/assets/emailVerification.webp";
import { getErrorMessage } from "@/shared/utils/error";
import { ArrowRight, MailCheck } from "lucide-react";
import CreateAccountBanner from "./-components/createAccountBanner";
import VerifyEmailError from "./-components/verifyEmailError";

export const Route = createFileRoute("/auth/verify-email")({
  component: RouteComponent,
  validateSearch: verifyEmailSchema,
  loaderDeps: ({ search }) => ({ token: search.token }),
  loader: async ({ deps }) => {
    try {
      const { data } = await publicApi.post("/api/users/verify-email", {
        token: deps.token,
      });
      return data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  errorComponent: ({ error }) => {
    return <VerifyEmailError error={error.message} />;
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  return (
    <section className="grid grid-cols-2 h-screen">
      <div
        className="bg-cover flex pl-25 pb-25 items-end bg-center h-screen"
        style={{ backgroundImage: `url(${emailVerificationBg})` }}
      >
        <CreateAccountBanner
          title="MoguSam"
          description="Održavanje doma, jednostavno i bez stresa. Dobrodošli u zajednicu."
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <span className="border-3 border-green  rounded-full p-3">
          <MailCheck size={40} className="text-gold" />
        </span>

        <Text weight="bold" variant="heading" render={<h1 />}>
          Email addresa uspešno verifikovana
        </Text>
        <Text color="brown-dark">
          Vaša email adresa je uspešno verifikovana. Možete sada da se prijavite
          na svoj nalog.
        </Text>

        <Button
          variant="primary"
          size="normal"
          shape="labeledIcon"
          icon={<ArrowRight />}
          onClick={() => {
            navigate({ to: "/auth/login" });
          }}
        >
          Prijavi se
        </Button>
      </div>
    </section>
  );
}
