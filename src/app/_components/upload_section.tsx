"use client";
import { UploadDropzone } from "../components/ui/UploadDropzone";
import { useRouter } from 'next/navigation';

export default function UploadSection() {
    const router = useRouter();

    return (
        <UploadDropzone
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }} />
    )
}