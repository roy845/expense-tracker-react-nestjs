interface Props {
  previewUrl: string | null;
  loading: boolean;
}

const ReceiptPreview: React.FC<Props> = ({ previewUrl, loading }) => {
  if (loading) {
    return (
      <div className="mt-4 flex justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return previewUrl ? (
    <div className="mt-4 flex justify-center">
      <img
        src={previewUrl}
        alt="Receipt Preview"
        className="max-w-full h-auto rounded-lg shadow-md"
      />
    </div>
  ) : null;
};

export default ReceiptPreview;
