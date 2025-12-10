-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" VARCHAR(50) NOT NULL DEFAULT 'USER',
    "tier" VARCHAR(50) NOT NULL DEFAULT 'free',
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "stripeCustomerId" VARCHAR(255),
    "notificationEmail" BOOLEAN DEFAULT true,
    "notificationPush" BOOLEAN DEFAULT false,
    "notificationWeekly" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "dashboard_apps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "apiKey" VARCHAR(255) NOT NULL,
    "webhookUrl" VARCHAR(500),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dashboard_apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "licenses" (
    "id" TEXT NOT NULL,
    "appId" TEXT,
    "userId" TEXT,
    "productId" TEXT,
    "licenseKey" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "expiresAt" TIMESTAMP(3),
    "metadata" TEXT,
    "price" DOUBLE PRECISION,
    "stripePaymentIntentId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dashboard_api_usage_logs" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "endpoint" VARCHAR(200) NOT NULL,
    "method" VARCHAR(10) NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "responseTime" INTEGER,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboard_api_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dashboard_webhook_events" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "eventType" VARCHAR(100) NOT NULL,
    "payload" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastAttempt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dashboard_webhook_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(10) NOT NULL DEFAULT 'USD',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_webhooks" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "events" TEXT[],
    "secret" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "api_webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_webhook_logs" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "eventType" VARCHAR(100) NOT NULL,
    "payload" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "statusCode" INTEGER,
    "response" TEXT,
    "error" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_webhook_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "source" TEXT,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unsubscribedAt" TIMESTAMP(3),

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "company" VARCHAR(200),
    "subject" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "inquiryType" VARCHAR(100) NOT NULL DEFAULT 'General Inquiry',
    "status" TEXT NOT NULL DEFAULT 'new',
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "image" VARCHAR(500),
    "readTime" VARCHAR(50),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_comments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "author" VARCHAR(200) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" VARCHAR(45),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_articles" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "categorySlug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "content" TEXT NOT NULL,
    "readTime" VARCHAR(50),
    "views" INTEGER NOT NULL DEFAULT 0,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "notHelpful" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "help_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "help_categories" (
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(100),
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "help_categories_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "popular_help_articles" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "views" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "popular_help_articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_positions" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "department" VARCHAR(100) NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "requirements" TEXT[],
    "benefits" TEXT[],
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "currency" VARCHAR(10) DEFAULT 'USD',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "applications" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "closedAt" TIMESTAMP(3),

    CONSTRAINT "career_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_applications" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "resumeUrl" VARCHAR(500),
    "coverLetter" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "career_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" VARCHAR(500) NOT NULL,
    "answer" TEXT NOT NULL,
    "category" VARCHAR(100),
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL DEFAULT 0,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "referrer" VARCHAR(500),
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "country" VARCHAR(2),
    "city" VARCHAR(100),
    "device" VARCHAR(50),
    "browser" VARCHAR(100),
    "os" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_logs" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "recipient" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(500) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "error" TEXT,
    "resendId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(100) NOT NULL,
    "value" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL DEFAULT 'string',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" VARCHAR(200),

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'investigating',
    "affectedServices" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_statuses" (
    "id" TEXT NOT NULL,
    "serviceName" VARCHAR(200) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "responseTime" INTEGER,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uptime" DOUBLE PRECISION NOT NULL DEFAULT 100.0,
    "category" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_status_history" (
    "id" TEXT NOT NULL,
    "serviceName" VARCHAR(200) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "responseTime" INTEGER,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_tier_idx" ON "users"("tier");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE INDEX "users_stripeCustomerId_idx" ON "users"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_sessionToken_idx" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "dashboard_apps_apiKey_key" ON "dashboard_apps"("apiKey");

-- CreateIndex
CREATE INDEX "dashboard_apps_userId_idx" ON "dashboard_apps"("userId");

-- CreateIndex
CREATE INDEX "dashboard_apps_apiKey_idx" ON "dashboard_apps"("apiKey");

-- CreateIndex
CREATE INDEX "dashboard_apps_active_idx" ON "dashboard_apps"("active");

-- CreateIndex
CREATE UNIQUE INDEX "licenses_licenseKey_key" ON "licenses"("licenseKey");

-- CreateIndex
CREATE INDEX "licenses_appId_idx" ON "licenses"("appId");

-- CreateIndex
CREATE INDEX "licenses_userId_idx" ON "licenses"("userId");

-- CreateIndex
CREATE INDEX "licenses_productId_idx" ON "licenses"("productId");

-- CreateIndex
CREATE INDEX "licenses_licenseKey_idx" ON "licenses"("licenseKey");

-- CreateIndex
CREATE INDEX "licenses_status_idx" ON "licenses"("status");

-- CreateIndex
CREATE INDEX "licenses_email_idx" ON "licenses"("email");

-- CreateIndex
CREATE INDEX "licenses_expiresAt_idx" ON "licenses"("expiresAt");

-- CreateIndex
CREATE INDEX "dashboard_api_usage_logs_appId_idx" ON "dashboard_api_usage_logs"("appId");

-- CreateIndex
CREATE INDEX "dashboard_api_usage_logs_createdAt_idx" ON "dashboard_api_usage_logs"("createdAt");

-- CreateIndex
CREATE INDEX "dashboard_api_usage_logs_endpoint_idx" ON "dashboard_api_usage_logs"("endpoint");

-- CreateIndex
CREATE INDEX "dashboard_webhook_events_appId_idx" ON "dashboard_webhook_events"("appId");

-- CreateIndex
CREATE INDEX "dashboard_webhook_events_status_idx" ON "dashboard_webhook_events"("status");

-- CreateIndex
CREATE INDEX "dashboard_webhook_events_createdAt_idx" ON "dashboard_webhook_events"("createdAt");

-- CreateIndex
CREATE INDEX "api_products_active_idx" ON "api_products"("active");

-- CreateIndex
CREATE INDEX "api_products_createdAt_idx" ON "api_products"("createdAt");

-- CreateIndex
CREATE INDEX "api_webhooks_active_idx" ON "api_webhooks"("active");

-- CreateIndex
CREATE INDEX "api_webhooks_url_idx" ON "api_webhooks"("url");

-- CreateIndex
CREATE INDEX "api_webhook_logs_webhookId_idx" ON "api_webhook_logs"("webhookId");

-- CreateIndex
CREATE INDEX "api_webhook_logs_status_idx" ON "api_webhook_logs"("status");

-- CreateIndex
CREATE INDEX "api_webhook_logs_createdAt_idx" ON "api_webhook_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_key" ON "newsletter_subscriptions"("email");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_email_idx" ON "newsletter_subscriptions"("email");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_status_idx" ON "newsletter_subscriptions"("status");

-- CreateIndex
CREATE INDEX "newsletter_subscriptions_createdAt_idx" ON "newsletter_subscriptions"("createdAt");

-- CreateIndex
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions"("email");

-- CreateIndex
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions"("status");

-- CreateIndex
CREATE INDEX "contact_submissions_inquiryType_idx" ON "contact_submissions"("inquiryType");

-- CreateIndex
CREATE INDEX "contact_submissions_createdAt_idx" ON "contact_submissions"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_author_idx" ON "blog_posts"("author");

-- CreateIndex
CREATE INDEX "blog_posts_category_idx" ON "blog_posts"("category");

-- CreateIndex
CREATE INDEX "blog_posts_published_publishedAt_idx" ON "blog_posts"("published", "publishedAt");

-- CreateIndex
CREATE INDEX "blog_posts_featured_idx" ON "blog_posts"("featured");

-- CreateIndex
CREATE INDEX "blog_comments_postId_idx" ON "blog_comments"("postId");

-- CreateIndex
CREATE INDEX "blog_comments_approved_idx" ON "blog_comments"("approved");

-- CreateIndex
CREATE INDEX "blog_comments_createdAt_idx" ON "blog_comments"("createdAt");

-- CreateIndex
CREATE INDEX "help_articles_categorySlug_idx" ON "help_articles"("categorySlug");

-- CreateIndex
CREATE INDEX "help_articles_published_idx" ON "help_articles"("published");

-- CreateIndex
CREATE INDEX "help_articles_views_idx" ON "help_articles"("views");

-- CreateIndex
CREATE UNIQUE INDEX "help_articles_categorySlug_slug_key" ON "help_articles"("categorySlug", "slug");

-- CreateIndex
CREATE INDEX "help_categories_order_idx" ON "help_categories"("order");

-- CreateIndex
CREATE INDEX "help_categories_published_idx" ON "help_categories"("published");

-- CreateIndex
CREATE INDEX "popular_help_articles_articleId_idx" ON "popular_help_articles"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "career_positions_slug_key" ON "career_positions"("slug");

-- CreateIndex
CREATE INDEX "career_positions_slug_idx" ON "career_positions"("slug");

-- CreateIndex
CREATE INDEX "career_positions_department_idx" ON "career_positions"("department");

-- CreateIndex
CREATE INDEX "career_positions_published_featured_idx" ON "career_positions"("published", "featured");

-- CreateIndex
CREATE INDEX "career_positions_createdAt_idx" ON "career_positions"("createdAt");

-- CreateIndex
CREATE INDEX "career_applications_positionId_idx" ON "career_applications"("positionId");

-- CreateIndex
CREATE INDEX "career_applications_email_idx" ON "career_applications"("email");

-- CreateIndex
CREATE INDEX "career_applications_status_idx" ON "career_applications"("status");

-- CreateIndex
CREATE INDEX "career_applications_createdAt_idx" ON "career_applications"("createdAt");

-- CreateIndex
CREATE INDEX "faqs_category_idx" ON "faqs"("category");

-- CreateIndex
CREATE INDEX "faqs_published_order_idx" ON "faqs"("published", "order");

-- CreateIndex
CREATE INDEX "page_views_path_idx" ON "page_views"("path");

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "page_views"("createdAt");

-- CreateIndex
CREATE INDEX "page_views_country_idx" ON "page_views"("country");

-- CreateIndex
CREATE INDEX "email_logs_type_idx" ON "email_logs"("type");

-- CreateIndex
CREATE INDEX "email_logs_recipient_idx" ON "email_logs"("recipient");

-- CreateIndex
CREATE INDEX "email_logs_status_idx" ON "email_logs"("status");

-- CreateIndex
CREATE INDEX "email_logs_createdAt_idx" ON "email_logs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings"("key");

-- CreateIndex
CREATE INDEX "site_settings_key_idx" ON "site_settings"("key");

-- CreateIndex
CREATE INDEX "incidents_status_idx" ON "incidents"("status");

-- CreateIndex
CREATE INDEX "incidents_createdAt_idx" ON "incidents"("createdAt");

-- CreateIndex
CREATE INDEX "service_statuses_serviceName_idx" ON "service_statuses"("serviceName");

-- CreateIndex
CREATE INDEX "service_statuses_status_idx" ON "service_statuses"("status");

-- CreateIndex
CREATE INDEX "service_statuses_category_idx" ON "service_statuses"("category");

-- CreateIndex
CREATE INDEX "service_statuses_lastChecked_idx" ON "service_statuses"("lastChecked");

-- CreateIndex
CREATE UNIQUE INDEX "service_statuses_serviceName_key" ON "service_statuses"("serviceName");

-- CreateIndex
CREATE INDEX "service_status_history_serviceName_checkedAt_idx" ON "service_status_history"("serviceName", "checkedAt");

-- CreateIndex
CREATE INDEX "service_status_history_checkedAt_idx" ON "service_status_history"("checkedAt");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dashboard_apps" ADD CONSTRAINT "dashboard_apps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_appId_fkey" FOREIGN KEY ("appId") REFERENCES "dashboard_apps"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_productId_fkey" FOREIGN KEY ("productId") REFERENCES "api_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_webhook_logs" ADD CONSTRAINT "api_webhook_logs_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "api_webhooks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "help_articles" ADD CONSTRAINT "help_articles_categorySlug_fkey" FOREIGN KEY ("categorySlug") REFERENCES "help_categories"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_applications" ADD CONSTRAINT "career_applications_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "career_positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
