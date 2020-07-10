import React, { useState } from "react";
import { signInWithGithub } from "../../../firebase";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Row, Col, Divider, Button, Tooltip } from "antd";

const SignIn = () => {
  const [error] = useState(null);

  return (
    <div className="signIn">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={14} flex={3} offset={1}>
          <Card title="Commit to Connections" className="loginInfoCard">
            <p>
              BootSpace is built on your work from GitHub. We use the GitHub API
              to help build your profile so you can connect with other BootSpace
              users.
            </p>
            <p>
              {" "}
              We only can only access your public information and can not, nor
              will we create/modify/delete any repositories of yours.
            </p>
          </Card>
        </Col>
        <Col className="gutter-row" span={6} flex={2}>
          <Card
            title="Please Sign In or Sign Up"
            className="loginCard"
            style={{ textAlign: "center", margin: "0 0 1em 0" }}
          >
            {error !== null && <div className="error">{error}</div>}

            <Button
              onClick={() => {
                try {
                  signInWithGithub();
                } catch (error) {
                  console.error("Error signing in with Google", error);
                }
              }}
              className="githubLogin"
              style={{ margin: "1em auto" }}
            >
              Sign In with GitHub
            </Button>
            <br />
            <Divider plain>or</Divider>
            <Button
              onClick={() => {
                try {
                  signInWithGithub();
                } catch (error) {
                  console.error("Error signing in with Google", error);
                }
              }}
              className="githubLogin"
              style={{ margin: "1em" }}
            >
              <Tooltip title="You'll still need to sign in after you create your account. If you are having trouble after you press create, check your email for confirmation">
                Create an account with GitHub
              </Tooltip>
            </Button>
            <Tooltip
              title="You'll still need to sign in after you create your account.
               If you are having trouble after you press create, check your email for confirmation"
              trigger="click"
            >
              <InfoCircleOutlined />
            </Tooltip>
            <br />
            <Tooltip title="Whats GitHub?">
              <a href="https://github.com/join" style={{ margin: "0 8px" }}>
                Don't have a GitHub account?
              </a>
            </Tooltip>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default SignIn;
