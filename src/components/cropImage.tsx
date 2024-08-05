import React, { useRef, useState, useEffect } from "react";

interface CropImageProps {
  imageSrcs: string[];
  onSelectionsUpdate: (imageSelections: {
    [imageSrc: string]: {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }[];
  }) => void;
}

const CropImage: React.FC<CropImageProps> = ({
  imageSrcs,
  onSelectionsUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
  const [selections, setSelections] = useState<{
    [imageSrc: string]: {
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }[];
  }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [endPos, setEndPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.src = imageSrcs[currentImageIdx];
    image.onload = () => {
      if (canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
        redraw();
      }
    };
  }, [currentImageIdx, imageSrcs]);

  useEffect(() => {
    redraw();
  }, [currentImageIdx, selections]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setStartPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setEndPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    redraw();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (startPos && endPos) {
      const distanceX = Math.abs(startPos.x - endPos.x);
      const distanceY = Math.abs(startPos.y - endPos.y);
      if (distanceX > 5 && distanceY > 5) {
        const currentSrc = imageSrcs[currentImageIdx];
        const newSelection = {
          startX: startPos.x,
          startY: startPos.y,
          endX: endPos.x,
          endY: endPos.y,
        };
        const updatedSelections = {
          ...selections,
          [currentSrc]: [...(selections[currentSrc] || []), newSelection],
        };
        setSelections(updatedSelections);
        onSelectionsUpdate(updatedSelections);
      }
      setStartPos(null);
      setEndPos(null);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const currentSrc = imageSrcs[currentImageIdx];
      const updatedSelections = (selections[currentSrc] || []).filter(
        (selection) => {
          const { startX, startY, endX, endY } = selection;
          const x = Math.min(startX, endX);
          const y = Math.min(startY, endY);
          const width = Math.abs(startX - endX);
          const height = Math.abs(startY - endY);

          const buttonX = x + width / 2 - 10;
          const buttonY = y + height / 2 - 10;
          const buttonSize = 20;

          return !(
            offsetX >= buttonX &&
            offsetX <= buttonX + buttonSize &&
            offsetY >= buttonY &&
            offsetY <= buttonY + buttonSize
          );
        }
      );

      if (updatedSelections.length !== (selections[currentSrc] || []).length) {
        const updatedSelectionsMap = {
          ...selections,
          [currentSrc]: updatedSelections,
        };
        setSelections(updatedSelectionsMap);
        onSelectionsUpdate(updatedSelectionsMap);
        redraw();
      }
    }
  };

  const redraw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && imageSrcs.length > 0) {
      const image = new Image();
      image.src = imageSrcs[currentImageIdx];
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);

        const currentSrc = imageSrcs[currentImageIdx];
        (selections[currentSrc] || []).forEach((selection) => {
          const { startX, startY, endX, endY } = selection;
          const x = Math.min(startX, endX);
          const y = Math.min(startY, endY);
          const width = Math.abs(startX - endX);
          const height = Math.abs(startY - endY);

          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          ctx.fillRect(x, y, width, height);

          // Draw delete button
          const buttonX = x + width / 2 - 10;
          const buttonY = y + height / 2 - 10;
          const buttonSize = 20;

          ctx.fillStyle = "white";
          ctx.fillRect(buttonX, buttonY, buttonSize, buttonSize);
          ctx.strokeStyle = "black";
          ctx.strokeRect(buttonX, buttonY, buttonSize, buttonSize);
          ctx.fillStyle = "black";
          ctx.font = "14px Arial";
          ctx.fillText("X", buttonX + 5, buttonY + 15);
        });

        if (startPos && endPos) {
          const x = Math.min(startPos.x, endPos.x);
          const y = Math.min(startPos.y, endPos.y);
          const width = Math.abs(startPos.x - endPos.x);
          const height = Math.abs(startPos.y - endPos.y);

          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          ctx.fillStyle = "rgba(0, 0, 255, 0.3)";
          ctx.fillRect(x, y, width, height);
        }
      };
    }
  };

  const handleNextImage = () => {
    setCurrentImageIdx((prevIdx) => (prevIdx + 1) % imageSrcs.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIdx(
      (prevIdx) => (prevIdx - 1 + imageSrcs.length) % imageSrcs.length
    );
  };

  return (
    <div>
      <p>Current Image: {currentImageIdx + 1}/{imageSrcs.length}</p>
      <button onClick={handlePreviousImage} disabled={imageSrcs.length === 0}>
        Previous
      </button>
      <button onClick={handleNextImage} disabled={imageSrcs.length === 0}>
        Next
      </button>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
        style={{ border: "1px solid black" }}
      />
      <p>Selected Areas Coordinates: {JSON.stringify(selections[imageSrcs[currentImageIdx]] || [])}</p>
    </div>
  );
};

export default CropImage;
