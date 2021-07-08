import React from "react";
import { Spin } from "antd";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterFeed = ({ twitter }) => {
  return (
    <section
      className='twitterContainer'
      style={{ margin: "2.5% auto", textAlign: "center" }}
    >
      <div className='twitter-embed'>
        <TwitterTimelineEmbed
          sourceType='profile'
          screenName={`${twitter}`}
          options={{
            tweetLimit: "10",
            width: "75%",
            height: "auto",
          }}
          theme='light'
          noHeader={true}
          noBorders={true}
          noFooter={true}
          placeholder={<Spin />}
        />
      </div>
    </section>
  );
};

export default TwitterFeed;
