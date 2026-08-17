import registracijaBg from "@/shared/assets/registracija-desktop-bg.webp";
import Button from "@/shared/ui-components/button";
import Card from "@/shared/ui-components/cards/card";
import { Input } from "@/shared/ui-components/form/field";
import Text from "@/shared/ui-components/text";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseIcon } from "lucide-react";
import CreateAccountBanner from "./-components/createAccountBanner";
import { useForm } from "@tanstack/react-form";
import { createAccountSchema } from "./-types/authTypes";
import { useCreateAccountMutation } from "./-api/authApi";
import EmailSent from "./-components/emailSent";
import { useState } from "react";
import Spinner from "@/shared/ui-components/spinner";

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,

  head: () => ({
    meta: [
      { title: "Kreiraj nalog - MoguSam" },
      {
        name: "description",
        content:
          "Kreiraj nalog na MoguSam-u i prepustite brigu o vašem domu pouzdanim stručnjacima.",
      },
    ],
  }),
});

function RouteComponent() {
  const { mutate: createAccount, isPending } = useCreateAccountMutation();
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm({
    validators: {
      onSubmit: createAccountSchema,
    },
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
      createAccount(value, {
        onSuccess: () => {
          setEmailSent(true);
        },
      });
      form.reset();
    },
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-2 xl:gap-0 min-h-screen items-center">
      <div
        className="bg-cover hidden md:flex md:px-2 md:pb-25  xl:pl-25 items-end bg-center h-screen"
        style={{ backgroundImage: `url(${registracijaBg})` }}
      >
        <CreateAccountBanner
          title="MoguSam"
          description="Pridružite se zajednici i prepustite brigu o vašem domu pouzdanim stručnjacima. Vaš dom u sigurnim rukama."
        />
      </div>
      <div className="flex justify-center px-2  md:py-0 items-center xl:px-0">
        {!emailSent && (
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
            <div className="flex flex-col gap-2">
              <Text
                variant="heading"
                weight="semibold"
                render={<h1 />}
                color="black"
              >
                Kreiraj nalog
              </Text>
              <Text
                variant="paragraph"
                weight="normal"
                render={<p />}
                color="brown-dark"
              >
                Unesi svoje podatke za kreiranje naloga
              </Text>
            </div>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="flex flex-col gap-4"
              >
                <form.Field name="name">
                  {(field) => (
                    <Input
                      icon
                      required
                      type="text"
                      placeholder="Petar Petrovic"
                      label="Ime i prezime"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors[0]?.message || ""}
                    />
                  )}
                </form.Field>
                <form.Field name="email">
                  {(field) => (
                    <Input
                      icon
                      required
                      type="email"
                      placeholder="Petar Petrovic"
                      label="Email adresa"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors[0]?.message || ""}
                    />
                  )}
                </form.Field>

                <form.Field name="password">
                  {(field) => (
                    <Input
                      icon
                      required
                      type="password"
                      placeholder="********"
                      label="Lozinka"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors[0]?.message || ""}
                    />
                  )}
                </form.Field>

                <form.Field name="confirmPassword">
                  {(field) => (
                    <Input
                      icon
                      required
                      type="password"
                      placeholder="********"
                      label="Potvrdi lozinku"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors[0]?.message || ""}
                    />
                  )}
                </form.Field>

                <Button
                  type="submit"
                  variant="primary"
                  size="normal"
                  shape="text"
                  disabled={isPending}
                >
                  {isPending ? <Spinner size={12} /> : "Kreiraj nalog"}
                </Button>
              </form>
            </div>

            <div className="flex justify-center items-center">
              <Text>
                Već imaš nalog?{" "}
                <Link className="text-gold font-semibold" to="/auth/login">
                  Prijavi se
                </Link>
              </Text>
            </div>
          </Card>
        )}
        {emailSent && <EmailSent onHandleBack={() => setEmailSent(false)} />}
      </div>
    </section>
  );
}
