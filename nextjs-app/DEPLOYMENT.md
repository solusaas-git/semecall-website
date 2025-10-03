# Semecall Website - Deployment Guide

## Quick Start

The website is now ready to run! You can start the development server with:

```bash
cd nextjs-app
npm run dev
```

Then open http://localhost:3000 in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Copy `.env.example` to `.env.local` and configure if needed:

```bash
cp .env.example .env.local
```

## Production Deployment

### Option 1: Vercel (Recommended)

Vercel is the easiest deployment option for Next.js:

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
cd nextjs-app
vercel
```

3. Follow the prompts to link your project
4. Your site will be live at `your-project.vercel.app`

**Custom Domain:**
- Go to your Vercel dashboard
- Add your custom domain (e.g., semecall.com)
- Update DNS records as instructed

### Option 2: Docker

1. Create `Dockerfile` in `nextjs-app/`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

2. Build and run:

```bash
docker build -t semecall-website .
docker run -p 3000:3000 semecall-website
```

### Option 3: Traditional Server (VPS/Dedicated)

1. **Prepare the server:**
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

2. **Upload your code:**
```bash
# On your local machine
cd nextjs-app
npm run build

# Upload to server (via SCP, Git, etc.)
scp -r . user@your-server:/var/www/semecall
```

3. **On the server:**
```bash
cd /var/www/semecall
npm ci --production
npm run build

# Start with PM2
pm2 start npm --name "semecall" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx as reverse proxy:**

```nginx
server {
    listen 80;
    server_name semecall.com www.semecall.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d semecall.com -d www.semecall.com
```

### Option 4: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
cd nextjs-app
netlify deploy --prod
```

## Email Service Integration

To make the contact form send emails, integrate with an email service:

### SendGrid Integration

1. Install package:
```bash
npm install @sendgrid/mail
```

2. Update `app/api/contact/route.ts`:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const msg = {
    to: 'contact@semecall.com',
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${body.message}</p>
    `,
  };
  
  await sgMail.send(msg);
  
  return NextResponse.json({ success: true });
}
```

3. Add to `.env.local`:
```
SENDGRID_API_KEY=your_api_key
SENDGRID_FROM_EMAIL=contact@semecall.com
```

## Performance Optimization

The site is already optimized, but for additional improvements:

1. **Image Optimization:**
   - Use Next.js `Image` component for all images
   - Convert images to WebP format
   - Use appropriate image sizes

2. **Caching:**
   - Configure CDN (Vercel includes this automatically)
   - Set appropriate cache headers

3. **Analytics:**
   - Add Google Analytics or Plausible
   - Monitor Core Web Vitals

## Post-Deployment Checklist

- [ ] Test all three language versions (FR, EN, NL)
- [ ] Test contact form submission
- [ ] Verify all navigation links work
- [ ] Test on mobile devices
- [ ] Check page load speed (use PageSpeed Insights)
- [ ] Verify SEO meta tags (use view-source)
- [ ] Test cross-browser compatibility
- [ ] Set up analytics
- [ ] Configure email notifications
- [ ] Add SSL certificate
- [ ] Test smooth scrolling on all sections
- [ ] Verify GDPR compliance

## Monitoring

Set up monitoring to track:
- Uptime (UptimeRobot, Pingdom)
- Performance (Google PageSpeed, Lighthouse)
- Errors (Sentry)
- Analytics (Google Analytics, Plausible)

## Support

For issues or questions:
- Email: contact@semecall.com
- Check the README.md for detailed documentation

## Updates

To update the website:

1. Make changes locally
2. Test thoroughly: `npm run dev`
3. Build: `npm run build`
4. Deploy using your chosen method above

## Backup

Regular backups recommended:
- Code: Use Git (GitHub, GitLab, etc.)
- Form submissions: If storing in a database, backup regularly
- Environment variables: Keep secure copies

