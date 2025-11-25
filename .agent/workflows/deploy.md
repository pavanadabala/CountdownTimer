---
description: Deploy the countdown timer to GitHub Pages
---

# Deploying to GitHub Pages

Follow these steps to deploy your Countdown Timer website to GitHub Pages:

## Step 1: Push Your Code to GitHub

First, make sure all your latest changes are committed and pushed:

```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main
```

> **Note**: If your default branch is `master` instead of `main`, use `master` in the commands above.

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/[your-username]/CountdownTimer`
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **Save**

## Step 3: Wait for Deployment

- GitHub will show a message: "Your site is ready to be published at `https://[your-username].github.io/CountdownTimer/`"
- Wait 1-3 minutes for the initial deployment
- Refresh the Pages settings to see if it's live

## Step 4: Access Your Website

Your countdown timer will be live at:
```
https://[your-username].github.io/CountdownTimer/
```

Share this URL with anyone to show off your countdown timer! 🎉

## Future Updates

Whenever you make changes:

// turbo-all
1. Commit your changes:
```bash
git add .
git commit -m "Update countdown timer"
```

2. Push to GitHub:
```bash
git push origin main
```

3. GitHub Pages will automatically rebuild and deploy (takes 1-3 minutes)

## Troubleshooting

**Site not loading?**
- Check that the repository is public
- Verify the branch name matches what you selected in Settings
- Make sure `index.html` is in the root directory
- Wait a few more minutes (first deployment can take up to 10 minutes)

**Changes not showing?**
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for GitHub Pages to rebuild
- Check the Actions tab in your repo to see deployment status

## Custom Domain (Optional)

If you want to use your own domain name instead of `github.io`:
1. In Pages settings, enter your custom domain
2. Add DNS records at your domain registrar (GitHub will show you what to add)
