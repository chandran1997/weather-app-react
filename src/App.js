import { Box } from "@mui/material";
import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      <Header />
      {/* <Box
        sx={{
          flex: 1, // Allows content to take up available space
          overflowY: "auto", // Enables scrolling if content overflows
        }}
      > */}
      <Content />
      {/* </Box> */}
      <Footer />
    </Wrapper>
  );
}

export default App;
