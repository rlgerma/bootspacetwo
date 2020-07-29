import React, { Suspense, useContext, useEffect, useState } from "react";
import { Card, Row, Col, Tabs } from "antd";
import { UserContext } from "../../providers/UserProvider";
import { getNewsFeed } from "../../firebase";
import PostFeed from "../../components/user/dashboard/feed";
import DashInfo from "../../components/user/dashboard/dashInfo";
import FeedList from "../../components/user/dashboard/feed/FeedList";
const UserHome = () => {
  const { TabPane } = Tabs;
  const user = useContext(UserContext);
  const { displayName, userData } = user;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(userData.followersUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
          localStorage.setItem("friends", JSON.stringify(result));
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  });
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="dashboard">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6} offset={1} flex={2}>
            <PostFeed />
          </Col>
          <Col className="gutter-row" span={16} flex={3}>
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
        </Row>
      </div>
    );
  }
};

export default UserHome;
