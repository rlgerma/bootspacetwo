import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserProvider";

import { token } from "../../firebase";
import SideNav from "../../components/layout/SideNav";
import Metrics from "../../components/user/dashboard/metrics";
import PostFeed from "../../components/user/dashboard/feeds/Post";
import GitHubFeed from "../../components/user/dashboard/feeds/GitHubFeed";
import BootSpaceFeed from "../../components/user/dashboard/feeds/BootSpaceFeed";
import TwitterFeed from "../../components/user/dashboard/feeds/TwitterFeed";
import { Skeleton } from "antd";
import { Card, Row, Col, Tabs } from "antd";

const UserHome = () => {
  const user = useContext(UserContext);
  const { TabPane } = Tabs;
  const { displayName } = user;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let url = "https://api.github.com/user/followers";
      const res = await fetch(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          sessionStorage.setItem("friends", JSON.stringify(result));
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };

    getData();
  }, []);

  return (
    <div className='dashboard'>
      {loading ? (
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
                    <GitHubFeed />
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
            <Col className='gutter-row' span={2} flex={1}>
              <SideNav />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default UserHome;
