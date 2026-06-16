"use client";

import { useState, useRef } from "react";
import { scanFood } from "@/actions/scanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, X, Sparkles, CheckCircle } from "lucide-react";
import Image from "next/image";

interface ScanResult {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: string;
}

interface Props {
  usage: { allowed: boolean; used: number; limit: number };
}

export default function FoodScanner({ usage }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selected);
  }

  function handleClear() {
    setPreview(null);
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleScan() {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "fitgpt_preset");
      formData.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
      );

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const uploadData = await uploadRes.json();

      if (!uploadData.secure_url) {
        setError("Failed to upload image to cloud storage");
        setLoading(false);
        return;
      }

      const imageUrl = uploadData.secure_url;

      // Scan the food using the Cloudinary URL
      const scanFormData = new FormData();
      scanFormData.append("imageUrl", imageUrl);

      const response = await scanFood(scanFormData);

      if (response?.error) {
        setError(response.error);
      } else if (response?.result) {
        setResult(response.result);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  const confidenceColor = {
    high: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    low: "text-red-400 bg-red-500/10 border-red-500/20",
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Camera className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">Upload food image</h2>
              <p className="text-zinc-400 text-xs">JPG, PNG up to 5MB</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-white/20 text-zinc-400 text-xs"
          >
            {usage.used}/{usage.limit === Infinity ? "∞" : usage.limit} used
          </Badge>
        </div>

        {!preview ? (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center gap-3 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
              <Upload className="w-6 h-6 text-zinc-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-zinc-300 text-sm font-medium">
                Click to upload a food photo
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Take a clear photo of your meal for best results
              </p>
            </div>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden">
              <Image
                src={preview}
                alt="Food preview"
                width={600}
                height={400}
                className="w-full object-cover max-h-72 rounded-xl"
              />
              <button
                onClick={handleClear}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-lg flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            {!result && (
              <Button
                onClick={handleScan}
                disabled={loading || !usage.allowed}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold h-11"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Uploading & analyzing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Analyze with AI
                  </span>
                )}
              </Button>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Results */}
      {result && (
        <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-semibold">Analysis complete</h2>
            <span
              className={`text-xs px-2 py-0.5 rounded-md border font-medium ${
                confidenceColor[
                  result.confidence as keyof typeof confidenceColor
                ] || confidenceColor.medium
              }`}
            >
              {result.confidence} confidence
            </span>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl">{result.name}</h3>
            <p className="text-zinc-400 text-sm mt-1">{result.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{result.calories}</p>
              <p className="text-xs text-zinc-400 mt-0.5">Calories</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">
                {result.protein}g
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">Protein</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-amber-400">
                {result.carbs}g
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">Carbs</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-rose-400">{result.fat}g</p>
              <p className="text-xs text-zinc-400 mt-0.5">Fat</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-emerald-400 text-sm">
              Saved to your meal log with cloud storage
            </p>
          </div>

          <Button
            onClick={handleClear}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            Scan another food
          </Button>
        </div>
      )}
    </div>
  );
}
