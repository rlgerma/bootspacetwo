import React from "react";
import { Row, Col, Card } from "antd";
import fig from "../images/home-fig.jpeg";
const Home = () => (
  <div className='home'>
    <Row>
      <Card>
        <Row>
          <Col lg={12} sm={22}>
            <div className='section'>
              <h1 className='title'>
                Bootspace brings colleagues{" "}
                <span style={{ color: "#40a9ff" }}>together...</span>
              </h1>
              <h2 className='heading'>
                <em style={{ textAlign: "right" }}>...wherever they are</em>
              </h2>
              <p>
                With all of the recruiter spam on social networking sites like
                LinkedIn, isn't it time for something better? At Bootspace,
                people you <em>care</em> about stay engaged no matter where
                you're posting from - while other's <em>won't</em>.
              </p>
              <h2 className='heading'>
                Forge meaningful{" "}
                <span style={{ color: "#F16A6C" }}>connections</span>
              </h2>
              <p>
                Making friends on Bootspace gives everyone in your bootcamp a
                shared sense of purpose. Networking early pays off!
              </p>
              <h2 className='heading'>
                <span style={{ color: "#6ECCDF" }}>Relationships</span>,
                organized
              </h2>
              <p>
                Instead of adding to your overstuffed email inbox, conversations
                in Bootspace happen in dedicated spaces called{" "}
                <span>friend-zones</span>.
              </p>
              <h2 className='heading'>
                Get looped <span style={{ color: "#42e089" }}>in</span>, not out
              </h2>
              <p>
                Bootspace makes it simple to follow conversations or find
                important information in an easily searchable archive.
              </p>
              <h2 className='heading'>
                Give casual business{" "}
                <span style={{ color: "#7D77B5" }}>networking</span> a chance
              </h2>
              <p>
                Unlike other social networking sites, Bootspace lets you be
                yourself while at the same time showcasing your professional
                chops.
              </p>
            </div>
          </Col>
          <Col lg={12} sm={22} style={{ textAlign: "center" }}>
            <img
              src={fig}
              alt='figure'
              style={{ width: "100%", padding: "3em" }}
            />
          </Col>
        </Row>
      </Card>
    </Row>
  </div>
);

export default Home;
