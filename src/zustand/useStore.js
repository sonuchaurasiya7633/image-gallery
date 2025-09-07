import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(persist(
  (set)=>({
    images: [],
    setImage:(payload)=>set((state)=>({
      images: [...state.images,payload]
    })),
    deleteImage:(id)=>set((state)=>({
      images: state.images.filter((images)=>images.id !== id)
    }))
  }),
  { name: "image-storage"}
))