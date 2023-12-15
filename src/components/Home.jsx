import { useState, Fragment, useEffect } from "react";
import { getFirestore, 
         collection,
         addDoc,
         getDoc, 
         serverTimestamp,
         onSnapshot,
         query,
         orderBy, 
         doc,
         updateDoc,
         deleteDoc } from "firebase/firestore"
import { getAuth, 
         updateProfile } from "firebase/auth";

import { FiX, FiEdit } from "react-icons/fi";
import emoji1 from '../assets/emojis/1.png';
import emoji2 from '../assets/emojis/2.png';
import emoji3 from '../assets/emojis/3.png';
import emoji4 from '../assets/emojis/4.png';
import emoji5 from '../assets/emojis/5.png';
import defaultImage from '../assets/default-image.jpeg';
import notificationSound from '../assets/new-positive-notice-161930.mp3';

const Home = ({ app, handleSignOut, user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhoto, setUpdatedPhoto] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app)
  const moodEmojis = {
    1: emoji1,
    2: emoji2,
    3: emoji3,
    4: emoji4,
    5: emoji5
  };
  const audio = new Audio(notificationSound);

  const sendPost = async () => {
    if (!selectedButton) {
      alert("Selectionne ton humeur");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        createdAt: serverTimestamp(),
        mood: selectedButton,
        text: postText,
        uid: user.uid,
        displayName: user.displayName,
      });
      console.log("Document publier avec ID: ", docRef.id);
      alert ("Message envoyé");
      setPostText('');
    } catch (error) {
      console.error("Erreur ajout document: ", error);
    }
  }
  
  function displayDate(post) {
    if (post) {
      const date = post.toDate()
      const day = date.getDate()
      const year = date.getFullYear()
      const monthNames = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Julliet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
      const month = monthNames[date.getMonth()]
      
      let hours = date.getHours()
      let minutes = date.getMinutes()
      hours = hours < 10 ? "0" + hours : hours
      minutes = minutes < 10 ? "0" + minutes : minutes
      
      return `${day} ${month} ${year} - ${hours}:${minutes}`
    } else {
      return "La date n'est pas disponible";
    }
  }

  useEffect(() => {
    const db = getFirestore(app);
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
      audio.play();
    });
    return () => unsubscribe();
  }, []);

  const updatePost = async (postId, newText) => {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.data().uid === user.uid) {
      await updateDoc(postRef, {
        text: newText,
        updatedAt: serverTimestamp(),
      });
    } else {
      alert("Tu ne peux modifier que tes propres messages.");
    }
  };

  const editPost = (postId, currentText) => {
    const newText = window.prompt("Enter new text for the post", currentText);
    if (newText !== null && newText !== currentText) {
      updatePost(postId, newText);
      setPosts(posts.map((p) => p.id === postId ? { ...p, editing: false, postText: newText } : p));
    }
  };

  const deletePost = async (postId) => {
    const confirmation = window.confirm("Tu es sur de vouloir supprimer ce message?");
    if (confirmation) {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);
      if (postSnap.data().uid === user.uid) {
        await deleteDoc(postRef);
      } else {
        alert("Tu ne peux supprimer que tes propres messages.");
      }
    }
  };

  function Post({ post }) {
    const inputString = post.text.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
    return (
      <div className="post">
        <div className="header">
          <h3>{displayDate(post.createdAt)}</h3>
          <img src={moodEmojis[post.mood]} alt="Mood emoji" />
        </div>
        <h2>{post.displayName}</h2>
        <p>{inputString}</p>
          <div className="crud-btns">
          {post.uid === user.uid && (
            <>
              <button className="edit-btn" onClick={() => editPost(post.id, post.text)}>Modifier</button>
              <button className="delete-btn" onClick={() => deletePost(post.id)}>Supprimer</button>
            </>
          )}
          </div>
      </div>
    );
  }

  const authUpdateProfile = async () => {
    try {
      const newProfile = {
        displayName: updatedName,
        photoURL: updatedPhoto || user.photoURL
      };
      await updateProfile(auth.currentUser, newProfile);
      alert('Profile mis à jour');
      setUser({
        ...user,
        ...newProfile
      });
    } catch (error) {
      console.log('Error updating profile: ', error);
    }
  }

  return (
    <div className="container">
      <div className="app-container">

        <div className={`user-section ${showInputs ? 'grow' : ''}`}>
          <div className="user-section-btn">
            <FiEdit onClick={() => setShowInputs(!showInputs)}/>
            <FiX onClick={handleSignOut}/>
          </div>
          <img src={user.photoURL || defaultImage} />
          <h2>Salut {(user.displayName || "l'ami") + ","} Comment va-tu?</h2>
          {showInputs && (
            <>
              <input type="text" placeholder="Nom de Profile" value={updatedName} onChange={e => setUpdatedName(e.target.value)}/>
              <input type="text" placeholder="Url de Photo de Profile" value={updatedPhoto} onChange={e => setUpdatedPhoto(e.target.value)}/>
              <button className="primary-btn" onClick={authUpdateProfile}>Mettre à jour le profil</button>
            </>
          )}
        </div>

        <div className="post-section">
          <h2 className="post-title">Bienvenue dans mon chat app.</h2>
          <h3 className="post-subtitle">Publier quelque chose...</h3>
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
          <textarea name="textarea" placeholder="Ecrit ton message..." value={postText} onChange={e => setPostText(e.target.value)}></textarea>
          <button className="primary-btn" onClick={sendPost}>Publier</button>
        </div>
        
        <div className="posts-section">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
