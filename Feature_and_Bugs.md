# Feature and Bugs Update

## Upcoming

### Features

- Background color changes according to the album cover of the newest song added.
- Change the display and game language.
  
### Issues

- Non english words are included in the keywords. [on progress]
- Search list is scrolling in the x direction.
- Title without keywords can slip through because the API calling result includes search for each word of the title.

## 0.1.1 (first alpha fix)

### Bug and other fixes

- Solved `hydration error` on retrieving history from local storage by placing set method inside useEffect hook.
- Solved `Image does not have a src attribute` error on SongImage
- Solved `Cannot read properties of undefined (reading '0')`. The fix was to get the properties one by one (get the releases, first item in the releases (0), )
- Solved punctuation marks included in the keywords issue.
- Solved overflowing search item title.
