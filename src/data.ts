export interface Section {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

export const sections: Section[] = [
  {
    id: "intro",
    title: "Project စတင်ခြင်း",
    content: `
### Prompt:
\`\`\`
AI Prompt Generator website တစ်ခု လုပ်ပေးပါ။
- Dark theme, modern UI
- Myanmar language support ပါရမယ်
- Category တွေ ရွေးလို့ရရမယ် (Coding, Writing, Marketing, Education, Business, Creative, Data, General)
- Tone ရွေးလို့ရရမယ် (Professional, Casual, Technical, Creative, Persuasive, Educational)
- Topic နဲ့ Context ထည့်ပြီး Prompt generate လုပ်လို့ရရမယ်
- Starry background animation ပါရမယ်
\`\`\`

> **ရလဒ်**: Basic project structure, dark theme, starry background animation, PromptGenerator component
    `
  },
  {
    id: "auth",
    title: "Authentication System",
    content: `
### Prompt:
\`\`\`
User authentication system ထည့်ပေးပါ။
- Email နဲ့ signup/login လုပ်လို့ရရမယ်
- Password reset functionality ပါရမယ်
- Protected routes - login မလုပ်ရသေးရင် redirect လုပ်ပေးရမယ်
- User profile system ထည့်ပေးပါ
\`\`\`

### Follow-up Prompt:
\`\`\`
Change password feature ထည့်ပေးပါ - logged in user က password ပြောင်းလို့ရအောင်
\`\`\`

> **ရလဒ်**: Auth pages, ProtectedRoute component, useAuth hook, ChangePasswordModal, ForgotPasswordModal
    `
  },
  {
    id: "core",
    title: "Prompt Generator Core",
    content: `
### Prompt:
\`\`\`
Gemini AI API သုံးပြီး prompt generate လုပ်ပေးတဲ့ edge function ရေးပေးပါ။
- User ရဲ့ topic, category, tone, context ကို ယူပြီး professional prompt တစ်ခု generate လုပ်ပေးရမယ်
- Myanmar language နဲ့ English နှစ်မျိုးလုံး support လုပ်ရမယ်
\`\`\`

### Follow-up Prompt:
\`\`\`
Generate ပြီးတဲ့ prompt ကို copy button နှိပ်ပြီး clipboard ကို copy ကူးလို့ရအောင် လုပ်ပေးပါ
\`\`\`

> **ရလဒ်**: generate-prompt edge function, PromptOutput component with copy functionality
    `
  },
  {
    id: "coding-tab",
    title: "Coding Prompt Tab",
    content: `
### Prompt:
\`\`\`
Coding Prompt tab တစ်ခု သီးသန့်ထည့်ပေးပါ။
- Programming language ရွေးလို့ရရမယ် (Python, JavaScript, TypeScript, React, etc.)
- Framework ရွေးလို့ရရမယ်
- Code type ရွေးလို့ရရမယ် (Function, Class, API, Full Project, etc.)
- Coding-specific prompt generate လုပ်ပေးရမယ်
\`\`\`

> **ရလဒ်**: CodingPromptTab component with language/framework/type selectors
    `
  },
  {
    id: "image-tab",
    title: "Image Prompt Tab",
    content: `
### Prompt:
\`\`\`
AI Image generation အတွက် prompt ရေးပေးတဲ့ tab ထည့်ပေးပါ။
- Style ရွေးလို့ရရမယ် (Realistic, Anime, Digital Art, Oil Painting, etc.)
- Size ရွေးလို့ရရမယ်
- Image description ရေးပြီး optimized prompt ထုတ်ပေးရမယ်
- Midjourney, DALL-E, Stable Diffusion တွေအတွက် prompt format ထုတ်ပေးရမယ်
\`\`\`

> **ရလဒ်**: ImagePromptTab, StyleSelector, SizeSelector components
    `
  },
  {
    id: "video-tab",
    title: "Video Prompt Tab",
    content: `
### Prompt:
\`\`\`
AI Video generation tools (Runway, Pika, Sora) တွေအတွက် prompt ရေးပေးတဲ့ tab ထည့်ပေးပါ။
- Video style ရွေးလို့ရရမယ်
- Duration, camera movement, mood ရွေးလို့ရရမယ်
- Myanmar dialogue support ပါရမယ်
\`\`\`

> **ရလဒ်**: VideoPromptTab component with video-specific options
    `
  },
  {
    id: "img-gen",
    title: "Image Generator Tab",
    content: `
### Prompt:
\`\`\`
AI Image ကို တိုက်ရိုက် generate လုပ်ပေးတဲ့ tab ထည့်ပေးပါ။
- Description ရေးပြီး image generate လုပ်ပေးရမယ်
- Generated image ကို download လုပ်လို့ရရမယ်
- Edge function နဲ့ image generation API ချိတ်ဆက်ပေးပါ
\`\`\`

> **ရလဒ်**: ImageGeneratorTab component, generate-image edge function
    `
  },
  {
    id: "ad-poster",
    title: "Ad Poster Generator",
    content: `
### Prompt:
\`\`\`
Advertising poster/banner အတွက် prompt generate လုပ်ပေးတဲ့ tab ထည့်ပေးပါ။
- Product/Service name ထည့်ရမယ်
- Target audience ရွေးလို့ရရမယ်
- Poster style ရွေးလို့ရရမယ်
- Marketing-focused prompt ထုတ်ပေးရမယ်
\`\`\`

> **ရလဒ်**: AdPosterTab component
    `
  },
  {
    id: "img-to-prompt",
    title: "Image to Prompt Tab",
    content: `
### Prompt:
\`\`\`
Image upload လုပ်ပြီး AI ကနေ prompt ပြန်ထုတ်ပေးတဲ့ tab ထည့်ပေးပါ။
- Image drag & drop / file upload ရရမယ်
- AI က image ကို analyze လုပ်ပြီး prompt ပြန်ရေးပေးရမယ်
- Prompt ကို copy ကူးလို့ရရမယ်
\`\`\`

> **ရလဒ်**: ImageToPromptTab component, image-to-prompt edge function
    `
  },
  {
    id: "execute",
    title: "Execute (AI Answer) Feature",
    content: `
### Prompt:
\`\`\`
Prompt generate လုပ်ပြီးတဲ့အခါ "Generate + Execute" button ထည့်ပေးပါ။
- Prompt ကို generate လုပ်ပြီး AI ကနေ တိုက်ရိုက် result/answer ထုတ်ပေးရမယ်
- "Prompt Generate မယ်" button က prompt ပဲ ထုတ်ပေးမယ်
- "Generate + Execute" button က prompt generate ပြီး AI answer ပါ ထုတ်ပေးမယ်
- Button ၂ ခု ရဲ့ ကွာခြားချက်ကို ရှင်းပြတဲ့ description ထည့်ပေးပါ
\`\`\`

> **ရလဒ်**: execute-prompt edge function, dual button UI, executed result display
    `
  },
  {
    id: "uiux",
    title: "UI/UX Improvements",
    content: `
### Prompt:
\`\`\`
Tab navigation system ထည့်ပေးပါ - tab တွေအကုန်လုံးကို တစ်နေရာတည်းမှာ switch လုပ်လို့ရအောင်
\`\`\`

### Follow-up Prompts:
\`\`\`
Glass morphism effect ထည့်ပေးပါ
\`\`\`

\`\`\`
Light mode ပြောင်းလိုက်ရင် စာတွေ မှန်သွားတယ် - light mode မှာ contrast ပိုကောင်းအောင် fix ပေးပါ
\`\`\`

\`\`\`
Starry background animation ကို ပိုလှအောင် improve လုပ်ပေးပါ
\`\`\`

> **ရလဒ်**: TabNav component, glass effects, theme improvements, StarryBackground component
    `
  },
  {
    id: "how-to",
    title: "How To Use Guide",
    content: `
Feature တွေ အသုံးပြုနည်း ရှင်းပြတဲ့ "အသုံးပြုနည်း" tab ထည့်ပေးပါ။
- Tab တစ်ခုချင်းစီရဲ့ အသုံးပြုပုံကို ရှင်းပြပေးရမယ်
- Myanmar language နဲ့ ရေးပေးပါ
- Step by step guide ဖြစ်ရမယ်

> **ရလဒ်**: HowToUseTab component with comprehensive guide
    `
  },
  {
    id: "admin",
    title: "Admin Panel",
    content: `
### Prompt:
\`\`\`
Admin panel ထည့်ပေးပါ။
- Admin role ရှိတဲ့ user ပဲ access ရရမယ်
- Usage logs ကြည့်လို့ရရမယ်
- User management လုပ်လို့ရရမယ်
\`\`\`

> **ရလဒ်**: Admin page, user_roles table, is_admin function, usage_logs table
    `
  },
  {
    id: "seo",
    title: "SEO & Branding",
    content: `
### Prompt:
\`\`\`
Browser Tab မှာ "ZTH Coder" လို့ နာမည် ပြောင်းပေးပါ
\`\`\`

\`\`\`
SEO meta tags တွေ ထည့်ပေးပါ - title, description, og tags
\`\`\`

> **ရလဒ်**: Updated index.html with proper meta tags and branding
    `
  },
  {
    id: "api-integration",
    title: "API Integration & Edge Functions",
    content: `
ဒီ section မှာ AI API တွေနဲ့ ဘယ်လို ချိတ်ဆက်ခဲ့တယ်ဆိုတာကို အသေးစိတ် ရှင်းပြထားပါတယ်။

### 📌 API Architecture Overview

ဒီ project မှာ **Dual-Mode API System** သုံးထားပါတယ်:
1. **User ကိုယ်ပိုင် API Key** (Gemini / OpenRouter) — ဦးစားပေး အသုံးပြုမယ်
2. **Lovable AI Gateway** — Fallback (user key မရှိရင် / error ဖြစ်ရင်)

\`\`\`
User Request → Edge Function → User API Key ရှိလား? 
                                    ├── ရှိရင် → User Key နဲ့ ကြိုးစား
                                    │            ├── အဆင်ပြေ → Result ပြန်
                                    │            └── Error (401/403) → Lovable AI Fallback
                                    └── မရှိရင် → Lovable AI Gateway
\`\`\`

### 🔑 User API Key Setup Guide

| Provider | API Key Format | ဘာအတွက်သုံးလဲ | Free Tier |
|----------|---------------|---------------|-----------|
| **Gemini** | \`AIza...\` | Prompt generate, Execute, Image-to-Prompt | ✅ ရှိတယ် |
| **OpenRouter** | \`sk-or-...\` | Multiple AI models access | ❌ Credit လိုတယ် |

### 🛠️ API Key ရယူနည်း

**Gemini API Key ရယူနည်း:**
1. [Google AI Studio](https://aistudio.google.com/) သို့သွားပါ
2. Google Account နဲ့ Sign In လုပ်ပါ
3. "Get API Key" ကို Click ပါ
4. "Create API Key" နှိပ်ပါ
5. Key ကို Copy ယူပါ (AIza... နဲ့ စတယ်)

**OpenRouter API Key ရယူနည်း:**
1. [OpenRouter.ai](https://openrouter.ai/) သို့သွားပါ
2. Account ဖန်တီးပြီး Sign In လုပ်ပါ
3. Settings > API Keys သို့သွားပါ
4. "Create Key" နှိပ်ပါ
5. Key ကို Copy ယူပါ (sk-or-... နဲ့ စတယ်)
    `
  },
  {
    id: "use-case-guide",
    title: "Coding Prompt - Use Case Guide",
    content: `
ဒီ section မှာ **Coding Prompt Generator** ထဲက Use Case တစ်ခုချင်းစီကို ဘယ်အချိန်မှာ ဘယ်လိုသုံးရမလဲဆိုတာ အသေးစိပ်ရှင်းပြထားပါတယ်။

### 📋 Use Cases Overview

| Use Case | ဘယ်အချိန်သုံးမလဲ | Example Scenario |
|----------|------------------|------------------|
| 🚀 Feature တည်ဆောက် | Feature အသစ်ရေးမယ် | Login system, Dashboard, Payment |
| 🐛 Debug / Fix | Bug ရှာပြီးပြင်မယ် | Error ဖြေရှင်း, Crash fix |
| ♻️ Refactor | Code ပိုကောင်းအောင်ပြင်မယ် | Code cleanup, Performance improve |
| 🔗 API Integration | External API ချိတ်မယ် | Stripe, Google Maps, OpenAI |
| 🗄️ Database Design | DB structure ရေးမယ် | Schema design, Complex queries |
| 🔐 Authentication | Login/Auth system | JWT, OAuth, Role-based access |
| 🧪 Testing | Test ရေးမယ် | Unit test, Integration test |
| 📦 Deployment | Deploy/DevOps | Docker, CI/CD, Cloud setup |
| ⚡ Optimization | Performance ပိုကောင်းအောင် | Speed up, Memory optimize |
| 🏗️ Architecture | System design | Microservices, Monolith structure |
| 🎨 UI Component | UI/UX component | Button, Modal, Form components |
| 🧮 Algorithm | Algorithm ရေးမယ် | Sorting, Searching, Data structures |

---

### 🚀 Feature တည်ဆောက် (Build Feature)

**ဘယ်အချိန်သုံးမလဲ?**
- Application မှာ **feature အသစ်** ထည့်ချင်တဲ့အခါ
- **New module** တစ်ခုလုံး ရေးချင်တဲ့အခါ
- **MVP (Minimum Viable Product)** တည်ဆောက်ချင်တဲ့အခါ

**Example Scenarios:**
\`\`\`
✅ "User registration and login system ရေးမယ်"
✅ "E-commerce shopping cart feature ထည့်မယ်"
✅ "Real-time chat feature ရေးမယ်"
✅ "Dashboard with charts and analytics ရေးမယ်"
✅ "File upload system ရေးမယ်"
\`\`\`

### 🐛 Debug / Fix

**ဘယ်အချိန်သုံးမလဲ?**
- **Error/Bug** ရှာဖို့ လိုတဲ့အခါ
- Code ကို **run လို့မရ**တဲ့အခါ
- **Unexpected behavior** ဖြစ်နေတဲ့အခါ

**Example Scenarios:**
\`\`\`
✅ "TypeError: Cannot read property 'x' of undefined ဆိုပြီး error တက်နေတယ်"
✅ "API call က 500 error ပြန်နေတယ်"
\`\`\`
    `
  }
];
