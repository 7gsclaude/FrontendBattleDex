import Navbar from "./components/Navbar";
import Main from "./components/Main";
import styled from "styled-components";

const AppContainer = styled.div`
background-color: #116fc2;  
height: 100%;
width: 100%;
`
 /// super important to keep the width from overextending the page can keep going down forever but not width
function App() {
  return (
    <div className="App">
      <AppContainer>
        <Navbar />
        <Main />
      </AppContainer>
    </div>
  );
}

export default App;
