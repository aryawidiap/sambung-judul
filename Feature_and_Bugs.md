# Feature and Bugs Update

## Upcoming

### Features

- Background color changes according to the album cover of the newest song added.
- Change the game language (accept Indonesian title).
  
### Issues

- Non english words are included in the keywords. [on progress]

## 0.3.0 (PLANNED web launch)

- Launching the app in Github or Vercel.🤞

## 0.2.0

### Features

- Change the display language between English and Indonesian.

### Bug and other fixes

- Title without keywords can slip through because the API calling result includes search for each word of the title > Solved by using quotation marks ("") to find the title in full instead of the words in the title.

## 0.1.2

### Bug and other fixes

- Solved search list horizontal scrolling by clipping and adding padding, helped by the removal of tooltip in favor of animated title.

## 0.1.1 (first alpha fix)

### Bug and other fixes

- Solved `hydration error` on retrieving history from local storage by placing set method inside useEffect hook.
- Solved `Image does not have a src attribute` error on SongImage
- Solved `Cannot read properties of undefined (reading '0')`. The fix was to get the properties one by one (get the releases, first item in the releases (0), )
- Solved punctuation marks included in the keywords issue.
- Solved overflowing search item title.
