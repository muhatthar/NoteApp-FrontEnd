"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NoteEdit({ params }) {
  const { id } = useParams();
  const router = useRouter();

  const [notesField, setNotesField] = useState({
    title: "",
    body: "",
  });
  const [remainingCharacters, setRemainingCharacters] = useState();
  let charRemaining = 0;

  useEffect(() => {
    fetchData();
  }, [params.id]);

  useEffect(() => {
    setRemainingCharacters(charRemaining);
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/notes/" + [params.id]
      );

      charRemaining = 50 - res.data.data.title.length

      setNotesField({
        title: res.data.data.title,
        body: res.data.data.body,
      });

      setRemainingCharacters(charRemaining > 0 ? charRemaining : 0)
    } catch (err) {
      console.log("Something wrong");
    }
  };

  const changeNoteFieldHandler = (e) => {
    const { name, value } = e.target;
    const charRemaining = 50 - value.length;
    setRemainingCharacters(charRemaining > 0 ? charRemaining : 0);

    setNotesField({
      ...notesField,
      [name]: value,
    });
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://127.0.0.1:8000/api/notes/" + [params.id],
        notesField
      );
      router.push("/note-app");
    } catch (err) {
      console.log("Something wrong");
    }
  };

  return (
    <main className="py-[46px] px-[100px] items-center">
      <div className="flex justify-center gap-[47px] items-center">
        <div
          className="flex rounded-2xl py-[25px] px-9 gap-9 h-fit"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.09)" }}
        >
          <div className="flex-1 m-auto">
            <h2 className="text-white font-medium text-base text-center">
              Welcome to Note Notion
            </h2>
            <p className="mt-[5px] mb-[17px] text-xs text-white max-w-[176px] text-center font-light">
              It is a long established fact that a reader will be distracted
            </p>
          </div>
          <img src="/images/banner-img.svg" />
        </div>

        <div
          className="rounded-2xl py-[30px] px-[60px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.09)" }}
        >
          <h2 className="font-medium text-xl text-center text-white">
            Edit Your Note
          </h2>
          <form>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title..."
              maxLength="50"
              className="w-[471px] m-auto rounded-[20px] bg-white py-2 px-[18px] border border-transparent text-[#F4A402] mt-[15px] focus:outline-none placeholder:text-[#F4A402]"
              value={notesField.title}
              onChange={(e) => changeNoteFieldHandler(e)}
            />{" "}
            <br />
            <p className="text-white font-light text-sm mt-1">
              Characters remaining: {remainingCharacters} / 50
            </p>
            <textarea
              id="body"
              cols="30"
              rows="10"
              name="body"
              placeholder="Body..."
              className="w-[471px] max-h-[136px] m-auto rounded-[20px] bg-white py-2 px-[18px] border border-transparent text-[#F4A402] mt-[15px] focus:outline-none placeholder:text-[#F4A402]"
              value={notesField.body}
              onChange={(e) => changeNoteFieldHandler(e)}
            ></textarea>{" "}
            <br />
            <button
              type="submit"
              onClick={(e) => onSubmitChange(e)}
              className="w-[471px] m-auto rounded-[20px] bg-[#F4A402] font-medium text-md tracking-wide py-2 px-[18px] border border-transparent text-white mt-[15px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:border-[#F4A402]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
