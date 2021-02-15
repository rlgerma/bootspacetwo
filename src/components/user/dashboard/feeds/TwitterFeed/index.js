import React from "react";
import { Spin } from "antd";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterFeed = () => {
  return (
    <section
      className="twitterContainer"
      style={{ margin: "2.5% auto", textAlign: "center" }}
    >
      <div className="twitter-embed">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="rickygermaine"
          options={{
            tweetLimit: "10",
            width: "75%",
            height: "auto",
          }}
          theme="light"
          noHeader={true}
          noBorders={true}
          noFooter={true}
          placeholder={<Spin />}
        ></TwitterTimelineEmbed>
      </div>
    </section>
  );
};

export default TwitterFeed;
