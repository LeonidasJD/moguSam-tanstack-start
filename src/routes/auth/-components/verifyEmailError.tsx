import Text from "@/shared/ui-components/text";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const VerifyEmailError = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-20">
      <span className="border-3 border-error rounded-full p-3">
        <X size={40} className="text-error" />
      </span>
      <Text weight="bold" variant="heading" render={<h1 />}>
        Verifikacija email adrese neuspešna
      </Text>
      <Text color="brown-dark">{error}</Text>
      <Link to="/auth" className="text-gold flex items-center gap-2 underline">
        <ArrowLeft size={20} /> Nazad na kreiranje naloga
      </Link>
    </div>
  );
};

export default VerifyEmailError;
