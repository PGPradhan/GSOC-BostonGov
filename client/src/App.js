import { useState ,useEffect} from "react";
import * as mobilenet from "@tensorflow-models/mobilenet"

function App() {
  const [isModelLoading,setIsModelLoading] = useState(false)
  const [model,setModel]=useState(null)
  
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

  useEffect(() => {
    loadModel()
}, [])

if (isModelLoading) {
  return <h2>Model Loading...</h2>
}
  
  return (
    <div className="App">
      <h1>Image Identifications</h1>
    </div>
  );
}

export default App;
