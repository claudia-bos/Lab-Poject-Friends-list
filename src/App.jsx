import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

export default function App() {

  const [friends, setFriends] = useState([])
  const [picture, setPicture] = useState("")
  const [name, setName] = useState("")

  // const getSavedFriends = async () => {}

    useEffect(() => {
      axios.get('/api/friends')
      .then(res => {
      setFriends(res.data);
      });
    }, [])
  


  const addFriend = () => {
    // need to copy friends so you don't modify state directly!
    const newFriends = [...friends]
    newFriends.push({ picture: picture, name: name })
    setFriends(newFriends)

    // Reset the form
    setPicture('')
    setName('')
  }

  const friendInfo = friends.map((friend) => {

    return (
      <div key={ `${friend.name}`}>
        <img width="100px" src={ friend.picture }/>
        <span>{friend.name}</span>
      </div>
    )
  })
  


  
  return (
    <div>

      <label htmlFor="picture">Picture:</label>
      <input id="picture" type="text" value={ picture } onChange={(e) => setPicture(e.target.value)} />

      <label htmlFor="name">Name:</label>
      <input id="name" type="text" value={ name } onChange={(e) => setName(e.target.value)} />

      <button type="button" onClick={addFriend}>Add Friend</button>

      {friendInfo}

     </div>
  )
}
