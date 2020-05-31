import React, { useContext } from "react";
import { Card, Row, Col, Divider, Space } from "antd";
import { Link } from "@reach/router";
import { UserContext } from "../providers/UserProvider";

const Profile = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email, userData } = user;
  const friendData = JSON.parse(localStorage.getItem("friends"));

  return (
    <div className="main">
      <div className="profilePage">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6} offset={1} flex={2}>
            <Card title={displayName} className="profileCard">
              <img src={photoURL} alt="Profile" />
            </Card>
            <Card title={userData.company} className="underCard">
              <p>{userData.location}</p>
              <p>
                Last Login:{" "}
                <span className="lastLog">{userData.lastUpdate}</span>
              </p>

              <div className="underCardLinks">
                <Divider plain>Contact {displayName}</Divider>

                <a href={`mailTo:${email}`}>Send email</a>

                <a href="/#">Add to Friends</a>

                <a href="/#">Instant Message</a>

                <a href="/#">Add to Group</a>

                <a href="/#">Block User</a>
              </div>
            </Card>{" "}
          </Col>
          <Col className="gutter-row" span={15} flex={3}>
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
            <Card style={{ margin: "1em 0" }}>
              <Divider orientation="center" plain>
                {displayName}'s followers
              </Divider>
              <div className="friendList">
                {friendData.map((item) => (
                  <Space direction="vertical" align="center" key={item.login}>
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
