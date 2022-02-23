import { useEffect, useState, useContext, FC } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

import { UserContext } from "../../redux/context";

import Metrics from "../../components/metrics";
import Post from "../../components/post";
import GitHubFeed from "../../components/feeds/GitHubFeed";

import TwitterFeed from "../../components/feeds/TwitterFeed";

import { Card, Row, Col, Tabs, Spin } from "antd";

const UserHome: FC = () => {
  const { functions, authUser } = useContext(UserContext);
  const { user, posts } = useSelector((state: RootStateOrAny) => state);

  const [loaded, setLoaded] = useState(false);
  const [feed, setFeed] = useState([]);

  const userDoc = user?.userDoc;

  const { TabPane } = Tabs;

  useEffect(() => {
    if (!posts) {
      functions.getPosts([]);
    }

    if (userDoc) {
      (async () =>
        await fetch(`${userDoc?.ghMeta.received_events_url}`, {
          headers: {
            Authorization: `token ${userDoc?.token}`,
          },
        })
          .then((res) => res.json())
          .then((res) => setFeed(res))
          .then(() => setLoaded(true))
          .catch((error) => console.error(error)))();
    } else {
      functions.getUserDocument(authUser.uid);
    }
  }, [authUser.uid, functions, posts, userDoc]);

  return loaded ? (
    <div className='dashboard'>
      <>
        <Metrics />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className='gutter-row' span={6} offset={1} flex={2}>
            <Card>
              <Post user={userDoc} />
            </Card>
          </Col>
          <Col className='gutter-row' span={14} flex={2}>
            <Card title={`Welcome back, ${userDoc.firstName}`} className='dashCard'>
              <Tabs defaultActiveKey='1' centered>
                <TabPane tab='GitHub Feed' key='1'>
                  <GitHubFeed feed={feed} />
                </TabPane>
                <TabPane tab='BootSpace Feed' key='2'></TabPane>
                <TabPane tab='Twitter Feed' key='3'>
                  <TwitterFeed twitter={userDoc.ghMeta.twitter_username} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </>
    </div>
  ) : (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Row style={{ margin: "15% auto" }}>
        <Col>
          <div>
            <Spin size='large' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserHome;
