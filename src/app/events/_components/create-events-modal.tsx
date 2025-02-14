"use client";

import ImageUploader from "@/components/global/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadImage } from "@/hooks/api/use-upload-image";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export const CreateEventsModal = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate, status } = useUploadImage();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
      },
    });

    // TODO: RETRIEVE THE IMAGE IPFS URL
    // return `https://ipfs.infura.io/ipfs/${result.cid}`;
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);
    if (files.length === 0) {
      alert("Please upload an image");
      return;
    }

    const image = files[0];

    const imageIpfsUrl = await uploadImage(image);

    console.log(imageIpfsUrl);

    setLoading(false);

    // TODO: CALL THE CREATE EVENTS FUNCTION
    // TODO: CLOSE THE MODAL
    // TODO: REFRESH THE EVENTS LIST
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
          <DialogDescription>
            Create a new event here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label>Event Name</Label>
            <Input
              placeholder="Event Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <ImageUploader
            multiple={false}
            maxSize={5}
            allowedTypes={["image/jpeg", "image/png"]}
            files={files}
            onFilesChange={setFiles}
          />
        </div>
        <DialogFooter>
          <Button
            size="sm"
            disabled={!name || files.length === 0 || loading || status === "pending"}
            onClick={handleSave}
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
