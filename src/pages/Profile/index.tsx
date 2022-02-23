import { FC, useContext, useEffect, useState } from "react";

import { useSelector, RootStateOrAny } from "react-redux";
import dayjs from "dayjs";

import { UserContext } from "../../redux/context";

import { Card, Row, Col, Divider, Space, Skeleton } from "antd";

const Profile: FC = () => {
  const { functions, authUser } = useContext(UserContext);
  const user = useSelector((state: RootStateOrAny) => state.user);

  const [loaded, setLoaded] = useState(false);
  const [friends, setFriends] = useState([]);

  const userDoc = user?.userDoc;

  useEffect(() => {
    (async () => {
      try {
        if ([userDoc?.ghMeta.followers_url, userDoc?.token].some((u) => u === undefined)) {
          await functions.getUserDocument(authUser.uid).then(() => setLoaded(true));
        } else {
          const getGhFollowers = await fetch(`${userDoc.ghMeta.followers_url}`, {
            headers: {
              Authorization: `token ${userDoc.token}`,
            },
            method: "GET",
          });
          const profile = await getGhFollowers.json();

          setFriends(profile);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, [authUser.uid, functions, userDoc]);

  return (
    <div className='main'>
      {userDoc ? (
        <div className='profilePage'>
          <Row>
            <Col className='profileLeft'>
              <Card title={userDoc.name} className='profileCard'>
                <img src={userDoc.ghMeta.avatar_url} alt='Profile' />
              </Card>
              <Card title={userDoc.ghMeta.company} className='underCard'>
                <p>{userDoc.ghMeta.location}</p>
                <p>
                  Last Login:{" "}
                  <span className='lastLog'>
                    {dayjs(`${userDoc.ghMeta.updated_at}`).format("MMM DD, YYYY")}
                  </span>
                </p>

                <div className='underCardLinks'>
                  <Divider plain>Contact {userDoc.ghMeta.name}</Divider>
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
                  Website: {userDoc.ghMeta.blog}
                  <br />
                  <a href={`https://github.com/${userDoc.ghMeta.login}?tab=repositories`}>
                    Repos
                  </a>{" "}
                  | <a href={`https://gist.github.com/${userDoc.ghMeta.login}`}>Gists</a>
                </p>
                <div className='userUrl'>
                  <h4>
                    GitHub URL:{" "}
                    <a
                      href={`https://github.com/${userDoc.ghMeta.login}`}
                    >{`https://github.com/${userDoc.ghMeta.login}`}</a>
                  </h4>
                </div>
              </Card>{" "}
              <Card>
                <Divider orientation='center' plain>
                  {userDoc.name}&apos;s followers
                </Divider>
                <div className='friendList'>
                  {loaded ? (
                    <>
                      {friends.map((item: { login: string; avatar_url: string }, index) => (
                        <Space direction='vertical' key={index}>
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
