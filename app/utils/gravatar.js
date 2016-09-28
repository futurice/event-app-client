'use strict';

import md5 from 'blueimp-md5';

// const DEFAULT_AVATAR_URL = 'monsterid'

const DEFAULT_AVATAR_URLS = [
  'https://storage.googleapis.com/futuroots/assets/teams/customer.png',
  'https://storage.googleapis.com/futuroots/assets/teams/futuricean.png',
  'https://storage.googleapis.com/futuroots/assets/teams/friends.png',
  'https://storage.googleapis.com/futuroots/assets/teams/alumni.png'
];

const DEFAULT_AVATAR_SIZE = 40;

/**
 * Call this with a email for Gravatar
 *
 * See: https://en.gravatar.com/site/implement/images/
 */
 export function getGravatarForEmail(email, name, teamId = 0, size) {

  // if (!email) {
  //   return defaultAvatarUrl;
  // }

  const defaultAvatar = DEFAULT_AVATAR_URLS[parseInt(teamId, 10) % DEFAULT_AVATAR_URLS.length];
  const avatarSize = size || DEFAULT_AVATAR_SIZE;

  const hashedEmail = md5(email || name || 'no-mail');
  return `https://www.gravatar.com/avatar/${hashedEmail}?d=${defaultAvatar}&s=${avatarSize}`;
}

