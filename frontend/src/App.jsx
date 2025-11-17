import { BrowserRouter } from "react-router-dom"
import HomePage from "./client/Pages/HomePage"

const App = () => {
  return (
    <BrowserRouter>
      <HomePage/>
    </BrowserRouter>
  )
}

export default App