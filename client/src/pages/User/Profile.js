import React, { useContext } from "react";
import { Card, Row, Col, Divider, Space } from "antd";
import { Link } from "@reach/router";
import { UserContext } from "../../providers/UserProvider";
import moment from "moment";
const Profile = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userData } = user;
  const friendData = JSON.parse(sessionStorage.getItem("friends"));

  return (
    <div className="main">
      <div className="profilePage">
        <Row>
          <Col className="profileLeft">
            <Card title={displayName} className="profileCard">
              <img src={photoURL} alt="Profile" />
            </Card>
            <Card title={userData.company} className="underCard">
              <p>{userData.location}</p>
              <p>
                Last Login:{" "}
                <span className="lastLog">{moment().format("LLL")}</span>
              </p>

              <div className="underCardLinks">
                <Divider plain>Contact {displayName}</Divider>
                <Row>
                  <Col className="gutter-row" span={12} offset={1} flex={2}>
                    <a href={`mailTo:${email}`}>Send message</a>
                  </Col>
                  <Col className="gutter-row" span={12} offset={1} flex={3}>
                    <a href="/#">Add to Friends</a>
                  </Col>
                </Row>
                <Row>
                  <Col className="gutter-row" span={12} offset={1} flex={2}>
                    <a href="/#">Add to Group</a>
                  </Col>
                  <Col className="gutter-row" span={12} offset={1} flex={3}>
                    <a href="/#">Block User</a>
                  </Col>
                </Row>
              </div>
            </Card>{" "}
          </Col>
          <Col className="profileRight">
            <Card title="About Me" className="infoCard">
              <p>
                Website: {userData.blog}
                <br />
                <a
                  href={`https://github.com/${userData.login}?tab=repositories`}
                >
                  Repos
                </a>{" "}
                |{" "}
                <a href={`https://gist.github.com/${userData.login}`}>Gists</a>
              </p>
              <div className="userUrl">
                <h4>
                  GitHub URL:{" "}
                  <Link to={userData.profileUrl}>{userData.profileUrl}</Link>
                </h4>
              </div>
            </Card>{" "}
            <Card>
              <Divider orientation="center" plain>
                {displayName}'s followers
              </Divider>
              <div className="friendList">
                {friendData.map((item) => (
                  <Space direction="vertical" key={item.login}>
                    <Card title={item.login} className="friendCard">
                      <img src={item.avatar_url} alt="Profile" />
                    </Card>
                  </Space>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
