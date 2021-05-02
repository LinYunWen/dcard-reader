# Dcard Reader

> This is a developing demo website for reading posts from Dcard.

## How to use
1. git clone from https://github.com/LinYunWen/dcard-reader
2. cd into `dcard-reader` folder and run `npm i`
3. run `npm start dev` for automatically starting server and opening browser

## Description
### File Structure

```
|- src
  |- component
    |- App.js
    |- Content.js
    |- LoadCard.js
    |- PostCard.js
    |- WarnAndErrorContent.js
  |- scss
    |- app.scss
    |- base.scss
    |- card.scss
  |- api.js
  |- index.html
  |- index.js
|- build
|- config
  |- webpack.config.dev.js
|- Readme.md
|- .babelrc
|- .gitignore
|- .package.json
|- .package-lock.json
```
- src
  > - There are the source codes.
  - component
    > - Put React component here
    - App.js
      - This is the top component on the structure. Only defined the basic UI like app bar.
      - But I implemented first api request and infinite scroll function here. ([see detail](#infinite-scrolling))
    - Content.js
      - It is the container for the content of the website.
      - Not only generate post cards or loading cards but also the warning and error content.
    - LoadCard.js
      - Use Material UI's Skeleton for loading cards.
    - PostCard.js
      - Implement the post card with title, excerpt, reaction, image, gender, and forum name.
    - WarnAndErrorContent.js
      - It will show the message when there is no post or catch error on api requesting.
  - scss
    > - Put scss files here
  - api.js
    - The api for getting posts from Dcard.
  - index.html
    - It is the html template for webpack.
    - I only set simple head, body tag here. And add div tag with "root" for matching the entry in index.js
  - index.js
    - This is the entry point of codes of the website.
    - React root is here.
- build
  > - According my webpack setting, the compiled file will be here.

- config
  > - The webpack setting
  - webpack.config.dev.js
    - Set development environment and website entry point. At the same time, I set proxy for dealing with CORS problem here. ([see detail](#webpack-setting))
- .babelrc
  - It is the babel setting.
- .gitignore
  - I setup the files which are not tracked by git.
- package.json, package-lock.json
  - This is the environment information of the project and some commands for node.

### Detail
#### Webpack Setting
- Because of convenience in developing, I set the mode on development. And add devServer setting, HotModuleReplacementPlugin for automatically run the server and hot reload when writing codes. Set port on 8080 and open with true for automatic opening the browser.
- To handle the CORS problem, I use proxy setting to change the origin, redirect the api and then, add "Access-Control-Allow-Origin" on header.
- Use some loader for building the website like style-loader, css-loader, sass-loader, html-loader, babel-loader, url-loader.
- Use BannerPlugin, HtmlWebpackPlugin.

#### Infinite Scrolling
- I implemented this function by always adding a loading card with id="last-card" on the bottom of post card. Then, handle the scrolling event. When scrolling, it will check the last card if appears on the viewport. if it is true, fetch the next batch of posts information.

#### Better Improvement
> - There still are many parts can be improved
- we can use webpack minimizer to compress the builded files and remove the source map by production mode.
- Although monitoring the scroll event can do infinite scroll function, it is not the efficient approach. The better way is use Intersection Observer API.
- Each api request will get 30 posts, but not all show in viewport. Therefore, it can be rendered when it appears in viewport, especially the image rendering.

## Demo Picture
### loading
![](https://i.imgur.com/MUw7Mok.png)
### normal
![](https://i.imgur.com/53VcLmT.png)
### infinite scroll
![](https://imgur.com/hpBnXn7.gif)
### no post
![](https://i.imgur.com/F54VWP5.png)
### error on qpi request
![](https://i.imgur.com/5DfUo48.png)

## Reference
- [material-ui](https://material-ui.com/)
- [react](https://zh-hant.reactjs.org/)
- [webpack](https://webpack.js.org/guides/development/)
- [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)
- [drop-shadow - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow())
- [getBoundingClientRect() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [利用CSS裁切圖片](https://www.webdesigns.com.tw/CSS-clip.asp)
- [Sass](https://sass-lang.com/)
- [Babel](https://babeljs.io/)
