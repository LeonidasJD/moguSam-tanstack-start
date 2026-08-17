import Button from "@/shared/ui-components/button";
import Text from "@/shared/ui-components/text";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { verifyEmailSchema } from "./-types/authTypes";
import { publicApi } from "@/configuration/axios";
import emailVerificationBg from "@/shared/assets/emailVerification.webp";
import { getErrorMessage } from "@/shared/utils/error";
import { ArrowRight, HouseIcon, MailCheck } from "lucide-react";
import CreateAccountBanner from "./-components/createAccountBanner";
import VerifyEmailError from "./-components/verifyEmailError";
import Card from "@/shared/ui-components/cards/card";

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
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-2 xl:gap-0 min-h-svh items-center md:h-svh md:overflow-hidden">
      <div
        className="bg-cover hidden md:flex md:px-2 md:pb-25 xl:pl-25 items-end bg-center md:h-full"
        style={{ backgroundImage: `url(${emailVerificationBg})` }}
      >
        <CreateAccountBanner
          title="MoguSam"
          description="Održavanje doma, jednostavno i bez stresa. Dobrodošli u zajednicu."
        />
      </div>
      <div className="flex justify-center px-2 md:py-0 items-center xl:px-0">
        <Card className="w-full py-5 md:py-10 md:px-2 xl:px-15 max-w-xl border border-gold/30 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-row justify-center items-center gap-2">
            <Text
              className="text-2xl md:text-3xl"
              weight="bold"
              color="gold"
              render={<span />}
            >
              MoguSam
            </Text>
            <HouseIcon className="w-10 h-10 text-gold" />
          </div>

          <div className="flex flex-col items-center gap-8 md:gap-10">
            <span className="border-3 border-green rounded-full p-3">
              <MailCheck size={40} className="text-gold" />
            </span>

            <div className="flex flex-col gap-2 text-center">
              <Text
                variant="heading"
                weight="semibold"
                render={<h1 />}
                color="black"
              >
                Email addresa uspešno verifikovana
              </Text>
              <Text
                variant="paragraph"
                weight="normal"
                render={<p />}
                color="brown-dark"
              >
                Vaša email adresa je uspešno verifikovana. Možete sada da se
                prijavite na svoj nalog.
              </Text>
            </div>

            <Button
              variant="primary"
              size="normal"
              shape="labeledIcon"
              icon={<ArrowRight />}
              className="w-full"
              onClick={() => {
                navigate({ to: "/auth/login" });
              }}
            >
              Prijavi se
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
