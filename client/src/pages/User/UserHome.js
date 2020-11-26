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
  const user = props.user;
  const { TabPane } = Tabs;
  const { displayName } = user;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    getData();
  }, []);

  return (
    <div className="dashboard">
      {user === null || user === undefined ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
          <Metrics />
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6} offset={1} flex={2}>
              <Card>
                <PostFeed />
              </Card>
            </Col>
            <Col className="gutter-row" span={14} flex={2}>
              <Card
                title={`Welcome back, ${displayName
                  .split(" ")
                  .slice(0, -1)
                  .join(" ")}`}
                className="dashCard"
              >
                <Tabs defaultActiveKey="1" centered>
                  <TabPane tab="GitHub Feed" key="1">
                    {loading ? <Skeleton active /> : <GitHubFeed user={user} />}
                  </TabPane>
                  <TabPane tab="BootSpace Feed" key="2">
                    <BootSpaceFeed />
                  </TabPane>
                  <TabPane tab="Twitter Feed" key="3">
                    <TwitterFeed />
                  </TabPane>
                </Tabs>
              </Card>{" "}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default UserHome;
