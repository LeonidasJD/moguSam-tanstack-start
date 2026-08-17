import forgotPasswordBg from "@/shared/assets/forgotPasswordBackground.webp";
import Button from "@/shared/ui-components/button";
import Card from "@/shared/ui-components/cards/card";
import { Input } from "@/shared/ui-components/form/field";
import Spinner from "@/shared/ui-components/spinner";
import Text from "@/shared/ui-components/text";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, HouseIcon } from "lucide-react";
import { useState } from "react";
import { useForgotPasswordMutation } from "./-api/authApi";
import CreateAccountBanner from "./-components/createAccountBanner";
import ForgotEmailSent from "./-components/forgotEmailSent";
import { forgotPasswordSchema } from "./-types/authTypes";

export const Route = createFileRoute("/auth/forgot-password")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Zaboravljena lozinka - MoguSam" },
      {
        name: "description",
        content:
          "Zaboravljena lozinka? Nema problema. Unesite svoju email adresu i mi ćemo vam poslati link za resetovanje lozinke.",
      },
    ],
  }),
});

function RouteComponent() {
  const [emailSent, setEmailSent] = useState(false);
  const { mutate: forgotPassword, isPending } = useForgotPasswordMutation();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      forgotPassword(value, {
        onSuccess: () => {
          setEmailSent(true);
        },
      });
    },
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-2 xl:gap-0 min-h-screen items-center">
      <div
        className="bg-cover hidden md:flex md:px-2 md:pb-25 xl:pl-25 items-end bg-center h-screen"
        style={{ backgroundImage: `url(${forgotPasswordBg})` }}
      >
        <CreateAccountBanner
          title="MoguSam"
          description="Zaboravljena lozinka? Nema problema. Unesite svoju email adresu i mi ćemo vam poslati link za resetovanje lozinke."
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
          {!emailSent ? (
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="flex flex-col gap-2">
                <Text
                  variant="heading"
                  weight="semibold"
                  render={<h1 />}
                  color="black"
                >
                  Zaboravio si svoju lozinku?
                </Text>
                <Text
                  variant="paragraph"
                  weight="normal"
                  render={<p />}
                  color="brown-dark"
                >
                  Unesite svoju email adresu i mi ćemo vam poslati link za
                  resetovanje lozinke.
                </Text>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <form.Field name="email">
                  {(field) => (
                    <Input
                      icon
                      required
                      type="email"
                      placeholder="Email"
                      label="Email adresa"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors[0]?.message || ""}
                    />
                  )}
                </form.Field>

                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Spinner size={12} />
                  ) : (
                    "Pošalji link za resetovanje lozinke"
                  )}
                </Button>
                <div className="flex justify-end">
                  <Link
                    to="/auth/login"
                    className="text-gold text-sm md:text-base font-semibold flex flex-row gap-2 items-center"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Nazad na prijavu
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <ForgotEmailSent />
          )}
        </Card>
      </div>
    </section>
  );
}
