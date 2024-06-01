# web-action-encoder

This is a browser extension to encode humanlike web actions into JSON format. I created this to replicate actions in Python Selenium. It works on Chromium-based browsers. 

## Install

```bash
git clone https://github.com/SamuelReeder/web-action-encoder.git
```

For further setup, look into deploying a local extension on your browser and use the cloned repository.

## Usage

1. Open the extension in the browser toolbar.
2. Input a name for your new action.
3. Click start.
4. Perform desired key presses and mouse clicks in the DOM. Browser interactions (ie. turning off the extension) will be omitted.
5. Click stop once you have performed the desired actions.
6. Click export to download the JSON file encoding the actions.

Your actions are now encoded in a code-readable format!
