import { FC } from "react";
import { Row, Comment, Tooltip, Avatar, Skeleton } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const LoadingPost = (): JSX.Element => (
  <Row>
    <Comment
      avatar={<Skeleton avatar active />}
      content={<Skeleton paragraph={{ rows: 1, width: 400 }} active />}
    />
  </Row>
);

interface Props {
  feed: {
    id: string | null;
    actor: {
      login: string;
      avatar_url: string | null;
    };
    type: string;
    payload: {
      ref_type: string;
      action: string;
      release: {
        tag_name: string;
      };
      ref: string;
    };
    repo: {
      url: string | undefined;
      name: string | null;
    };
    created_at: Date;
  }[];
}

const GitHubFeed: FC<Props> = ({ feed }) => {
  dayjs.extend(relativeTime);

  return !feed ? (
    <>
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
      <LoadingPost />
    </>
  ) : (
    <>
      {feed.map(
        (user: {
          id: string | null;
          actor: {
            login: string;
            avatar_url: string | null;
          };
          type: string;
          payload: { ref_type: string; action: string; release: { tag_name: string }; ref: string };
          repo: {
            url: string | undefined;
            name: string | null;
          };
          created_at: Date;
        }) => (
          <Row key={user.id}>
            <Comment
              author={user.actor.login}
              avatar={<Avatar src={user.actor.avatar_url} alt={user.actor.login} />}
              content={
                <p>
                  {user.type === "CreateEvent"
                    ? `created a new ${user.payload.ref_type} ${
                        user.payload.ref_type === "repository" ? "" : "for"
                      }`
                    : user.type === "PullRequestEvent"
                    ? `${user.payload.action} a pull request for`
                    : user.type === "WatchEvent"
                    ? "is now watching"
                    : user.type === "DeleteEvent"
                    ? `removed ${user.payload.ref_type} for`
                    : user.type === "ReleaseEvent"
                    ? `released ${user.payload.release.tag_name} for`
                    : user.type === "PushEvent"
                    ? `pushed ${user.payload.ref} to`
                    : ""}{" "}
                  <a href={user.repo.url}>{user.repo.name}</a>
                </p>
              }
              datetime={
                <Tooltip title={dayjs().format("YYYY-MM-DD HH:mm")}>
                  <span>{dayjs(user.created_at).fromNow(true)}</span>
                </Tooltip>
              }
            />
          </Row>
        )
      )}
    </>
  );
};

export default GitHubFeed;
