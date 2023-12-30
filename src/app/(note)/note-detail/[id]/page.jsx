"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NoteDetail({ params }) {
  const { id } = useParams();
  const router = useRouter();

  const [notesField, setNotesField] = useState({
    title: "",
    body: "",
    createdAt: "",
  });

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/notes/" + [params.id]
      );

      setNotesField(res.data.data);
    } catch (err) {
      console.log("Something wrong");
    }
  };

  const formattedDate =
    notesField.createdAt && typeof notesField.createdAt === "string"
      ? new Date(notesField.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Invalid Date";

  return (
    <main className="py-[46px] px-[100px] items-center">
      <h1 className="h-full text-center text-5xl font-bold text-[#F4A402]">
        {notesField.title}
      </h1>
      <h4 className="h-full text-center text-md mt-1 text-gray-500 font-medium">
        Created At: {formattedDate}
      </h4>
      <p className="h-full text-justify text-xl mt-10 text-white font-medium">
        {notesField.body}
      </p>
    </main>
  );
}
