import React, { useState } from "react";
import { signInWithGithub } from "../../../firebase";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Row, Col, Divider, Button, Tooltip } from "antd";

const SignIn = () => {
  const [error] = useState(null);

  return (
    <div className="signIn">
      <Row>
        <Col>
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
        <Col>
          <Card title="Please Sign In or Sign Up" className="loginCard">
            {error !== null && <div className="error">{error}</div>}

            <Button
              onClick={() => {
                try {
                  signInWithGithub();
                } catch (error) {
                  console.error("Error signing in with Github", error);
                }
              }}
              className="githubLogin"
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
                  console.error("Error signing in with Github", error);
                }
              }}
              className="githubLogin"
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
              <a href="https://github.com/join">Don't have a GitHub account?</a>
            </Tooltip>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default SignIn;
