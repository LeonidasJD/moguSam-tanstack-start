import Spinner from "../spinner";
import Text from "../text";

const PendingComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-20">
      <Text weight="bold" variant="heading" render={<h1 />}>
        Molimo sacekajte trenutak
      </Text>

      <Spinner size={40} />
    </div>
  );
};

export default PendingComponent;
