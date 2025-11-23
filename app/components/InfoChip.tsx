const InfoChip = ({label, value}: {label: string, value?: string | number}) => {
  return (
    <div className="inline-flex gap-2 items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
      <span>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};

export default InfoChip;
