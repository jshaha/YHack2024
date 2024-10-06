
export default function PDFCards({ pdfs }: { pdfs: Array<{ id: string; name: string; uploadDate: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pdfs.map((pdf) => (
        <div key={pdf.id} className="bg-white rounded-lg shadow-md p-4 text-gray-800 transform scale-125">
          <h3 className="font-semibold text-lg mb-2">{pdf.name}</h3>
          <p className="text-sm text-gray-600">Uploaded on: {pdf.uploadDate}</p>
        </div>
      ))}
    </div>
  )}