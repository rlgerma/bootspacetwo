import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { UserContext } from "../../context";

import { Card, Row, Col, Divider, Space, Skeleton } from "antd";

const Profile = () => {
  const { functions, authUser } = useContext(UserContext);
  const user = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false);
  const [friends, setFriends] = useState([]);

  const userDoc = user?.userDoc;

  useEffect(() => {
    if ([userDoc?.followers_url, userDoc?.token].some((u) => u === undefined)) {
      functions.getUserDocument(authUser.uid).then(() => setLoaded(true));
    } else {
      (async () =>
        await fetch(`${userDoc.followers_url}`, {
          headers: {
            Authorization: `token ${userDoc.token}`,
          },
        })
          .then((res) => res.json())
          .then((json) => setFriends(json))
          .then(() => setLoaded(true))
          .catch((error) => console.error(error)))();
    }
  }, [authUser.uid, functions, userDoc]);

  return (
    <div className='main'>
      {userDoc ? (
        <div className='profilePage'>
          <Row>
            <Col className='profileLeft'>
              <Card title={userDoc.name} className='profileCard'>
                <img src={userDoc.avatar_url} alt='Profile' />
              </Card>
              <Card title={userDoc.company} className='underCard'>
                <p>{userDoc.location}</p>
                <p>
                  Last Login:{" "}
                  <span className='lastLog'>
                    {dayjs(`${userDoc.updated_at}`).format("MMM DD, YYYY")}
                  </span>
                </p>

                <div className='underCardLinks'>
                  <Divider plain>Contact {userDoc.name}</Divider>
                  <Row>
                    <Col className='gutter-row' span={12} offset={1} flex={2}>
                      <a href={userDoc.email}>Send message</a>
                    </Col>
                    <Col className='gutter-row' span={12} offset={1} flex={3}>
                      <a href='/#'>Add to Friends</a>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='gutter-row' span={12} offset={1} flex={2}>
                      <a href='/#'>Add to Group</a>
                    </Col>
                    <Col className='gutter-row' span={12} offset={1} flex={3}>
                      <a href='/#'>Block User</a>
                    </Col>
                  </Row>
                </div>
              </Card>{" "}
            </Col>
            <Col className='profileRight'>
              <Card title='About Me' className='infoCard'>
                <p>
                  Website: {userDoc.blog}
                  <br />
                  <a
                    href={`https://github.com/${userDoc.login}?tab=repositories`}
                  >
                    Repos
                  </a>{" "}
                  |{" "}
                  <a href={`https://gist.github.com/${userDoc.login}`}>Gists</a>
                </p>
                <div className='userUrl'>
                  <h4>
                    GitHub URL:{" "}
                    <a
                      href={`https://github.com/${userDoc.login}`}
                    >{`https://github.com/${userDoc.login}`}</a>
                  </h4>
                </div>
              </Card>{" "}
              <Card>
                <Divider orientation='center' plain>
                  {userDoc.name}'s followers
                </Divider>
                <div className='friendList'>
                  {loaded ? (
                    <>
                      {friends.map((item) => (
                        <Space direction='vertical' key={item.login}>
                          <Card title={item.login} className='friendCard'>
                            <img src={item.avatar_url} alt='Profile' />
                          </Card>
                        </Space>
                      ))}
                    </>
                  ) : (
                    <Skeleton active />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default Profile;
