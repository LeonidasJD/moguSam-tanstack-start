import { createFileRoute } from "@tanstack/react-router";
import CreateAccountBanner from "./-components/createAccountBanner";
import forgotPasswordBg from "@/shared/assets/forgotPasswordBackground.webp";
import Card from "@/shared/ui-components/cards/card";
import Text from "@/shared/ui-components/text";
import { HouseIcon } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { forgotPasswordSchema } from "./-types/authTypes";
import { Input } from "@/shared/ui-components/form/field";
import Button from "@/shared/ui-components/button";
import { useForgotPasswordMutation } from "./-api/authApi";
import Spinner from "@/shared/ui-components/spinner";
import ForgotEmailSent from "./-components/forgotEmailSent";
import { useState } from "react";

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
    <section className="grid grid-cols-2">
      <div
        className="bg-cover flex pl-25 pb-25 items-end bg-center h-screen"
        style={{ backgroundImage: `url(${forgotPasswordBg})` }}
      >
        <CreateAccountBanner
          title="MoguSam"
          description="Zaboravljena lozinka? Nema problema. Unesite svoju email adresu i mi ćemo vam poslati link za resetovanje lozinke."
        />
      </div>

      <div className="flex justify-center items-center">
        <Card className="w-full py-10 px-15 max-w-xl border border-gold/30 flex flex-col gap-10">
          <div className="flex flex-row justify-center items-center gap-2">
            <Text
              className="text-3xl"
              weight="bold"
              color="gold"
              render={<span />}
            >
              MoguSam
            </Text>
            <HouseIcon className="w-10 h-10 text-gold" />
          </div>
          {!emailSent ? (
            <div className="flex flex-col gap-10">
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
