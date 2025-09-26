'use client';

import { useState, type ChangeEventHandler } from 'react';
import axios from 'axios';

interface ImageUploaderProps {
  onUploaded: (url: string) => void;
  label?: string;
}

export function ImageUploader({ onUploaded, label = 'Upload image' }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      setUploading(true);
      setError(null);
      const response = await axios.post('/api/admin/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUploaded(response.data.data.url);
    } catch (err) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <input type="file" accept="image/*" onChange={handleChange} disabled={uploading} />
      {uploading && <p className="text-xs text-slate-500">Uploading…</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
