# EchoStory™ Storefront - Setup & Configuration Guide

## Quick Start Checklist

Before launching, you need to configure three main areas:

- [ ] Square Payment Integration
- [ ] Formspree Form Endpoint
- [ ] Audio Preview Files

---

## 1. Square Payment Integration

### What You Need
- A Square account ([sign up free at square.com](https://squareup.com))
- 5 payment links (one for each package tier)

### Setup Steps

1. **Log into Square Dashboard**
   - Go to https://square.link/dashboard
   - Navigate to "Online Checkout" → "Payment Links"

2. **Create Payment Links**
   Create a payment link for each package:
   
   | Package | Price | Description |
   |---------|-------|-------------|
   | Mini | $79 | EchoStory™ Mini |
   | Classic | $179 | EchoStory™ Classic |
   | Signature | $349 | EchoStory™ Signature Experience |
   | Legacy | $649 | EchoStory™ Legacy Edition |
   | Eternal | $9,999 | EchoStory™ Eternal Legacy Suite |

3. **Copy Link IDs**
   - After creating each link, copy its Link ID (format: `sq0idp-xxxxx`)
   - Each link has a unique identifier

4. **Update Configuration**
   - Open `indexx.html`
   - Find the CONFIG section (around line 1702)
   - Replace `YOUR_LINK_ID` with actual Square Link IDs:

   ```javascript
   squareLinks: {
       mini: 'sq0idp-abc123',        // Your actual Mini package link
       classic: 'sq0idp-def456',     // Your actual Classic package link
       signature: 'sq0idp-ghi789',   // etc...
       legacy: 'YOUR_LINK_ID',
       eternal: 'YOUR_LINK_ID'
   },
   ```

5. **Test Payment Flow**
   - Select a package in the wizard
   - Complete the form
   - Click "Pay with Square"
   - Verify redirect to correct Square checkout

### Fallback Behavior
If no Square Link ID is configured, customers will see:
> "You'll receive a Square invoice via email with your complete order details and payment link."

---

## 2. Formspree Form Configuration

### What You Need
- A Formspree account ([sign up free at formspree.io](https://formspree.io))

### Setup Steps

1. **Create Formspree Account**
   - Go to https://formspree.io/forms
   - Sign up (free tier includes 50 submissions/month)

2. **Create New Form**
   - Click "New Form"
   - Name it "EchoStory Orders"
   - Copy the Form ID (format: `abcd1234`)

3. **Update HTML**
   - Open `indexx.html`
   - Find line 1582
   - Replace `YOUR_FORM_ID`:

   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   
   Becomes:
   
   ```html
   <form action="https://formspree.io/f/abcd1234" method="POST">
   ```

4. **Configure Form Notifications**
   - In Formspree dashboard, set email notifications
   - Add notification email (where orders should be sent)

5. **Test Form Submission**
   - Fill out the wizard completely
   - Submit the form
   - Check Formspree dashboard for submission
   - Verify email notification received

### Form Data Captured
The form automatically submits:
- Customer name & email
- Recipient name
- Chosen vibe, occasion, scale
- Selected package
- Add-ons selected
- Memory builder data (trait, decade, memory moment)
- Estimated total
- Additional notes

---

## 3. Audio Preview Files

### What You Need
- 10 audio preview files (15-30 seconds each)
- MP3 format, 320kbps recommended

### File Requirements

| File Name | Vibe | Description |
|-----------|------|-------------|
| `jazz-preview.mp3` | Jazz Swing | Frank Sinatra style, smoky lounge |
| `lounge-preview.mp3` | Lounge | Smooth, sophisticated |
| `acoustic-preview.mp3` | Acoustic | Warm guitar, intimate |
| `modern-pop-preview.mp3` | Modern Pop | Contemporary, radio-ready |
| `country-preview.mp3` | Country | Heartfelt storytelling |
| `lofi-preview.mp3` | Lofi / Chill | Soft beats, cozy |
| `gamey-preview.mp3` | 8-bit / Gamey | Chiptune-inspired |
| `cinematic-preview.mp3` | Cinematic | Big, emotional, soundtrack |
| `love-ballad-preview.mp3` | Love Ballad | Romantic, tender |
| `storytelling-preview.mp3` | Storytelling Mode | Narrative-driven |

### Setup Steps

1. **Prepare Audio Files**
   - Duration: 15-30 seconds (shorter is better for previews)
   - Format: MP3
   - Bitrate: 320kbps (high quality) or 192kbps (good quality)
   - Normalize audio levels for consistent volume

2. **Create Directory Structure**
   ```
   mini.shops/EchoStory/
   ├── indexx.html
   └── audio/
       ├── jazz-preview.mp3
       ├── lounge-preview.mp3
       ├── acoustic-preview.mp3
       ├── modern-pop-preview.mp3
       ├── country-preview.mp3
       ├── lofi-preview.mp3
       ├── gamey-preview.mp3
       ├── cinematic-preview.mp3
       ├── love-ballad-preview.mp3
       └── storytelling-preview.mp3
   ```

3. **Upload Files**
   - Place all MP3 files in the `/audio/` directory
   - Ensure file names match exactly (case-sensitive)

4. **Test Audio Playback**
   - Open the storefront
   - Go to Step 1 (Vibe Selection)
   - Click each vibe option
   - Verify audio preview loads and plays
   - Test on multiple browsers:
     - Chrome (desktop & mobile)
     - Firefox
     - Safari (iOS critical)
     - Edge

### Troubleshooting Audio
- **No audio plays**: Check browser console for 404 errors
- **Wrong audio plays**: Verify file names match CONFIG exactly
- **Audio cuts off**: Check file isn't corrupted
- **Safari issues**: Safari requires user interaction before audio plays (expected behavior)

---

## 4. Testing Checklist

### Pre-Launch Testing

#### Wizard Flow
- [ ] Step 1: All 10 vibes selectable
- [ ] Step 1: Vibe wheel spins and selects
- [ ] Step 1: Audio morphing slider crossfades smoothly
- [ ] Step 2: All 6 occasions selectable
- [ ] Step 2: Theme colors change based on occasion
- [ ] Step 3: All 3 scales selectable
- [ ] Step 3: Recommendation panel updates
- [ ] Step 4: All 5 packages selectable
- [ ] Step 4: Bundle reveal animation plays
- [ ] Step 4: Upsell chips appear and work
- [ ] Step 4: Add-ons can be selected/deselected
- [ ] Step 4: Subtotal updates correctly
- [ ] Step 5: Form validates required fields
- [ ] Step 5: Memory builder captures data
- [ ] Step 5: "Hear Their Name" button works
- [ ] Step 5: Lyric teaser generates

#### Browser Compatibility
- [ ] Chrome (Windows/Mac/Linux)
- [ ] Firefox (Windows/Mac/Linux)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Mobile Safari (iPhone - critical)
- [ ] Mobile Chrome (Android)

#### Mobile Responsiveness
- [ ] Vibe wheel scales correctly on small screens
- [ ] Audio slider usable on touch devices
- [ ] All buttons are finger-sized (44x44px minimum)
- [ ] No horizontal scroll on any screen size
- [ ] Forms don't zoom on iOS (test on actual device)

#### Payment Flow
- [ ] Square redirect works for all packages
- [ ] UTM parameters included in URL
- [ ] Correct pricing shows in Square checkout
- [ ] Fallback message shows if no Link ID configured

#### Form Submission
- [ ] Form submits successfully
- [ ] Formspree receives all data
- [ ] Email notification sent to correct address
- [ ] Success message displays
- [ ] Square payment option appears
- [ ] LocalStorage clears after submission

#### Audio System
- [ ] All 10 audio previews load
- [ ] Crossfade works smoothly
- [ ] Volume levels consistent
- [ ] No audio overlap or cutting
- [ ] Works on iOS Safari (requires tap first)

---

## 5. Deployment

### Hosting Options

#### Option A: GitHub Pages (Free)
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select branch and folder
4. Access at: `https://yourusername.github.io/echostory/`

#### Option B: Netlify (Free tier available)
1. Create Netlify account
2. Drag & drop folder to Netlify
3. Get custom domain or use netlify subdomain
4. Auto-deploy on git push

#### Option C: Custom Server
1. Upload files to web server
2. Ensure HTTPS enabled (required for audio/payments)
3. Set proper MIME types:
   - `.html` → `text/html`
   - `.mp3` → `audio/mpeg`

### Post-Deployment
- [ ] Test live URL in all browsers
- [ ] Verify all audio files load via HTTPS
- [ ] Test form submission on live site
- [ ] Test Square payment flow end-to-end
- [ ] Check mobile responsiveness on real devices
- [ ] Verify analytics tracking (if added)

---

## 6. Maintenance

### Regular Checks
- **Weekly**: Check Formspree for new submissions
- **Monthly**: Verify Square links still active
- **Quarterly**: Test full wizard flow across browsers

### Updating Pricing
To change package prices:
1. Update `data-base` attributes in HTML (line ~1380)
2. Update Square payment link amounts
3. Update addon prices in HTML (line ~1395)

### Adding New Vibes
1. Add audio file to `/audio/` directory
2. Add entry to `CONFIG.audioPreviews` (line ~1721)
3. Add choice card to Step 1 HTML (line ~1192)
4. Add to `formatVibeName()` function (line ~1799)

---

## 7. Support & Troubleshooting

### Common Issues

**Issue**: Audio doesn't play on iOS
- **Solution**: Audio requires user interaction on iOS. Users must tap a vibe first.

**Issue**: Form submission fails
- **Solution**: Check Formspree Form ID is correct and account active.

**Issue**: Square redirect doesn't work
- **Solution**: Verify Link IDs are correct format (`sq0idp-xxxxx`).

**Issue**: Animations laggy on mobile
- **Solution**: This is expected on very old devices. Animations use CSS GPU acceleration.

### Getting Help
- Formspree support: https://help.formspree.io
- Square support: https://squareup.com/help
- Web Audio API docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 8. Security & Privacy

### Data Handling
- Form data sent via HTTPS to Formspree
- No sensitive data stored locally (except LocalStorage for 24h)
- Square handles all payment processing (PCI compliant)

### GDPR Compliance
- Add privacy policy link if collecting EU customer data
- Formspree provides data processing agreement
- LocalStorage data auto-expires after 24 hours

---

## Quick Reference

**Config File**: `indexx.html` line 1688-1790
**Square Links**: Line 1702-1708
**Audio Files**: Line 1721-1732
**Formspree Form**: Line 1582

---

**Version**: 1.0  
**Last Updated**: 2025

Ready to launch! 🚀

