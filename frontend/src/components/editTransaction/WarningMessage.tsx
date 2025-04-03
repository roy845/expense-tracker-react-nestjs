interface Props {
  message: string;
}

const WarningMessage: React.FC<Props> = ({ message }) =>
  message ? <p className="text-red-500 text-sm">{message}</p> : null;

export default WarningMessage;
