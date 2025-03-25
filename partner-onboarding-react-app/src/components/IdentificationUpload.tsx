import { useState, ChangeEvent } from "react";

interface IdentificationUploadProps {
  name: string;
}

const IdentificationUpload: React.FC<IdentificationUploadProps> = ({
  name,
}) => {
  const [file, setFile] = useState<File | null>(null); // File type for state

  // Event type for file input change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  return (
    <div>
      <h3>Upload Passport or Driver's License for {name}</h3>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf" // Adjust based on the allowed file types
        onChange={handleFileChange}
      />
      {file && <p>File Selected: {file.name}</p>}
    </div>
  );
};

export default IdentificationUpload;
