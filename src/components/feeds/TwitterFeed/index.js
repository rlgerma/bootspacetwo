import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { LoadingPost } from "../GitHubFeed";

const TwitterFeed = ({ twitter }) => {
  return (
    <section className='twitterContainer'>
      <div className='twitter-embed'>
        <TwitterTimelineEmbed
          sourceType='profile'
          screenName={`${twitter}`}
          options={{
            tweetLimit: "30",
            width: "75%",
            height: "200",
          }}
          theme='light'
          noHeader={true}
          noBorders={true}
          noFooter={true}
          placeholder={<LoadingPost />}
        />
      </div>
    </section>
  );
};

export default TwitterFeed;
