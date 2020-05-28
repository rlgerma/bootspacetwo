import React, { useContext } from "react";
import { Link } from "@reach/router";
import { UserContext } from "../providers/UserProvider";

const Profile = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email } = user;
  const userData = JSON.parse(localStorage.getItem("bootSpaceUser"));

  return (
    <div className="main">
      <div className="left">
        <div className="profile">
          <div className="profilePicture">
            <h2 className="userName">{displayName}</h2>
            <div className="profilePic">
              <img src={photoURL} alt="Profile" style={{ width: "250px" }} />
            </div>
            <p>
              Website: {userData.blog}
              <br />
              <a href={`https://github.com/${userData.login}?tab=repositories`}>
                Repos
              </a>{" "}
              | <a href={`https://gist.github.com/${userData.login}`}>Gists</a>
            </p>
          </div>
          <div className="profileInfo">
            <span className="tagline">{userData.bio}</span>

            <p>{userData.location}</p>
            <div className="lastLogin">
              <p>
                Last Login:{" "}
                <span className="lastLog">{userData.lastUpdate}</span>
              </p>
            </div>
          </div>
          <div className="contact">
            <h3>
              Contacting <span className="userName">{displayName}</span>
            </h3>
            <div className="contactNav">
              <ul>
                <li>
                  <a href={`mailTo:${email}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                    </svg>
                    Send email
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
                    </svg>
                    Add to Friends
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.454 12.537c2.782 0 5.046 1.779 5.046 3.967 0 1.12-.462 1.745-1.102 2.509-.021.746-.049 1.054.139 1.866-.891-.306-.986-.396-1.666-.813-.894.218-1.489.38-2.465.38-3.087 0-4.998-2.046-4.998-3.942 0-2.188 2.264-3.967 5.046-3.967zm0-1.5c-3.436 0-6.546 2.292-6.546 5.467 0 2.799 2.633 5.442 6.498 5.442.699 0 1.44-.087 2.213-.275.914.561 2.933 1.128 4.352 1.385-.53-1.044-1.117-2.479-1.088-3.479.714-.853 1.117-1.953 1.117-3.073 0-3.158-3.089-5.467-6.546-5.467zm-8.485 4.614c-1.138-.11-1.611-.247-2.611-.491-.97.596-1.26.815-3.008 1.374.418-1.514.364-2.183.333-3.183-.834-1-1.683-2.07-1.683-3.943 0-3.502 3.589-6.352 8-6.352 4.264 0 7.748 2.664 7.978 6.004.698.038 1.377.14 2.021.315-.022-4.834-4.762-8.319-9.999-8.319-5.281 0-10 3.527-10 8.352 0 1.71.615 3.391 1.705 4.695.047 1.527-.851 3.718-1.661 5.313 2.168-.391 5.252-1.258 6.649-2.115.802.196 1.578.314 2.33.374-.135-.749-.148-1.317-.054-2.024z" />
                    </svg>
                    Instant Message
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 18h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-15.999-10c-2.493 0-4.227 2.383-1.866 6.839.774 1.464-.826 1.812-2.545 2.209-1.491.345-1.59 1.072-1.59 2.334l.002.618h1.329c0-1.918-.186-1.385 1.824-1.973 1.014-.295 1.91-.723 2.316-1.612.212-.463.355-1.22-.162-2.197-.952-1.798-1.219-3.374-.712-4.215.547-.909 2.27-.908 2.819.015.935 1.567-.793 3.982-1.02 4.982h1.396c.44-1 1.206-2.208 1.206-3.9.001-2.01-1.31-3.1-2.997-3.1zm7.754-1.556c.895-1.487 3.609-1.494 4.512.022.77 1.291.423 3.484-.949 6.017-.098.18-.17.351-.232.517h1.464c3.057-5.744.816-9-2.548-9-3.323 0-5.635 3.177-2.488 9.119 1.033 1.952-1.101 2.416-3.394 2.946-1.988.458-2.12 1.429-2.12 3.11l.003.825h1.331c0-2.069-.08-2.367 1.173-2.657 1.918-.442 3.729-.86 4.39-2.305.241-.527.401-1.397-.206-2.543-1.362-2.572-1.704-4.777-.936-6.051z" />
                    </svg>
                    Add to Group
                  </a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href="/#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z" />
                    </svg>
                    Block User
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="userUrl">
            <h4>
              GitHub URL:{" "}
              <Link to={userData.profileUrl}>{userData.profileUrl}</Link>
            </h4>
          </div>
        </div>
      </div>

      <div className="friends">
        <h3>
          <span className="userName">{displayName}</span>'s Friend Space
        </h3>
        <p style={{ fontWeight: "bold", marginLeft: 10 + "px" }}>
          <span className="userName">{displayName}</span> has{" "}
          {userData.followers} followers on GitHub.
        </p>
      </div>
    </div>
  );
};

export default Profile;
