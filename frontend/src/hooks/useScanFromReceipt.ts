import { toast } from "react-toastify";
import useAxiosPrivateRestApi from "./useAxiosPrivateRestApi";
import { useDarkMode } from "./useDarkMode";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const useScanFromReceipt = () => {
  const axiosPrivateRestApi = useAxiosPrivateRestApi();
  const { isDarkMode } = useDarkMode();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate: NavigateFunction = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPreviewLoading(true);
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const objectUrl = URL.createObjectURL(selectedFile);
      setTimeout(() => {
        setPreviewUrl(objectUrl);
        setPreviewLoading(false);
      }, 500);
    }
  };

  const uploadReceipt = async () => {
    if (!file) {
      toast.error("No File Selected");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosPrivateRestApi.post("/api/receipts/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/transactions");
      toast.success("Receipt processed successfully!");
    } catch (err) {
      toast.error("Error processing receipt.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    isDarkMode,
    file,
    handleFileChange,
    previewUrl,
    previewLoading,
    uploadReceipt,
    loading,
  };
};

export default useScanFromReceipt;
