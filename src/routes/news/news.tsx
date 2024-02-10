import React from 'react';
import RoguelikeAnnouncement from 'img/RoguelikeAnnouncement.webp';

const News = () => {
  return (
    <div>


      <p>Please join our community:</p>
      <ul>
        <li>
          <a href="https://discord.gg/JykuRkdd5S" target="_blank">
            Discord
          </a>
        </li>
        <li>
          <a href="https://twitter.com/clarent_online" target="_blank">
            Twitter
          </a>
        </li>
      </ul>
      <p>Disclaimer:</p>
      <small>
        Clarent is in no way affiliated with Weebs of the Shore. Legend Story
        Studios®, Grand Archive™, and set names are trademarks of Legend Story
        Studios. Grand Archive characters, cards, logos, and art are property
        of Weebs of the Shore. Clarent is a fan made project that may have
        bugs; game interactions and rulings are the jurisdiction of LSS and
        judges. Card Images © Weebs of the Shore
      </small>
    </div>
  );
};

/*
            <hgroup>
        Watch Battle Hardened: St. Louis!
        <a href="https://www.youtube.com/watch?v=9ADl9gDGtH0" target="_blank">
          <img
            src="bh-st-louis.webp"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '100%',
              objectFit: 'cover'
            }}
          />
        </a>
      </hgroup>

      */

export default News;
