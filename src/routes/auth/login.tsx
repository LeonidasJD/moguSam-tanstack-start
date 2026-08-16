import loginBg from "@/shared/assets/loginBackground.webp";
import Button from "@/shared/ui-components/button";
import Card from "@/shared/ui-components/cards/card";
import { Input } from "@/shared/ui-components/form/field";
import Spinner from "@/shared/ui-components/spinner";
import Text from "@/shared/ui-components/text";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { HouseIcon } from "lucide-react";
import { useLoginMutation } from "./-api/authApi";
import CreateAccountBanner from "./-components/createAccountBanner";
import { loginSchema } from "./-types/authTypes";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Prijavi se - MoguSam" },
      {
        name: "description",
        content:
          "Prijavite se na MoguSam-u i prepustite brigu o vašem domu pouzdanim stručnjacima.",
      },
    ],
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLoginMutation();
  const form = useForm({
    validators: {
      onSubmit: loginSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      login(value, {
        onSuccess: () => {
          navigate({ to: "/categories" });
        },
      });
    },
  });
  return (
    <section className="grid grid-cols-2">
      <div
        className="bg-cover flex pl-25 pb-25 items-end bg-center h-screen"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <CreateAccountBanner
          title="MoguSam"
          description="Na korak od majstorstva. Uloguj se i postani najbolji majstor za svoj dom."
        />
      </div>
      <div className="flex justify-center items-center">
        <Card className="w-full py-10 px-15 max-w-xl border border-gold/30 flex flex-col gap-10">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row gap-2">
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
            <Text color="brown-dark">Dobrodošli nazad!</Text>
          </div>

          <div className="flex flex-col gap-4">
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
              <form.Field name="password">
                {(field) => (
                  <Input
                    icon
                    required
                    type="password"
                    placeholder="Lozinka"
                    label="Lozinka"
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
                {isPending ? <Spinner size={12} /> : "Prijavi se"}
              </Button>
            </form>
            <div className="flex justify-end items-center">
              <Link
                className="text-gold font-semibold"
                to="/auth/forgot-password"
              >
                Zaboravljena lozinka?
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Text>
              Nemaš nalog?{" "}
              <Link className="text-gold font-semibold" to="/auth">
                Kreiraj nalog
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </section>
  );
}
