import { useRouter, useSegments } from "expo-router";
import React from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import profile from "../backend/profile";

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !inAuthGroup) {
        router.replace("/SignIn");
      } else if (user && inAuthGroup) {
        router.replace("/HomeTab");
      }
    });

    return () => unsubscribe();
  }, [segments]);
}

export function Provider(props) {
  const [user, setAuth] = React.useState(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          // try {
          //   signInWithEmailAndPassword(auth, email, password);
          //   setAuth(result.user);
          // } catch (error) {
          //   // Alert.alert("Error", "Invalid email or password");
          //   console.error(error);
          // }
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // console.log(userCredential);
              setAuth(userCredential.user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // console.warn(
              //   "Error code: " + errorCode + " Error message: " + errorMessage
              // );
            });
        },
        signout: async () => {
          // try {
          //   await firebase.auth().signOut();
          //   setAuth(null);
          // } catch (error) {
          //   console.error(error);
          // }
          signOut(auth)
            .then(() => {
              setAuth(null);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // console.warn(
              //   "Error code: " + errorCode + " Error message: " + errorMessage
              // );
            });
        },
        signUp: async (fullname, email, password) => {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // console.log(userCredential);
              setAuth(userCredential.user);

              const name = fullname.split(" ")[0];
              const surname = fullname.split(" ")[1] || "";
              const username = "_" + fullname.split(" ")[0].toLowerCase();

              let formData = new FormData();
              formData.append("userid", userCredential.user.uid);
              formData.append("firstname", name);
              formData.append("surname", surname);
              formData.append("username", username);
              formData.append("about", "Am a pinfinity user");

              profile
                .post("/add-user", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  console.log("User created");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // console.warn(
              //   "Error code: " + errorCode + " Error message: " + errorMessage
              // );
            });
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
