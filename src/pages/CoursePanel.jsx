import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const CoursePanel = () => {
    const { authUser } = useAuth();
    console.log(authUser);
  
    const location = useLocation();
    const courseId = location.state?.courseId;
  
    console.log(courseId);
  
    const [files, setFiles] = useState([]);
  
    useEffect(() => {
      const fetchVideos = async () => {
        try {
          if (courseId) {
            // obtenemos una referencia a la carpeta
            const folderRef = ref(storage, courseId);
            // listamos todos los archivos en la carpeta
            const filesList = await listAll(folderRef);
  
            // Obtener detalles de cada archivo (nombre y URL)
            const filesData = await Promise.all(
              filesList.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return { name: item.name, url };
              })
            );
  
            // Actualizar el estado con los detalles de los archivos
            setFiles(filesData);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchVideos();
    }, [courseId]);
  
    return (
      <div>
        <h2>CoursePanel</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre del Archivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>
                  <button
                    onClick={() => {
                      // Abrir la URL del archivo en otra pestaña
                      window.open(file.url, "_blank");
                    }}
                  >
                    Abrir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default CoursePanel;
