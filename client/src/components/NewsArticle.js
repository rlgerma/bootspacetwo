import React from 'react';
import { Col, Row } from 'reactstrap';

const aStyle = {
  width: '100%',
};

const divStyle = {
  background: 'aliceblue',
  marginTop: '1em',
  marginBottom: '1em',
  borderColor: 'steelblue',
  borderWidth: '4em',
  borderRadius: '2em',
  textAlign: 'center,',
  padding: '2em',
};
const imgStyle = {
  width: '20em',
  height: '20em',
  objectFit: 'cover',
  padding: '2em',
  borderWidth: '5em',
  borderRadius: '5em',
};

const titleStyle = {
  marginTop: '4em',
  padding: '2em',
  textDecoration: 'oblique',
  float: 'right',
  objectFit: 'cover',
  width: '50%',
  backgroundColor: '#fff',
  opacity: '.9',
  borderWidth: '2em',
  borderRadius: '2em',
};

const titleLength = 100;

export default function NewsArticle({ newsArticle }) {
  return (
    <>
      <div style={divStyle}>
        <Row>
          <Col>
            <img
              style={imgStyle}
              alt={titleLength}
              src={newsArticle.urlToImage}
            />

            <div style={titleStyle}>
              <a href={newsArticle.url} style={aStyle}>
                <h1>{newsArticle.title.substring(0, titleLength)}</h1>
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <hr />
    </>
  );
}
