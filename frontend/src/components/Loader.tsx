import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
