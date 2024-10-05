"use client";
import { UploadDropzone } from "../components/ui/UploadDropzone";
export default function UploadSection() {
    return (
        <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }} />
    )
}