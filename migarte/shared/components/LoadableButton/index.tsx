import React, { useState } from "react";
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

interface Props extends ButtonProps {
  onSubmit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<any>;
}

const LoadableButton: React.SFC<Props> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setLoading(true);
    props.onSubmit(e).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Button 
      loading={loading}
      onClick={(event) => handleClick(event) }
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default LoadableButton