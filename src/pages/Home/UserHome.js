import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Metrics from "../../components/metrics";
import Post from "../../components/post";
import GitHubFeed from "../../components/feeds/GitHubFeed";
import BootSpaceFeed from "../../components/feeds/BootSpaceFeed";
import TwitterFeed from "../../components/feeds/TwitterFeed";

import { Skeleton } from "antd";
import { Card, Row, Col, Tabs } from "antd";

const UserHome = () => {
  const { TabPane } = Tabs;
  const userDoc = useSelector((state) => state.user?.userDoc);
  const { token, received_events_url, firstName } = userDoc;
  const [loaded, setLoaded] = useState(false);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    (async () =>
      await fetch(`${received_events_url}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setFeed(res))
        .then(() => setLoaded(true))
        .catch((error) => console.error(error)))();
  }, [received_events_url, token]);

  return (
    <>
      {loaded ? (
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
                <Card title={`Welcome back, ${firstName}`} className='dashCard'>
                  <Tabs defaultActiveKey='1' centered>
                    <TabPane tab='GitHub Feed' key='1'>
                      <GitHubFeed feed={feed} />
                    </TabPane>
                    <TabPane tab='BootSpace Feed' key='2'>
                      <BootSpaceFeed />
                    </TabPane>
                    <TabPane tab='Twitter Feed' key='3'>
                      <TwitterFeed twitter={userDoc.twitter_username} />
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </>
        </div>
      ) : (
        <Skeleton active />
      )}
    </>
  );
};

export default UserHome;
