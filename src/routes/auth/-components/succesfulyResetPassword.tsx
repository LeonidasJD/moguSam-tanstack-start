import Text from "@/shared/ui-components/text";
import { ArrowRight, MailCheck } from "lucide-react";

import Button from "@/shared/ui-components/button";
import { useNavigate } from "@tanstack/react-router";

const SuccessfullyResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <span className="border-3 border-green  rounded-full p-3">
        <MailCheck size={40} className="text-gold" />
      </span>

      <Text weight="bold" variant="heading" render={<h1 />}>
        Lozinka je uspešno resetovana
      </Text>
      <Text color="brown-dark">
        Vaša lozinka je uspešno resetovana. Možete sada da se prijavite na svoj
        nalog.
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
  );
};

export default SuccessfullyResetPassword;
