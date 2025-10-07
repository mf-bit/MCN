const generateImage = (text: string) => `data:image/svg+xml;base64,${Buffer.from(`
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#000000"/>
  <text x="512" y="512" font-family="Arial" font-size="128" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>
`).toString('base64')}`;

// Generate icons
const icon = generateImage('MBC');
const adaptive = generateImage('MBC');
const splash = generateImage('MBC');
const favicon = generateImage('M');

export { icon, adaptive, splash, favicon };