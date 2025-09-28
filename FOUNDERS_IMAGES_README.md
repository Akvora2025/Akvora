# Founders Profile Images

To complete the Founders section, please add the following high-quality profile images to the `/public/images/` directory:

## Required Images:
- `karthik.jpg` - Profile photo of Karthik R. (Co-Founder & CEO)
- `aravind.jpg` - Profile photo of Aravind S. (Co-Founder & CTO)
- `dushyanth.jpg` - Profile photo of Dushyanth M. (Co-Founder & COO)

## Image Requirements:
- **Format**: JPG or PNG
- **Size**: 400x400px minimum (square aspect ratio)
- **Quality**: High resolution, professional headshots
- **Background**: Uniform style, preferably transparent or same background
- **Style**: Professional, clean, consistent lighting

## Current Implementation:
The Founders component currently shows placeholder initials. Once you add the actual images, uncomment the `<img>` tag in `/src/components/Founders.jsx` and comment out the placeholder div.

## File Structure:
```
public/
├── images/
│   ├── karthik.jpg
│   ├── aravind.jpg
│   └── dushyanth.jpg
└── vite.svg
```

The images will be automatically loaded at:
- `/images/karthik.jpg`
- `/images/aravind.jpg`
- `/images/dushyanth.jpg`