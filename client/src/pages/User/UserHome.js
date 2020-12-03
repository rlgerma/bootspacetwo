import React, { useEffect, useState } from "react";

import { token } from "../../firebase";
import Metrics from "../../components/user/dashboard/metrics";
import PostFeed from "../../components/user/dashboard/feeds/Post";
import GitHubFeed from "../../components/user/dashboard/feeds/GitHubFeed";
import BootSpaceFeed from "../../components/user/dashboard/feeds/BootSpaceFeed";
import TwitterFeed from "../../components/user/dashboard/feeds/TwitterFeed";
import { Skeleton } from "antd";
import { Card, Row, Col, Tabs } from "antd";

const UserHome = (props) => {
  const { TabPane } = Tabs;
  const u = props.user;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let user = await u;
      let { displayName } = user;
      const res = await fetch("https://api.github.com/user/followers", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (!res.ok) {
        return;
      }
      const friends = await res.json();
      sessionStorage.setItem("friends", JSON.stringify(friends));
      setUser(user);
      setDisplayName(displayName);
      return () => setLoading(false);
    };

    getData();
    return () => {
      console.log("Ran getData");
    };
  }, [u, user]);

  return (
    <>
      {loading ? (
        <div className='dashboard'>
          {user === undefined ? (
            <>
              <Skeleton active />
            </>
          ) : (
            <>
              <Metrics />
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className='gutter-row' span={6} offset={1} flex={2}>
                  <Card>
                    <PostFeed />
                  </Card>
                </Col>
                <Col className='gutter-row' span={14} flex={2}>
                  <Card
                    title={`Welcome back, ${displayName
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}`}
                    className='dashCard'
                  >
                    <Tabs defaultActiveKey='1' centered>
                      <TabPane tab='GitHub Feed' key='1'>
                        <GitHubFeed user={user} />
                      </TabPane>
                      <TabPane tab='BootSpace Feed' key='2'>
                        <BootSpaceFeed />
                      </TabPane>
                      <TabPane tab='Twitter Feed' key='3'>
                        <TwitterFeed />
                      </TabPane>
                    </Tabs>
                  </Card>{" "}
                </Col>
              </Row>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default UserHome;
