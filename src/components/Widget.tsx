import { Col } from 'native-base';
import React from 'react';

function Widget(props: { children?: JSX.Element }) {
  return (
    <Col
      style={{
        borderWidth: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
        overflow: 'hidden',
      }}>
      {props.children}
    </Col>
  );
}

export default Widget;
