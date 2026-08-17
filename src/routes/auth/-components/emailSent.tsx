import Button from "@/shared/ui-components/button";
import Card from "@/shared/ui-components/cards/card";
import Divider from "@/shared/ui-components/divider";
import Text from "@/shared/ui-components/text";
import { ArrowLeft, MailCheck } from "lucide-react";

const EmailSent = ({ onHandleBack }: { onHandleBack: () => void }) => {
  return (
    <Card className="w-full py-5 md:py-10 md:px-2 xl:px-15 max-w-xl border border-gold/30 flex flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-4 w-full max-w-xl">
        <MailCheck size={40} className="text-gold" />
        <Text weight="bold" variant="heading" render={<h1 />}>
          {" "}
          Verifikujte vašu email adresu{" "}
        </Text>

        <Text color="brown-dark" className="leading-5">
          Poslali smo verifikacioni link na vašu email adresu. Molimo vas da
          proverite svoje sanduče i kliknete na link kako biste aktivirali svoj
          nalog.
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
          onClick={() => onHandleBack()}
        >
          Nazad na prijavu
        </Button>
      </div>
    </Card>
  );
};

export default EmailSent;
