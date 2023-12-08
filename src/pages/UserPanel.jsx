import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { firestoreDB } from "../firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import UserProfile from "../components/UserProfile";
import AdminProfile from "../components/AdminProfile";

const UserPanel = () => {
  // obteniendo al usuario
  const { authUser } = useAuth();
  // estado para la data
  const [usersData, setUsersData] = useState(null);
  const [personalData, setPersonalData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authUser) {
          const userSnapshot = await getDoc(
            doc(firestoreDB, "usuarios", authUser.uid)
          );
          const userRole = userSnapshot.data().rol;
          if (userRole === "superAdmin") {
            console.log("es superAdmin");

            const allUsersSnapshot = await getDocs(
              collection(firestoreDB, "usuarios")
            );

            const allUsersData = allUsersSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setUsersData(allUsersData);
          } else {
            console.log("no es superAdmin");
            setPersonalData([userSnapshot.data()]);
          }
        } else {
          console.log("user no authenticado");
        }
      } catch (error) {
        console.log("error al obtener datos:", error);
      }
    };

    fetchData();
  }, [authUser]);

  return (
    <>
      {usersData && <AdminProfile data={usersData} />}
      {personalData && <UserProfile data={personalData[0]} />}
    </>
  );
};

export default UserPanel;
