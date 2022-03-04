import { TwitterTimelineEmbed } from "react-twitter-embed";
import { FC } from "react";
import { LoadingPost } from "../GitHubFeed";

interface Props {
  twitter: string;
}

const TwitterFeed: FC<Props> = ({ twitter }) => {
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
