import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const note = [];

  const [notes, setNotes] = useState(note);
  //add note
  const addNote = async (title, description,key) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZDNhMDE0OGIwYjc5OTU2MGQyMWNmIn0sImlhdCI6MTY3NDU4NTQ0NX0.bjZVZvja3R_7GoVhvcJrs3CZ1IPMpkE85n-EOF_pqVQ",
        // body:JSON.stringify({title,description})
      },
     body:JSON.stringify({title,description,})
    });
    const note = {
      "title": title,
      "description": description,
      "id":key
    }
   const json = await response.json();
    console.log("Adding a new node"+json);

    setNotes(notes.concat(note));
  };

  //Delete node
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZDNhMDE0OGIwYjc5OTU2MGQyMWNmIn0sImlhdCI6MTY3NDU4NTQ0NX0.bjZVZvja3R_7GoVhvcJrs3CZ1IPMpkE85n-EOF_pqVQ",
        // body:JSON.stringify({title,description,tag})
      },
    });
    const json = await response.json();
    console.log("Deleting node with id" + id);
    const newNodes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNodes);
    console.log("clicked")
  };

  // fetch all notes from the databases;

  const getnotes = async () => {
    // when api call then its works
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZDNhMDE0OGIwYjc5OTU2MGQyMWNmIn0sImlhdCI6MTY3NDU4NTQ0NX0.bjZVZvja3R_7GoVhvcJrs3CZ1IPMpkE85n-EOF_pqVQ",
        // body:JSON.stringify({title,description,tag})
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // edit a node
  const editNote = async (id, title, description, tag) => {
    // when api call then its works
    // api call
    const response = await fetch(
      `${host}/api/notes/updatenote/63cd3a0148b0b799560d21cf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNjZDNhMDE0OGIwYjc5OTU2MGQyMWNmIn0sImlhdCI6MTY3NDU4NTQ0NX0.bjZVZvja3R_7GoVhvcJrs3CZ1IPMpkE85n-EOF_pqVQ",
          body: JSON.stringify({ title, description, tag }),
        },
      }
    );

    const json = response.json();
    console.log(json);

    for (let index = 0; index < note.length; index++) {
      const element = note[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
