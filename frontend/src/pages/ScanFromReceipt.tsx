import MainLayout from "../layout/MainLayout";
import FileUploadBox from "../components/scanFromReceipt/FileUploadBox";
import ReceiptPreview from "../components/scanFromReceipt/ReceiptPreview";
import UploadButton from "../components/scanFromReceipt/UploadButton";
import useScanFromReceipt from "../hooks/useScanFromReceipt";

const ScanFromReceipt = () => {
  const {
    file,
    handleFileChange,
    isDarkMode,
    loading,
    previewLoading,
    previewUrl,
    uploadReceipt,
  } = useScanFromReceipt();

  return (
    <MainLayout title="Scan From Receipt">
      <div
        className={`max-w-lg mx-auto p-6 rounded-lg shadow-md transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-900 hover:bg-gray-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Upload a Receipt
        </h2>

        <FileUploadBox
          file={file}
          onChange={handleFileChange}
          isDarkMode={isDarkMode}
        />

        <ReceiptPreview previewUrl={previewUrl} loading={previewLoading} />

        <UploadButton onClick={uploadReceipt} loading={loading} />
      </div>
    </MainLayout>
  );
};

export default ScanFromReceipt;
