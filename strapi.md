Strapi implementation notes

This branch implements Strapi as the content management system for the Events hosted by the community.

## Setup Strapi connection details
Rename the env.example file to .env and fill the required variables.
PUBLIC_STRAPI_API_URL=your_strapi_url # Without /api/ 
STRAPI_API_TOKEN=your_strapi_token

**Note**: The STRAPI_API_TOKEN can be found in the Strapi admin panel under Settings > API Tokens. Verify that the token only has read permissions to the `eventos` collection.

## Automatic Vercel Deployments on Strapi Changes

To automatically trigger Vercel deployments when content is published in Strapi:

### 1. Create a Deploy Hook in Vercel
1. Go to your Vercel project dashboard
2. Navigate to Settings > Git > Deploy Hooks
3. Click "Create Hook"
4. Configure the hook:
   - Name: `Strapi Content Update`
   - Branch: `main` (or your production branch)
   - Build & Development Settings: Use default settings
5. Copy the generated webhook URL

### 2. Set Up Webhook in Strapi
1. Log in to your Strapi admin panel
2. Go to Settings > Webhooks
3. Click "Add new webhook"
4. Configure the webhook:
   - Name: `Vercel Deploy`
   - URL: Paste the Vercel webhook URL
   - Headers: No headers needed
   - Trigger on: 
     - Entry publish
     - Entry unpublish
     - Entry delete
   - Collections: Select `eventos`
5. Click "Save"

### 3. Test the Integration
1. In Strapi, make a small change to an event and publish it
2. Check your Vercel dashboard - you should see a new deployment triggered
3. Verify the changes are reflected on your live site after deployment

### Security Considerations
- The webhook URL contains a secret token - never commit it to version control
- In Strapi, ensure the webhook is only triggered for the `eventos` collection
- Consider setting up IP allowlisting in Vercel for additional security
- Use environment variables in production to store the webhook URL 