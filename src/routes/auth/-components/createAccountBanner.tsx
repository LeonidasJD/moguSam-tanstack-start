import Card from "@/shared/ui-components/cards/card";
import Text from "@/shared/ui-components/text";
import { Hammer } from "lucide-react";

type CreateAccountBannerProps = {
  title: string;
  description: string;
};

const CreateAccountBanner = ({
  title,
  description,
}: CreateAccountBannerProps) => {
  return (
    <div>
      <Card className="w-full p-7 max-w-sm flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <Hammer className="w-8 h-8 text-gold" />
          <Text variant="subheading" weight="semibold" render={<p />}>
            {title}
          </Text>
        </div>

        <div>
          <Text
            className="leading-5"
            variant="paragraph"
            weight="normal"
            color="brown-dark"
            render={<p />}
          >
            {description}
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default CreateAccountBanner;
