import { MailCheck, ArrowLeft } from "lucide-react";
import Text from "@/shared/ui-components/text";
import Divider from "@/shared/ui-components/divider";
import Button from "@/shared/ui-components/button";
import { useNavigate } from "@tanstack/react-router";

const ForgotEmailSent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <MailCheck size={40} className="text-gold" />
      <Text weight="bold" variant="heading" render={<h1 />}>
        {" "}
        Link za resetovanje lozinke je poslat{" "}
      </Text>

      <Text color="brown-dark" className="leading-5">
        Poslali smo link za resetovanje lozinke na vašu email adresu. Molimo vas
        da proverite svoje sanduče i kliknete na link kako biste resetovali
        svoju lozinku.
      </Text>

      <Divider variant="primary" />
      <Text variant="small" color="brown-dark">
        Proverite 'Span' ili 'Junk' folder ukoliko poruka kasni
      </Text>

      <Button
        variant="link"
        size="small"
        shape="labeledIcon"
        icon={<ArrowLeft />}
        className="w-fit p-0"
        onClick={() => navigate({ to: "/auth/login" })}
      >
        Nazad na prijavu
      </Button>
    </div>
  );
};

export default ForgotEmailSent;
