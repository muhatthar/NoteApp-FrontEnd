"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NoteApp = () => {
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [notesField, setNotesField] = useState({
    title: "",
    body: "",
    created_at: "",
  });
  const [remainingCharacters, setRemainingCharacters] = useState(50);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios("http://127.0.0.1:8000/api/notes");
      setNoteData(res.data.data);
      console.log(res);
    } catch (err) {
      console.log("Something wrong");
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    await axios.delete("http://127.0.0.1:8000/api/notes/" + id);
    const newNotesData = noteData.filter((item) => {
      return item.id !== id;
    });

    setNoteData(newNotesData);
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
      const res = await axios.post(
        "http://127.0.0.1:8000/api/notes/",
        notesField
      );
      console.log(res);
      setLoading(true);
    } catch (err) {
      console.log("Something wrong");
    }
  };

  const onSearchInputChangeHandler = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);

    const filteredNotes = noteData.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(searchTerm && searchTerm.toLowerCase());
    });

    setNoteData(filteredNotes);
  };

  if (loading) {
    return <NoteApp />;
  }

  return (
    <>
      <header className="flex w-full sticky top-0 mx-auto justify-around items-center py-[20px] z-999 bg-[#220b57]">
        <form className="h-[50px] flex-1 ml-[100px]">
          <input
            type="text"
            id="searchNote"
            placeholder="Search Note..."
            className="w-[471px] h-full rounded-[10px] border border-white bg-transparent text-white text-sm font-normal px-[14px] focus:outline-none"
            onChange={(e) => onSearchInputChangeHandler(e)}
            value={searchTerm}
          />
          <div></div>
        </form>

        <div className="flex mr-[100px]">
          <div className="text-white mr-[10px]">
            <h2 className="text-[21px] font-semibold text-end my-0">
              Muhammad Attharsyah Firdaus Sultan
            </h2>
            <h3 className="text-sm font-normal text-end mt-[3px] mb-0">
              Let's explore your note
            </h3>
          </div>
          <img
            src="/images/profile-img.svg"
            className="w-[50px] h-[50px] items-center"
          />
        </div>
      </header>

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
              Create New Note
            </h2>
            <form>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Title..."
                maxLength="50"
                className="w-[471px] m-auto rounded-[20px] bg-white py-2 px-[18px] border border-transparent text-[#F4A402] mt-[15px] focus:outline-none placeholder:text-[#F4A402]"
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
                onChange={(e) => changeNoteFieldHandler(e)}
              ></textarea>{" "}
              <br />
              <button
                type="submit"
                onClick={(e) => onSubmitChange(e)}
                className="w-[471px] m-auto rounded-[20px] bg-[#F4A402] font-medium text-md tracking-wide py-2 px-[18px] border border-transparent text-white mt-[15px] cursor-pointer transition-all duration-200 ease-in-out hover:bg-transparent hover:border-[#F4A402]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div>
          <h2 className="w-full text-white text-3xl text-center mt-10 font-medium">
            Your Note
          </h2>
          <div className="flex flex-wrap justify-center">
            {noteData.length === 0 ? (
              <p className="text-2xl text-gray-600 font-medium">
                Note is empty
              </p>
            ) : (
              noteData.map((note, i) => {
                return (
                  <Link href={`/note-detail/${note.id}`}>
                    <div
                      key={i}
                      className="flex-[0_0_20%] mr-5 my-5 bg-white rounded-[10px] py-[7px] px-[10px] max-w-[218px] transition duration-200 ease-in-out hover:-translate-y-2 hover:translate-x-1"
                    >
                      <div>
                        <div className="flex items-center">
                          <img
                            src="/images/note-img.svg"
                            className="w-[35px] h-[35px]"
                          />
                          <h3 className="text-[15px] font-semibold ml-[10px] max-w-[147px]">
                            {note["title"]}
                          </h3>
                        </div>
                        <p className="text-[#515151] font-light text-[10px] my-[5px]">
                          {note["createdAt"]}
                        </p>
                      </div>

                      <div className="flex gap-[5px]">
                        <Link href={`/note-edit/${note.id}`}>
                          <button className="items-center justify-center rounded-[5px] border p-1 border-[#C4C4C4] transition-all duration-200 ease-in-out bg-transparent cursor-pointer shadow-2xl hover:border-transparent hover:bg-[#C4C4C4]">
                            <img
                              src="/images/edit-img.svg"
                              className="w-full"
                            />
                          </button>
                        </Link>
                        <button
                          className="items-center justify-center rounded-[5px] border p-1 border-[#C4C4C4] transition-all duration-200 ease-in-out bg-transparent cursor-pointer shadow-2xl hover:border-transparent hover:bg-[#C4C4C4]"
                          onClick={() => handleDelete(note.id)}
                        >
                          <img
                            src="/images/delete-img.svg"
                            className="w-full"
                          />
                        </button>
                      </div>

                      <div className="overflow-y-auto max-h-[246px] mt-2">
                        <p className="font-light text-sm">{note["body"]}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default NoteApp;
