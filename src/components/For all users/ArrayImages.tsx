import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Props {
  productId: number;
}

const ArrayImages: React.FC<Props> = ({ productId }) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleDeleteClick = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('file', image);
    });

    try {
      const response = await axios.post(`/api/v1/producer/products/${productId}/images`, formData);
      const { data } = response;
      setUploadedUrls(data.imageUrls);
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" id="imageUrls" name='imageUrls' onChange={handleFileInputChange} multiple />
        <button type="submit">Upload</button>
      </form>
      {previewUrls.map((url, index) => (
        <div key={url}>
          <img src={url} alt={`Preview ${index}`} />
          <button type="button" onClick={() => handleDeleteClick(index)}>
            Delete
          </button>
        </div>
      ))}
      {uploadedUrls.map((url) => (
        <div key={url}>
          <img src={url} alt="Uploaded" />
        </div>
      ))}
    </div>
  );
};

export default ArrayImages;