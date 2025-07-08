import { useParams } from "react-router"
function Wiki() {
    const apiKey = import.meta.env.VITE_API_URL;

    const { userId,userName } = useParams();
    console.log(userId,userName)
    return (
      <>
       <h1>hi your id {userId} and name {userName}</h1>

       <h1>API Key: {apiKey}</h1>

      </>
    )
  }
  
  export default Wiki
  