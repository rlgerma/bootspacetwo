import React, { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context";
import { auth, gitHubProvider } from "../../firebase";
import { GithubFilled } from "@ant-design/icons";
import { Card, Row, Col, Button, Tooltip } from "antd";
import fig from "../../assets/images/login-fig.jpeg";

const Login = () => {
  const { functions, authUser } = useContext(UserContext);

  const signInWithGithub = async () => {
    try {
      await auth
        .signInWithPopup(gitHubProvider)
        .then((res) => functions.generateUserDocument(res))
        .catch((error) => console.error(error));
    } catch (err) {
      console.error(err);
    }
  };

  return authUser ? (
    <Redirect to='/' />
  ) : (
    <div className='signIn'>
      <Row>
        <Col md={16} sm={24}>
          <Card
            title='Commit to Connections'
            headStyle={{ textAlign: "center", paddingLeft: "2.5em" }}
            className='loginInfoCard'
          >
            <Row>
              <Col md={8} />
              <Col md={16}>
                <p
                  style={{
                    fontSize: "1.2em",
                    padding: "2em 1em 1em 3.5em",
                    margin: "1em auto",
                    lineHeight: "3.5vh",
                  }}
                >
                  BootSpace is built on your work from GitHub. We use the GitHub API to help build
                  your profile so you can connect with other BootSpace users.
                </p>
                <p
                  style={{
                    fontSize: "1.2em",
                    padding: ".5em 1em 1em 3.5em",
                    margin: "1em auto",
                    lineHeight: "3.5vh",
                  }}
                >
                  {" "}
                  We only can only access your public information and can not, nor will we
                  create/modify/delete any repositories of yours.
                </p>
                <p
                  style={{
                    fontSize: "1.2em",
                    padding: ".5em 1em 1em 3.5em",
                    margin: "1em auto",
                    lineHeight: "3.5vh",
                  }}
                >
                  {" "}
                  BootSpace is not endorsed, sponsored, or approved by GitHub and is solely a
                  independent application for social networking purposes
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={8} sm={24}>
          <Card title='Sign In' className='loginCard'>
            <Button onClick={() => signInWithGithub()} className='githubLogin'>
              Sign In with GitHub <GithubFilled />
            </Button>
            <br />
            <img src={fig} alt='figure' style={{ width: "75%" }} />
            <br />
            <Tooltip title='Whats GitHub?'>
              <a href='https://github.com/join'>Don&apos;t have a GitHub account?</a>
            </Tooltip>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Login;
