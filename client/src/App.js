import { useState ,useEffect,useRef} from "react";
import * as mobilenet from "@tensorflow-models/mobilenet"

function App() {
  const [isModelLoading,setIsModelLoading] = useState(false)
  const [model,setModel]=useState(null)
  const [imageURL,setImageURL]=useState(null)

  const imageRef = useRef()

  const loadModel = async () => {
    setIsModelLoading(true)
        try {
            const model = await mobilenet.load()
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
  }

  const uploadImage = (e) => {
    const { files } = e.target
    if (files.length > 0) {
        const url = URL.createObjectURL(files[0])
        setImageURL(url)
    } else {
        setImageURL(null)
    }
  }

  useEffect(() => {
    loadModel()
}, [])

if (isModelLoading) {
  return <h2>Model Loading...</h2>
}
  
  return (
    <div className="App">
      <h1>Image Identifications</h1>
      <div className="inputHolder">
        <input type="file" accept="image/*" capture='camera' className="uploadInput"  onChange={uploadImage} />

      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef}/>}
          </div>

        </div>
        {imageURL && <button className="button">Identify Image</button>}
      </div>
    </div>
  );
}

export default App;
