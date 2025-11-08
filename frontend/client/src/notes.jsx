import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'

const Notes = () => {
 const Navigate=useNavigate()   
const [text,settext]=useState("")
const [notes,setnotes]=useState([])

const [editid,seteditid]=useState(null)
const [edittext,setedittext]=useState("")




const loadnotes = async () => {
    const res = await api.get("/notes");
    setnotes(res.data);
  };

const addnote=async(e)=>{
   e.preventDefault()

await api.post("/notes", {text})
settext("")
loadnotes()

}


const deletenote=async(id)=>{
    await api.delete(`/notes/${id}`)
    loadnotes()
}
const editnote=async(id)=>{
     await api.put(`/notes/${id}`,{text:edittext})
     seteditid(null)
     setedittext("")
    loadnotes()
}
const handlelogout=async(e)=>{
     await api.post("/auth/logout")
    Navigate("/login")


}
useEffect(()=>{
loadnotes();
},[])




  return (
    <>
    <div className="p-6 max-w-xl mx-auto">

  <h1 className="text-2xl font-bold mb-4">Your Notes</h1>

  <form onSubmit={addnote} className="flex gap-2 mb-4">
    <input
      className="flex-1 border rounded p-2"
      placeholder="Enter your note"
      value={text}
      onChange={(e) => settext(e.target.value)}
    />
    <button className="bg-green-500 text-white px-4 rounded hover:bg-green-600">
      Add
    </button>
  </form>

  <ul className="space-y-3">
    {notes.map((n) => (
      <li
        key={n._id}
        className="bg-white p-3 shadow rounded flex justify-between items-center"
      >
        {editid === n._id ? (
          <div className="flex gap-2 w-full">
            <input
              className="flex-1 border rounded p-2"
              value={edittext}
              onChange={(e) => setedittext(e.target.value)}
            />

            <button
              onClick={() => editnote(n._id)}
              className="bg-blue-500 text-white px-3 rounded"
            >
              Save
            </button>

            <button
              onClick={() => seteditid(null)}
              className="bg-gray-400 text-white px-3 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span>{n.text}</span>

            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 rounded"
                onClick={() => {
                  seteditid(n._id);
                  setedittext(n.text);
                }}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-3 rounded"
                onClick={() => deletenote(n._id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>

  <button
    onClick={handlelogout}
    className="mt-6 bg-black text-white px-4 py-2 rounded"
  >
    Logout
  </button>
</div>

    </>
  )
}

export default Notes