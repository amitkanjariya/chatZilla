"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../ui/inputs/Input";
import Button from "../ui/Button";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    console.log('Upload result:', result);
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
        toast.success("Settings updated");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information</p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input disabled={isLoading} label="Name" id="name" errors={errors} required register={register} />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={image || currentUser?.image || "/images/avatar.jpg"}
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onSuccess={(result) => {
                      console.log('Upload Button Triggered');
                      handleUpload(result);
                    }}
                    uploadPreset="pnhbtfs3"
                    className="inline-block"
                  >
                    {/* Use a div or span wrapper instead of nesting another button */}
                    <div>
                      <Button disabled={isLoading} secondary type="button">
                        Change
                      </Button>
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isLoading} secondary type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit" onClick={onClose}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;