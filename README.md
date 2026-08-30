# EchoStory™ — Interactive Musical Tribute Storefront

> **Turn stories into songs. Create musical tributes that last forever.**

[![Version](https://img.shields.io/badge/version-1.0-gold)](https://github.com/aerovista-us/echostory)
[![License](https://img.shields.io/badge/license-Proprietary-red)](LICENSE)

EchoStory is a premium interactive web storefront for ordering custom musical tributes. Customers can explore different musical vibes, select packages, and build personalized EchoVerse experiences through an engaging 5-step wizard.

---

## 🎵 Features

### Interactive Elements
- **Vibe Sampler Wheel** — Spin to discover musical styles
- **Audio Morphing Slider** — Crossfade between 5 different vibes with Web Audio API
- **Live Audio Previews** — 10 different musical styles with smooth playback
- **Memory Builder** — Interactive form to capture traits, decades, and special moments
- **"Hear Their Name" Easter Egg** — Text-to-speech preview feature

### Premium UX
- **5-Step Wizard** with smooth transitions and progress tracking
- **Theme System** — Dynamic color palettes based on occasion (birthday, anniversary, memorial, etc.)
- **Occasion-Specific Effects** — Confetti, bokeh, and candle animations
- **Bundle Reveal Animations** — Staggered entrance with bounce effects
- **Upsell Chips** — Tap-to-add quick upgrade options
- **Live Subtotal Calculator** — Real-time pricing with animated counting

### Package Tiers
- **Mini** — $79 (1 micro-song)
- **Classic** — $179 (3 songs)
- **Signature** — $349 (5 songs with extras)
- **Legacy** — $649 (7 custom songs)
- **Eternal Legacy Suite** — $9,999 (unlimited songs, documentary, book)

### Technical Highlights
- Premium Web Audio API crossfading (700ms smooth transitions)
- CSS-based multi-layer animated backgrounds
- Full accessibility (ARIA labels, keyboard navigation)
- Mobile-responsive design (tested on iOS/Android)
- LocalStorage persistence (24-hour session memory)
- Square Payment Integration ready
- Formspree form submission

---

## 🚀 Quick Start

### Prerequisites
- Web server with HTTPS support (required for audio and payments)
- Square account for payment processing
- Formspree account for form submissions
- Audio preview files (10 MP3s, 15-30 seconds each)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aerovista-us/echostory.git
   cd echostory
   ```

2. **Configure Square Payment Links**
   - Edit `config.js` (`squareLinks` for each package)
   - See [docs/SQUARE.md](docs/SQUARE.md) and [docs/SETUP.md](docs/SETUP.md)

3. **Configure Formspree**
   - Set `formspreeFormId` in `config.js`
   - Get your ID from [formspree.io/forms](https://formspree.io/forms)

4. **Audio preview files**
   - Already in `/audio/` on this repo; filenames must match `audioPreviews` in `index.html`
   - See [docs/SETUP.md](docs/SETUP.md#3-audio-preview-files)

5. **Deploy**
   - Upload to your web server
   - Ensure HTTPS is enabled
   - Test on multiple browsers and devices

---

## 📁 File Structure

```
echostory/
├── index.html              # Storefront (wizard + landing)
├── config.js               # Formspree, Square Link IDs, Umami website ID
├── analytics.js            # Umami funnel events (enter / nav / exit)
├── config.example.js       # Same shape, for copy/paste
├── audio/                  # Vibe previews + mini-player MP3s
├── images/                 # Landing / education art
├── docs/
│   ├── README.md           # Docs index
│   ├── SETUP.md
│   ├── SQUARE.md
│   ├── UMAMI.md
│   └── TESTING-SUMMARY.md  # 2025-11-16 live-test snapshot
├── SOT.json                # AeroVista source-of-truth manifest
└── README.md
```

---

## 🛠️ Configuration

### Required Configurations

1. **Square Payment Links** — `config.js` → `squareLinks`  
   [SQUARE.md](docs/SQUARE.md)

2. **Formspree** — `config.js` → `formspreeFormId`  
   [SETUP.md](docs/SETUP.md#2-formspree)

3. **Audio Preview Files** (10 files)
   - Upload MP3s to `/audio/` directory
   - [Full instructions →](docs/SETUP.md#3-audio-preview-files)

### Optional Configurations
- Update package pricing (HTML + Square)
- Customize color themes (CSS variables)
- Modify animation timings
- Add/remove vibes

See [docs/SETUP.md](docs/SETUP.md) for complete configuration guide.

---

## 🧪 Testing Checklist

Before launching, test:

- ✅ All 10 audio previews load and play
- ✅ Vibe wheel spins and selects
- ✅ Audio morphing slider crossfades smoothly
- ✅ All 6 occasions change themes correctly
- ✅ Package recommendations update based on scale
- ✅ Bundle reveal animation plays
- ✅ Upsell chips add correct addons
- ✅ Subtotal calculates accurately
- ✅ Form validation prevents empty submission
- ✅ Memory builder captures data
- ✅ Square redirect works for all packages
- ✅ Formspree receives complete form data
- ✅ Mobile responsiveness on real devices
- ✅ Browser compatibility (Chrome, Firefox, Safari, Edge)

Full testing guide: [docs/SETUP.md](docs/SETUP.md#5-testing)

---

## 🌐 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile Safari (iOS 14+) ✅
- Mobile Chrome (Android 10+) ✅

**Note**: Web Audio API requires user interaction on iOS (expected behavior).

---

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly buttons (44x44px minimum)
- Vibe wheel scales at 480px and 380px breakpoints
- Audio controls optimized for mobile
- No horizontal scroll on any device

---

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels on all interactive elements
- Dynamic `aria-pressed` states on buttons
- Screen reader announcements for selections
- High contrast audio player controls
- Focus indicators on all focusable elements

---

## 🔒 Security & Privacy

- All form data sent via HTTPS
- Square handles payment processing (PCI compliant)
- LocalStorage data expires after 24 hours
- No sensitive data stored on client
- Formspree provides data processing agreement

---

## 📊 Analytics Integration

Ready for analytics tracking. Add your preferred solution:
- Google Analytics 4
- Mixpanel
- Segment
- Custom tracking

Track events:
- Step progression
- Package selections
- Add-on choices
- Form submissions
- Audio interactions

---

## 🚢 Deployment Options

### GitHub Pages (current)
```bash
git push origin master
# Pages serves this repo at https://aerovista-us.github.io/echostory/
```

### Netlify (Free tier)
```bash
# Connect repository or drag-and-drop
# Auto-deploy on git push
```

### Custom Server
- Upload files via FTP/SFTP
- Ensure HTTPS enabled
- Set MIME types: `.mp3` → `audio/mpeg`

[Full deployment guide →](docs/SETUP.md#5-deployment)

---

## 🐛 Troubleshooting

### Audio doesn't play on iOS
**Solution**: Audio requires user interaction on iOS. Users must tap a vibe first.

### Form submission fails
**Solution**: Verify Formspree Form ID is correct format: `https://formspree.io/f/YOUR_ID`

### Square redirect doesn't work
**Solution**: Check Link IDs are format `sq0idp-xxxxx` and links are active in Square dashboard.

[More troubleshooting →](docs/SETUP.md#7-support--troubleshooting)

---

## 📈 Version History

### v1.0 (2025-11-15)
- ✅ Premium Web Audio API crossfading
- ✅ Complete wizard flow (5 steps)
- ✅ Memory Builder interactive form
- ✅ Square payment integration
- ✅ Formspree form submission
- ✅ Mobile-responsive UX
- ✅ Enhanced accessibility (ARIA)
- ✅ Complete documentation

---

## 🤝 Support

For configuration help, see [docs/SETUP.md](docs/SETUP.md)

For Square support: [squareup.com/help](https://squareup.com/help)

For Formspree support: [help.formspree.io](https://help.formspree.io)

---

## 📄 License

Proprietary - © 2025 AeroVista / EchoVerse

All rights reserved. This storefront is for EchoStory™ business use only.

---

## 🎨 Credits

Built by the AeroVista team for EchoVerse  
Design: Premium interactive wizard  
Audio: Web Audio API integration  
Payments: Square API  
Forms: Formspree integration

---

**Ready to launch your EchoStory™ storefront?**  
Follow the [Setup Guide](docs/SETUP.md) to configure and deploy! 🚀

