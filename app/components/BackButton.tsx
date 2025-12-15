import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="flex">
      <GoArrowLeft aria-hidden="true" className="relative top-1 right-2" />
      <button onClick={() => router.back()}>Back to shows</button>
    </div>
  );
};

export default BackButton;
