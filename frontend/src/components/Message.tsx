import React, { ReactNode } from "react";
import { Alert } from "react-bootstrap";
import { Variant } from "react-bootstrap/esm/types";

type Props = {
  variant?: Variant;
  children: ReactNode;
};

const Message: React.FC<Props> = ({ variant, children }) => {
  // Utilisez la déstructuration pour extraire variant et children des props
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
