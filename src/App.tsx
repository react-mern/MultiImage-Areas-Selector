import React, { useState } from 'react';
import CropImage from './components/cropImage'; 

interface Selection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const App: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);
  const [imageSelections, setImageSelections] = useState<{ [imageSrc: string]: Selection[] }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const srcs = files.map(file => URL.createObjectURL(file));
      setImageFiles(files);
      setImageSrcs(srcs);
      setImageSelections({});
    }
  };

  const handleSelectionsUpdate = (updatedSelections: { [imageSrc: string]: Selection[] }) => {
    setImageSelections(updatedSelections);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      {imageSrcs.length > 0 && (
        <CropImage
          imageSrcs={imageSrcs}
          onSelectionsUpdate={handleSelectionsUpdate}
        />
      )}
    </div>
  );
};

export default App;
