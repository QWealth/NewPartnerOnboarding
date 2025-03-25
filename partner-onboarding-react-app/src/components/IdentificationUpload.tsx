import { useState } from "react";

const IdentificationUpload = ({ name }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
