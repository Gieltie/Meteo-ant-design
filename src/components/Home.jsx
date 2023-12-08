import { useState } from "react";
import { getFirestore, 
         collection, 
         addDoc, 
         serverTimestamp,
         getDocs } from "firebase/firestore"
import { IoClose } from "react-icons/io5";
import emoji1 from '../assets/emojis/1.png';
import emoji2 from '../assets/emojis/2.png';
import emoji3 from '../assets/emojis/3.png';
import emoji4 from '../assets/emojis/4.png';
import emoji5 from '../assets/emojis/5.png';
import defaultImage from '../assets/default-profile-picture.jpeg';

const Home = ({ app, handleSignOut, user/* authUpdateProfile, updatedName, setUpdatedName, updatedPhoto, setUpdatedPhoto */ }) => {
  const [postText, setPostText] = useState('');
  const db = getFirestore(app)
  const [selectedButton, setSelectedButton] = useState(null);
  const [posts, setPosts] = useState([]);
  const moodEmojis = {
    1: emoji1,
    2: emoji2,
    3: emoji3,
    4: emoji4,
    5: emoji5
  };

  const sendPost = async () => {
    if (!selectedButton) {
      alert("Selectionne ton humeur");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        text: postText,
        uid: user.uid,
        createdAt: serverTimestamp(),
        mood: selectedButton
      });
      console.log("Document publier avec ID: ", docRef.id);
      setPostText('');
    } catch (error) {
      console.error("Erreur ajout document: ", error);
    }
  }

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postsArray = [];
    querySnapshot.forEach((doc) => {
      postsArray.push({ id: doc.id, ...doc.data() });
    });
    setPosts(postsArray);
  }

  function Post({ post }) {
    return (
      <div className="post">
        <div className="header">
          <h3>{displayDate(post.createdAt)}</h3>
          <img src={moodEmojis[post.mood]} alt="Mood emoji" />
        </div>
        <p>{post.text}</p>
      </div>
    );
  }

  function displayDate(firebaseDate) {
    const date = firebaseDate.toDate()
    
    const day = date.getDate()
    const year = date.getFullYear()
    
    const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Julliet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
    const month = monthNames[date.getMonth()]

    let hours = date.getHours()
    let minutes = date.getMinutes()
    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes

    return `${day} ${month} ${year} - ${hours}:${minutes}`
}


  return (
    <div className="container">
      <nav>
        <IoClose onClick={handleSignOut}/>
      </nav>
      <div className="app-container">
        <div className="user-section">
          <img src={user.photoURL || defaultImage} />
          <h2>Salut {user.displayName || "l'ami,"} <br />Comment va-tu?</h2>
        
          <div className="mood-emojis">
            <button 
              className={`mood-emoji-btn ${selectedButton === 1 ? 'selected-emoji' : 'unselected-emoji'}`} 
              onClick={() => setSelectedButton(1)}
            >
              <img src={emoji1} />
            </button>
            <button 
              className={`mood-emoji-btn ${selectedButton === 2 ? 'selected-emoji' : 'unselected-emoji'}`} 
              onClick={() => setSelectedButton(2)}
            >
              <img src={emoji2} />
            </button>
            <button 
              className={`mood-emoji-btn ${selectedButton === 3 ? 'selected-emoji' : 'unselected-emoji'}`} 
              onClick={() => setSelectedButton(3)}
            >
              <img src={emoji3} />
            </button>
            <button 
              className={`mood-emoji-btn ${selectedButton === 4 ? 'selected-emoji' : 'unselected-emoji'}`} 
              onClick={() => setSelectedButton(4)}
            >
              <img src={emoji4} />
            </button>
            <button 
              className={`mood-emoji-btn ${selectedButton === 5 ? 'selected-emoji' : 'unselected-emoji'}`} 
              onClick={() => setSelectedButton(5)}
            >
              <img src={emoji5} />
            </button>
        </div>

          <div className="post-section">
            <textarea name="textarea" placeholder="Ecrit ton post..." value={postText} onChange={e => setPostText(e.target.value)}></textarea>
            <button className="primary-btn" onClick={sendPost}>Publier</button>
            <button className="secondary-btn" onClick={fetchPost}>Les dernier posts</button>
          </div>
          {/* <input type="text" placeholder="Nom de Profile" value={updatedName} onChange={e => setUpdatedName(e.target.value)}/>
          <input type="text" placeholder="Url de Photo de Profile" value={updatedPhoto} onChange={e => setUpdatedPhoto(e.target.value)}/>
          <button className="primary-btn" onClick={authUpdateProfile}>Mettre à jour le profil</button> */}
          <div className="posts-section">
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
