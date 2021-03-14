import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, storage } from "../service/firebase";
import logo from "../assets/logo.png";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signup = (name, email, password, phone, location, propic) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const uploadTask = storage
          .ref(`propic/${propic[0].name}`)
          .put(propic[0]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
          },
          () => {
            storage
              .ref("propic")
              .child(propic[0].name)
              .getDownloadURL()
              .then((url) => {
                user
                  .updateProfile({
                    displayName: name,
                    photoURL: url,
                  })
                  .then(() => {
                    db.collection("users").doc(user.uid).set({
                      name: name,
                      email: email,
                      phone: phone,
                      imgName: propic[0].name,
                      type: "user",
                      propic: url,
                      location: location,
                      posts: [],
                      requests: [],
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div
          style={{ height: "100vh", background: "#ff9330" }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <img src={logo} style={{ maxHeight: "200px" }} alt="logo" />
          <h1>Driver Lagbe</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
