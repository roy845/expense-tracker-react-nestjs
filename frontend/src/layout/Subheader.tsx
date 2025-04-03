type SubheaderProps = {
  title: string;
};

const Subheader = ({ title }: SubheaderProps) => {
  return <h2 className="text-2xl font-bold text-center">{title}</h2>;
};

export default Subheader;
