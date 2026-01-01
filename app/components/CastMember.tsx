import { CastMemberProps } from "../types";
import Image from "next/image";

const CastMember = ({ member }: { member: CastMemberProps }) => {
    return(
  <div className="flex align-middle flex-col text-center gap-1 p-1">
    <div
      className="w-[130px] items-center h-[130px] rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm"
    >
      <Image src={member.person.image?.original || ""} alt={member.person.name} />
    </div>
    <div>
      <div>{ member.person.name}</div>
      <div className="text-gray-500 text-[0.8rem]">{member.character.name}</div>
    </div>
  </div>
    );
}

export default CastMember;