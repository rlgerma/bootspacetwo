import React, { useContext, useEffect } from "react";
import { Card, Row, Col, Tabs } from "antd";
import { UserContext } from "../../providers/UserProvider";
import { getNewsFeed } from "../../firebase";
import PostFeed from "../../components/user/dashboard/feed/Post";
import DashInfo from "../../components/user/dashboard/feed/GitHubFeed";
import FeedList from "../../components/user/dashboard/feed/BootSpaceFeed";
import SideNav from "../../components/layout/SideNav";
import Metrics from "../../components/user/dashboard/metrics";

const token = JSON.parse(sessionStorage.getItem("githubToken"));

const UserHome = () => {
  const { TabPane } = Tabs;
  const user = useContext(UserContext);
  const { displayName } = user;

  useEffect(() => {
    fetch("https://api.github.com/user/followers", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        sessionStorage.setItem("friends", JSON.stringify(result));
      });
  });

  return (
    <div className="dashboard">
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
                <DashInfo />
              </TabPane>
              <TabPane tab="BootSpace Feed" key="2" onClick={getNewsFeed()}>
                <FeedList />
              </TabPane>
            </Tabs>
          </Card>{" "}
        </Col>
        <Col className="gutter-row" span={2} flex={1}>
          <SideNav />
        </Col>
      </Row>
    </div>
  );
};

export default UserHome;
