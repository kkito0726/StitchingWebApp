import React from 'react'
import { useState } from 'react';
import { BrowserRouter, Route, Link, useLocation } from 'react-router-dom'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export const ImgCropper = () => {
  const src = useLocation().state;
  const [imageRef, setImageRef] = useState(null);
  const [crop, setCrop] = useState({unit: "%", width: 30})
  const [croppedImageUrl, setcroppedImageUrl] = useState(null);

 

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      setcroppedImageUrl(croppedImageUrl);
    }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          
          const fileUrl = window.URL.createObjectURL(blob);
          // window.URL.revokeObjectURL(fileUrl);
          resolve(fileUrl);
        },
        "image/jpeg",
        1
      );
    });
  }

    
  return (
    <div className='App'>
      <div className='outerBox'>
        <h1>無駄な部分をトリミングする</h1>
          <div className='imageUplodeBox'>
            <h2>4. 必要な領域をドラッグで選択する [ 何度でも選択可能 ]</h2>
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={setImageRef}
                onComplete={onCropComplete}
                onChange={setCrop}
                style={{width: "60%"}}
              />
            )}
          </div>
          <br />
          <div className='imageUplodeBox'>
            <h2>5. 完成イメージはこちらに表示されます</h2>
            {croppedImageUrl && (
              <img alt="Crop" style={{ width: "60%" }} src={croppedImageUrl} />
            )}
          </div>
          <Link to="/" className='button'>トップページに戻る</Link>
      </div>
      
    </div>
  )
}
