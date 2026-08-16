import { createFileRoute } from "@tanstack/react-router";
import CreateAccountBanner from "./-components/createAccountBanner";
import forgotPasswordBg from "@/shared/assets/forgotPasswordBackground.webp";
import Card from "@/shared/ui-components/cards/card";
import Text from "@/shared/ui-components/text";
import { LockKeyhole } from "lucide-react";
import { resetPasswordSchema, verifyEmailSchema } from "./-types/authTypes";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/shared/ui-components/form/field";
import { useResetPasswordMutation } from "./-api/authApi";
import Button from "@/shared/ui-components/button";
import Spinner from "@/shared/ui-components/spinner";
import SuccessfullyResetPassword from "./-components/succesfulyResetPassword";
import { useState } from "react";

export const Route = createFileRoute("/auth/reset-password")({
  validateSearch: verifyEmailSchema,
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Resetuj svoju lozinku - MoguSam" },
      {
        name: "description",
        content: "Resetujte svoju lozinku i nastavite sa MoguSam.",
      },
    ],
  }),
});

function RouteComponent() {
  const { token } = Route.useSearch();
  const [successfullyResetPassword, setSuccessfullyResetPassword] =
    useState(false);
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const form = useForm({
    defaultValues: {
      token: token,
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: ({ value }) => {
      resetPassword(value, {
        onSuccess: () => {
          setSuccessfullyResetPassword(true);
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
          description="Resetujte svoju lozinku i nastavite sa MoguSam."
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

            <LockKeyhole className="w-10 h-10 text-gold" />
          </div>

          {!successfullyResetPassword ? (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <Text
                  variant="heading"
                  weight="semibold"
                  render={<h1 />}
                  color="black"
                >
                  Resetuj svoju lozinku
                </Text>
                <Text
                  variant="paragraph"
                  weight="normal"
                  render={<p />}
                  color="brown-dark"
                >
                  Unesi novu lozinku i potvrdite je
                </Text>
              </div>
              <div>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <form.Field name="password">
                    {(field) => (
                      <Input
                        required
                        label="Nova lozinka"
                        type="password"
                        placeholder="********"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.errors[0]?.message || ""}
                      />
                    )}
                  </form.Field>

                  <form.Field name="confirmPassword">
                    {(field) => (
                      <Input
                        required
                        label="Potvrdi lozinku"
                        type="password"
                        placeholder="********"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={field.state.meta.errors[0]?.message || ""}
                      />
                    )}
                  </form.Field>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? <Spinner /> : "Resetuj lozinku"}
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <SuccessfullyResetPassword />
          )}
        </Card>
      </div>
    </section>
  );
}
