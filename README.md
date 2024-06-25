# ⌛ WebTracer

A productivity tool to track your screen time!
WebTracer is a chrome extension that tracks your screen time. It keeps track of how much time you spend on the web everyday.

## ⚙️ Time Spent: 30 Hours

## 📦 Technologies

- `HTML`
- `CSS & SASS`
- `Javascript`
- `React`
- `TypeScript`
- `Vite`

## ⭐ Features

Here's what WebTracer can do for you:

1️⃣  **Total active daily screen time**\
2️⃣  **A list of the websites you visited and its duration**\
3️⃣  **Reset and clear your activity details at any time**\
4️⃣  **Your data will automatically reset at midnight**

## 📖 The Process

I started by structuring and planning my React components - styling the layout of the chrome extension before adding the functionality. I took inspiration from other designs and designed my own mock up on Figma before bringing it to life.

Next I created and formatted my manifest.json file making sure I had the correct permissions and details.

With the setup complete, I moved onto handling the logic of the background.js file which would be responsible for executing the code to track a user's browsing activity. 
The logic of tracking a user's activity can be split into a few segments:
- Chrome event listeners to ensure web activity is not tracked when the user's browser is inactive or minimized
- A function to track total browsing time 
- A function to store and update the browsing time of individual websites
- A function to manually clear a user's browsing activity
- A function to automatically reset a user's browsing activity at midnight
- A function to determine which chrome tabs are minimized (these tabs are not tracked because the user isnt actively using it).

Finally, I linked the client-side to fetch data from background.js and render the user's webtime activity.

## 👓 What I Learned

During this project, I applied many different skills to build a real and public project!

### 💻 `Google Chrome API`:
- **Chrome.tabs API**: In order to query the user's tabs, the chrome.tabs API was used to identify what website the user has open on their active tab(s). 
- **Chrome.windows API**: This API allows me to determine when a browser becomes inactive or when a user changes their active window. It also lets me track the state of the user's chrome windows so that I can filter out tabs that are on a minimized chrome window.

### 💾 `Chrome Local Storage`:
- To ensure the user data persists whenever the extension is closed and opened, I stored the tracking data in Chrome's local storage. This way, each time the extension is re-run, I can check the data in the local storage.

## 💭 How can it be improved?
For future iterations, here are some other features that could be introduced to improve this product.

- Store browsing history: Store historical data on a database so that users can view their web browsing activity from the past. This can encourage users stay on top of their browsing habits.
- Improved paint bucket: The paint bucket tool can be improved by allowing users to paint inside shapes that they have already drawn instead of covering the entire canvas.
- Shape Tools: Common shapes such as triangles, stars or squares can be introduced as a stamp tool so users do not need to draw it from scratch every time.

## 🚦 Running the Project
Download the project for free on the Chrome Web Store!
https://chromewebstore.google.com/detail/webtracer-a-productivity/cbcjdipdfpjomdjfbhimgbkebeekbepm

## 🍿 Preview
![output-onlinepngtools (3)](https://github.com/davidtothekim/WebTracer/assets/81598858/df7f3791-cf02-45bc-84ec-032f432f4d70)
![output-onlinepngtools (1)](https://github.com/davidtothekim/WebTracer/assets/81598858/8ab7b0e2-f0a4-4373-8796-ee2c7eebff06)





