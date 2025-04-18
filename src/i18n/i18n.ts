import { useEffect, useState } from "react";

// Types
export type Language = "en" | "ru";

// Create a context for the translations
export interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// English translations
export const enTranslations = {
  // Common
  "common.Yes": "Yes",
  "common.No": "No",
  "common.OK": "OK",
  "common.Cancel": "Cancel",
  "common.Search": "Search",
  "common.Submit": "Submit",
  "common.Reset": "Reset",
  "common.Close": "Close",

  // Navigation
  "nav.home": "Home",
  "nav.pricing": "Pricing",
  "nav.documentation": "Documentation",
  "nav.contacts": "Contacts",
  "nav.signin": "Sign In",
  "nav.getApiKey": "Get API Key",
  "nav.profile": "Profile",
  "nav.myProfile": "My Profile",
  "nav.signout": "Sign Out",

  // Profile page
  "profile.tabs.account": "Account",
  "profile.tabs.api": "API Access",
  "profile.tabs.usage": "Usage",
  "profile.accountSettings": "Account Settings",
  "profile.edit": "Edit Profile",
  "profile.changePassword": "Change Password",
  "profile.saveChanges": "Save Changes",
  "profile.cancel": "Cancel",
  "profile.updateSuccess": "Your profile has been updated successfully.",
  "profile.fields.name": "Name",
  "profile.fields.email": "Email",
  "profile.fields.username": "Username (API Key)",
  "profile.fields.currentPassword": "Current Password",
  "profile.fields.newPassword": "New Password",
  "profile.fields.confirmPassword": "Confirm Password",
  "profile.usernameHelp":
    "This username is used as your API key for authenticating API requests.",
  "profile.apiCredentials": "API Credentials",
  "profile.apiKey": "Your API Key",
  "profile.apiKeyDescription":
    "Use the following credential in your API requests to authenticate.",
  "profile.apiKeyNote":
    "Keep this credential secure. Do not share it publicly.",
  "profile.copy": "Copy",
  "profile.copied": "Copied!",
  "profile.apiUsage": "Using Your API",
  "profile.apiExample": "Example Request",
  "profile.fullDocumentation": "Full Documentation",
  "profile.viewDocs": "View API Documentation",
  "profile.usageStats": "Usage Statistics",
  "profile.comingSoon": "Coming Soon!",
  "profile.usageDashboardSoon":
    "Detailed usage statistics and analytics dashboard will be available soon.",
  "profile.currentPlan": "Current Plan",
  "profile.upgradePlan": "Upgrade Plan",
  "profile.usageOverview": "Usage Overview",
  "profile.requestsThisMonth": "Requests This Month",
  "profile.remaining": "remaining",
  "profile.usageReset": "Usage resets on",

  // Profile validation errors
  "profile.errors.nameRequired": "Name is required",
  "profile.errors.emailRequired": "Email is required",
  "profile.errors.emailInvalid": "Please enter a valid email address",
  "profile.errors.usernameRequired": "Username is required",
  "profile.errors.passwordLength":
    "Password must be at least 8 characters long",
  "profile.errors.passwordMismatch": "Passwords do not match",
  "profile.errors.currentPasswordRequired":
    "Current password is required to set a new password",
  "profile.errors.updateFailed": "Failed to update profile. Please try again.",

  // Hero section
  "hero.citiesCount": "47,000+ Cities Worldwide",
  "hero.title": "Search any city,",
  "hero.titleColored": "in any language",
  "hero.subtitle":
    "Empower your applications with our intelligent location API that understands cultural nuances and linguistic variations across the globe.",
  "hero.tryDemo": "Try the Demo",
  "hero.viewDocs": "View Documentation",

  // Demo section
  "demo.badge": "Interactive Experience",
  "demo.title": "Try it",
  "demo.titleColored": " Yourself",
  "demo.subtitle":
    "Experience the power of our API in a dynamic and engaging way. Try it out and see how it works in real-time, right in your browser!",
  "demo.bottomText": "Powering location services worldwide",
  "demo.searchPlaceholder": "Search cities (e.g. New York, Париж, 東京)",

  // Features section
  "features.badge": "Enterprise-Grade Solutions",
  "features.title": "Powerful Features for",
  "features.titleColored": "Global Applications",
  "features.subtitle":
    "Our API is designed to handle multilingual searches with precision and speed, giving your users a seamless experience worldwide.",
  "features.sematic.title": "Semantic Search",
  "features.sematic.description":
    "Intelligent search that understands context and variations in city names across languages and cultural spellings. Our algorithm processes natural language queries and recognizes abbreviations, misspellings, and cultural variants.",
  "features.multilingual.title": "Multilingual Support",
  "features.multilingual.description":
    "Search in any language and find the right location every time. Our API understands 137 languages and various scripts including Latin, Cyrillic, Arabic, Chinese, Japanese, Korean, and many more with built-in transliteration and semantic matching.",
  "features.comprehensive.title": "Comprehensive Database",
  "features.comprehensive.description":
    "Access to 47,000+ cities with detailed location information, updated monthly with the latest geospatial data. Our database includes extensive metadata on longitude, latitude, administrative boundaries, timezone information, and more.",
  "features.development.title": "Developer Friendly",
  "features.development.description":
    "Our API comes with comprehensive documentation and interactive examples. Our playground environment lets you test queries before implementation and includes code snippets for easy integration.",

  // Use Cases section
  "useCases.badge": "Industry Solutions",
  "useCases.title": "Perfect for",
  "useCases.titleColored": "Your Applications",
  "useCases.subtitle":
    "See how WhereIsMyCity can enhance your products across different industries with our specialized location solutions",

  "useCases.keyBenefits.title": "Key Benefits",
  "useCases.travel.title": "Travel Applications",
  "useCases.travel.description":
    "Enable users to search destinations in their preferred language while showing standardized results for a seamless booking experience.",
  "useCases.travel.benefits": [
    "Consistent destination names across multiple languages",
    "Reduce booking errors from misspelled locations",
    "Smart suggestions for nearby attractions",
    "Timezone and local information integration",
  ],
  "useCases.logistics.title": "Logistics & Shipping",
  "useCases.logistics.description":
    "Streamline address entry and location selection for shipping forms and logistics planning with accurate global geo-coding.",
  "useCases.logistics.benefits": [
    "Accurate delivery address validation",
    "Reduced shipping errors and returns",
    "Optimized route planning capabilities",
    "International address format standardization",
  ],

  "useCases.eCommerce.title": "E-commerce Platforms",
  "useCases.eCommerce.description":
    "Improve address entry forms with accurate city suggestions and validation to reduce shipping errors and customer frustration.",
  "useCases.eCommerce.benefits": [
    "Streamlined checkout experience",
    "Lower cart abandonment rates",
    "Improved delivery success rates",
    "International market expansion support",
  ],

  "useCases.analytics.title": "Data Analysis",
  "useCases.analytics.description":
    "Accurately map and visualize location-based data for business intelligence and market research across global markets.",
  "useCases.analytics.benefits": [
    "Unified location data for global reporting",
    "Geospatial visualization tools",
    "Custom region and territory definitions",
    "Market penetration analysis capabilities",
  ],

  "useCases.support.title": "Customer Support",
  "useCases.support.description":
    "Help customer service teams quickly identify and verify user locations regardless of language barriers or spelling variations.",
  "useCases.support.benefits": [
    "Rapid location verification during calls",
    "Multi-language support for global teams",
    "Local service provider recommendations",
    "Customer location history tracking",
  ],

  // Generic button texts
  "button.learnMore": "Learn more",
  "button.getStarted": "Get Started",
  "button.choosePlan": "Choose Plan",

  // Common section titles
  "section.features": "Features",
  "section.demo": "Demo",
  "section.useCase": "Use Cases",
  "section.pricing": "Pricing",
  "section.contact": "Contact",

  // Documentation section
  "docs.badge": "Developer Resources",
  "docs.title": "API",
  "docs.titleColored": "Documentation",
  "docs.subtitle":
    "Everything you need to integrate WhereIsMyCity location search into your applications.",

  // Documentation sidebar
  "docs.sidebar.overview": "Overview",
  "docs.sidebar.authentication": "Authentication",
  "docs.sidebar.search": "Search Endpoint",
  "docs.sidebar.errors": "Error Handling",
  "docs.sidebar.rateLimits": "Rate Limits",

  // Overview section
  "docs.overview.title": "API Overview",
  "docs.overview.description":
    "The WhereIsMyCity API provides a simple and powerful way to search for cities and locations worldwide in multiple languages. This RESTful API supports flexible querying, multilingual inputs, and fuzzy matching to help your applications find the right locations every time.",
  "docs.overview.baseUrl": "Base URL",
  "docs.overview.endpoints": "Available Endpoints",
  "docs.overview.responseFormat": "Response Format",
  "docs.overview.responseFormatDesc":
    "All API responses are returned in JSON format with consistent structures for both successful responses and errors.",
  "docs.overview.authNote":
    "API requests require authentication. See the Authentication section for details.",
  "docs.overview.searchNote": "Search for locations by name in any language",

  // Authentication section
  "docs.auth.title": "Authentication",
  "docs.auth.description":
    "WhereIsMyCity API uses Basic Authentication to authenticate requests. You'll need an API key which should be included in the Authorization header of all requests.",
  "docs.auth.gettingKey": "Getting an API Key",
  "docs.auth.gettingKeyDesc":
    "To get an API key, sign up for an account and visit the API Keys section in your dashboard. Each account comes with a free tier that includes a limited number of requests per month.",
  "docs.auth.usingKey": "Using Your API Key",
  "docs.auth.usingKeyDesc":
    "Include your API key in the Authorization header for all requests:",
  "docs.auth.bestPractices": "Security Best Practices",
  "docs.auth.practice1":
    "Never expose your API key in client-side code or public repositories",
  "docs.auth.practice2":
    "Use environment variables to store your API key in your applications",
  "docs.auth.practice3":
    "Rotate your API keys periodically for enhanced security",
  "docs.auth.practice4": "Restrict API key usage by IP address when possible",
  "docs.auth.getApiKey": "Get Your API Key",

  // Search endpoint section
  "docs.search.title": "Search Endpoint",
  "docs.search.description":
    "The search endpoint allows you to find locations by name, supporting multilingual queries and fuzzy matching for improved results.",
  "docs.search.endpoint": "Endpoint",
  "docs.search.reqParams": "Request Parameters",
  "docs.search.respStructure": "Response Structure",
  "docs.search.codeExamples": "Code Examples",
  "docs.search.apiKeyNote":
    "Remember to replace YOUR_API_KEY with your actual API key in the examples above.",
  "docs.search.queryNote":
    "The search query (min 3 characters and max 100 characters)",
  "docs.search.limitNote": "The maximum number of results (min 1 and max 1000)",
  "docs.search.queryCommentNote": "The original search query",
  "docs.search.limitCommentNote": "The limit parameter used",
  "docs.search.resultNote": "Array of matching locations",
  "docs.search.locationIdNote": "Unique location ID",
  "docs.search.locationCityNote": "City name",
  "docs.search.locationStateNote": "State/province name",
  "docs.search.locationCountryNote": "Country name",
  "docs.search.locationLatNote": "Latitude coordinates",
  "docs.search.locationLngNote": "Longitude coordinates",
  "docs.search.locationVectorNote": "Semantic vector distance (optional)",
  "docs.search.locationScoreNote": "Text match score (optional)",
  "docs.search.locationCombinedScoreNote": "Combined ranking score (optional)",
  "docs.search.additionalLocations": "Additional locations...",

  // Error handling section
  "docs.errors.title": "Error Handling",
  "docs.errors.description":
    "The API uses standard HTTP status codes and returns detailed error messages to help you diagnose and fix issues quickly.",
  "docs.errors.respFormat": "Error Response Format",
  "docs.errors.respFormatDesc":
    "The details field may contain additional information for certain error types, particularly validation errors.",
  "docs.errors.errorCodes": "Common Error Codes",
  "docs.errors.validationExample": "Validation Error Example",
  "docs.errors.codeNote": "String identifying the error type",
  "docs.errors.messageNote": "Error message explaining what went wrong",
  "docs.errors.detailsNote": "Optional object with additional error details",
  "docs.errors.badRequest":
    "The request was malformed or missing required parameters",
  "docs.errors.validation": "One or more parameters failed validation",
  "docs.errors.unauthorized": "API key is missing or invalid",
  "docs.errors.tooManyRequests": "Rate limit exceeded",

  // Rate limits section
  "docs.rateLimits.title": "Rate Limits",
  "docs.rateLimits.description":
    "To ensure fair usage and availability of the API, we apply rate limits based on your subscription plan.",
  "docs.rateLimits.headers": "Rate Limit Headers",
  "docs.rateLimits.subscriptions": "Subscription Plans",
  "docs.rateLimits.exceeded": "Rate Limit Exceeded",
  "docs.rateLimits.bestPractices": "Best Practices",
  "docs.rateLimits.practice1":
    "Implement exponential backoff when handling rate limit errors",
  "docs.rateLimits.practice2": "Cache frequent searches to reduce API calls",
  "docs.rateLimits.practice3": "Monitor your usage through the dashboard",
  "docs.rateLimits.practice4": "Upgrade your plan before you reach your limits",
  "docs.rateLimits.headersDescription":
    "The API includes rate limit information in the response headers:",
  "docs.rateLimits.exceededDescription":
    "When you exceed your rate limit, the API will return a 429 Too Many Requests response:",
  // Table headers
  "docs.table.endpoint": "Endpoint",
  "docs.table.method": "Method",
  "docs.table.description": "Description",
  "docs.table.parameter": "Parameter",
  "docs.table.type": "Type",
  "docs.table.required": "Required",
  "docs.table.httpStatus": "HTTP Status",
  "docs.table.errorCode": "Error Code",
  "docs.table.plan": "Plan",
  "docs.table.requestsMonth": "Requests/Month",
  "docs.table.rateLimit": "Rate Limit",

  // CTA section
  "docs.cta.title": "Ready to Get Started?",
  "docs.cta.subtitle":
    "Create an account now and start integrating the WhereIsMyCity API into your applications today.",
  "docs.cta.getApiKey": "Get Your API Key",
  "docs.cta.viewPlans": "View Pricing Plans",

  // Pricing section
  "pricing.badge": "Launching Special",
  "pricing.title": "Currently",
  "pricing.titleColored": "100% Free",
  "pricing.subtitle":
    "We're just getting started! Enjoy full access to our API at no cost while we grow together.",
  "pricing.free.tag": "Early Access",
  "pricing.free.title": "Unlimited Access",
  "pricing.free.description": "Full API features with no limitations",
  "pricing.free.duration": "/month",
  "pricing.free.noCreditCard": "No credit card required",
  "pricing.free.features": [
    "Full search functionality",
    "Multilingual support (137 languages)",
    "Comprehensive city database",
    "Semantic search capabilities",
    "Detailed location data",
    "Real-time API access",
    "Developer-friendly documentation",
    "Community support forum",
  ],
  "pricing.free.cta": "Get Your API Key",
  "pricing.adopter.title": "Early Adopter Benefits",
  "pricing.adopter.description":
    "Sign up now and be the first to access our API. Early adopters will receive special benefits when we introduce paid plans, including grandfathered pricing and exclusive features.",
  "pricing.adopter.cta": "Join Early Access",

  // Contacts page
  "contacts.badge": "We're Here to Help",
  "contacts.title": "Get in",
  "contacts.titleColored": "Touch",
  "contacts.subtitle":
    "Have questions about our API or need help with implementation? We're just a message away",
  "contacts.info.title": "Contact Information",
  "contacts.info.subtitle":
    "Our team of experts is ready to answer your questions and help you get the most out of our API.",
  "contacts.info.email": "Email Us",
  "contacts.info.phone": "Call Us",
  "contacts.form.title": "Send Us a Message",
  "contacts.form.name": "Your Name",
  "contacts.form.email": "Email Address",
  "contacts.form.company": "Company (Optional)",
  "contacts.form.message": "Message",
  "contacts.form.submit": "Send Message",

  // Auth
  "auth.welcome": "Welcome Back",
  "auth.join": "Join Us Today",
  "auth.error.title": "There was a problem",

  "auth.login.title": "Sign in to your",
  "auth.login.titleColored": "account",
  "auth.login.subtitle":
    "Enter your credentials to access your account and all features.",
  "auth.login.success": "Logged in successfully!",
  "auth.login.redirecting": "Redirecting you to your dashboard...",

  "auth.register.title": "Create your",
  "auth.register.titleColored": "account",
  "auth.register.subtitle":
    "Join thousands of users and start exploring cities around the world.",
  "auth.register.accountInfo": "Account",
  "auth.register.security": "Security",
  "auth.register.success": "Account created successfully!",
  "auth.register.redirecting": "Setting up your account...",

  "auth.form.name": "Full Name",
  "auth.form.email": "Email Address",
  "auth.form.password": "Password",
  "auth.form.confirmPassword": "Confirm Password",
  "auth.form.rememberMe": "Remember me",
  "auth.form.forgotPassword": "Forgot password?",
  "auth.form.login": "Sign In",
  "auth.form.loggingIn": "Signing in...",
  "auth.form.register": "Create Account",
  "auth.form.registering": "Creating account...",
  "auth.form.createAccount": "Create Account",
  "auth.form.next": "Continue",
  "auth.form.back": "Back",
  "auth.form.noAccount": "Don't have an account?",
  "auth.form.registerNow": "Register now",
  "auth.form.haveAccount": "Already have an account?",
  "auth.form.loginNow": "Sign in",

  "auth.validation.nameRequired": "Name is required",
  "auth.validation.emailRequired": "Email is required",
  "auth.validation.emailInvalid": "Please enter a valid email address",
  "auth.validation.passwordRequired": "Password is required",
  "auth.validation.passwordLength": "Password must be at least 8 characters",
  "auth.validation.passwordMatch": "Passwords do not match",
  "auth.validation.passwordWeak": "Weak",
  "auth.validation.passwordFair": "Fair",
  "auth.validation.passwordGood": "Good",
  "auth.validation.passwordStrong": "Strong",
  "auth.validation.passwordTooWeak": "Password is too weak",
  "auth.validation.min8Chars": "At least 8 characters",
  "auth.validation.upperCase": "At least one uppercase letter",
  "auth.validation.numbers": "At least one number",
  "auth.validation.specialChar": "At least one special character",

  "auth.security.title": "Protected by industry-standard security practices.",
  "auth.security.learnMore": "Learn more",

  "auth.terms.agreementPrefix": "By creating an account, you agree to our",
  "auth.terms.termsOfService": "Terms of Service",
  "auth.terms.and": "and",
  "auth.terms.privacyPolicy": "Privacy Policy",
};

// Russian translations
export const ruTranslations = {
  // Common
  "common.Yes": "Да",
  "common.No": "Нет",
  "common.OK": "ОК",
  "common.Cancel": "Отмена",
  "common.Search": "Поиск",
  "common.Submit": "Отправить",
  "common.Reset": "Сбросить",
  "common.Close": "Закрыть",

  // Navigation
  "nav.home": "Главная",
  "nav.pricing": "Цены",
  "nav.documentation": "Документация",
  "nav.contacts": "Контакты",
  "nav.signin": "Войти",
  "nav.getApiKey": "Получить API ключ",
  "nav.myProfile": "Мой профиль",
  "nav.signout": "Выйти",

  // Profile page
  "profile.tabs.account": "Аккаунт",
  "profile.tabs.api": "Доступ к API",
  "profile.tabs.usage": "Использование",
  "profile.accountSettings": "Настройки аккаунта",
  "profile.edit": "Редактировать профиль",
  "profile.changePassword": "Сменить пароль",
  "profile.saveChanges": "Сохранить изменения",
  "profile.cancel": "Отмена",
  "profile.updateSuccess": "Профиль успешно обновлён.",
  "profile.fields.name": "Имя",
  "profile.fields.email": "Электронная почта",
  "profile.fields.username": "Имя пользователя (API ключ)",
  "profile.fields.currentPassword": "Текущий пароль",
  "profile.fields.newPassword": "Новый пароль",
  "profile.fields.confirmPassword": "Подтвердите пароль",
  "profile.usernameHelp":
    "Это имя пользователя используется в качестве вашего API ключа для аутентификации запросов.",
  "profile.apiCredentials": "API Учетные данные",
  "profile.apiKey": "Ваш API ключ",
  "profile.apiKeyDescription":
    "Используйте этот ключ в своих API-запросах для аутентификации.",
  "profile.apiKeyNote":
    "Храните этот ключ в безопасности. Не делитесь им публично.",
  "profile.copy": "Копировать",
  "profile.copied": "Скопировано!",
  "profile.apiUsage": "Использование API",
  "profile.apiExample": "Пример запроса",
  "profile.fullDocumentation": "Полная документация",
  "profile.viewDocs": "Посмотреть документацию по API",
  "profile.usageStats": "Статистика использования",
  "profile.comingSoon": "Скоро будет!",
  "profile.usageDashboardSoon":
    "Подробная статистика использования и аналитическая панель скоро будут доступны.",
  "profile.currentPlan": "Текущий тариф",
  "profile.upgradePlan": "Обновить тариф",
  "profile.usageOverview": "Обзор использования",
  "profile.requestsThisMonth": "Запросов в этом месяце",
  "profile.remaining": "осталось",
  "profile.usageReset": "Сброс использования произойдёт",

  // Hero section
  "hero.citiesCount": "47 000+ городов по всему миру",
  "hero.title": "Найдите любой город,",
  "hero.titleColored": "на любом языке",
  "hero.subtitle":
    "Интегрируйте наш интеллектуальный API локаций, понимающий культурные особенности и языковые различия по всему миру.",
  "hero.tryDemo": "Попробовать демо",
  "hero.viewDocs": "Посмотреть документацию",

  // Demo section
  "demo.badge": "Интерактивный опыт",
  "demo.title": "Попробуйте",
  "demo.titleColored": " сами",
  "demo.subtitle":
    "Оцените мощь нашего API в действии. Попробуйте прямо в браузере в реальном времени!",
  "demo.bottomText": "Обеспечиваем геосервисы по всему миру",
  "demo.searchPlaceholder": "Поиск городов (например, New York, Париж, 東京)",

  // Features section
  "features.badge": "Корпоративные решения",
  "features.title": "Мощные функции для",
  "features.titleColored": "глобальных приложений",
  "features.subtitle":
    "Наш API точно и быстро обрабатывает многоязычные запросы, обеспечивая бесперебойную работу для пользователей по всему миру.",
  "features.sematic.title": "Семантический поиск",
  "features.sematic.description":
    "Интеллектуальный поиск, учитывающий контекст, написание и культурные варианты названий. Обрабатывает естественные запросы, опечатки и аббревиатуры.",
  "features.multilingual.title": "Многоязычная поддержка",
  "features.multilingual.description":
    "Ищите на любом языке и получайте точные результаты. Поддержка 137 языков и различных письменностей с транслитерацией и семантическим сопоставлением.",
  "features.comprehensive.title": "Полная база данных",
  "features.comprehensive.description":
    "Доступ к 47 000+ городов с детальной информацией, ежемесячными обновлениями и геоданными: координаты, границы, часовой пояс и другое.",
  "features.development.title": "Удобен для разработчиков",
  "features.development.description":
    "Полная документация и примеры. Песочница позволяет тестировать запросы с кодом для быстрой интеграции.",

  // Use Cases section
  "useCases.badge": "Решения для отраслей",
  "useCases.title": "Идеально для",
  "useCases.titleColored": "ваших приложений",
  "useCases.subtitle":
    "Узнайте, как WhereIsMyCity улучшает продукты в различных сферах с помощью геолокационных решений",

  "useCases.keyBenefits.title": "Ключевые преимущества",
  "useCases.travel.title": "Путешествия",
  "useCases.travel.description":
    "Позвольте пользователям искать направления на родном языке и получать стандартизированные результаты.",
  "useCases.travel.benefits": [
    "Единые названия городов на всех языках",
    "Снижение ошибок при бронировании",
    "Умные подсказки достопримечательностей",
    "Интеграция часовых поясов и локальной информации",
  ],
  "useCases.logistics.title": "Логистика и доставка",
  "useCases.logistics.description":
    "Автоматизируйте ввод адресов и планирование маршрутов с точными геоданными.",
  "useCases.logistics.benefits": [
    "Проверка адресов доставки",
    "Снижение ошибок и возвратов",
    "Оптимизация маршрутов",
    "Поддержка международных форматов адресов",
  ],

  "useCases.eCommerce.title": "Электронная коммерция",
  "useCases.eCommerce.description":
    "Улучшите формы ввода адресов точными подсказками и валидацией.",
  "useCases.eCommerce.benefits": [
    "Упрощенный процесс оформления заказа",
    "Меньше отказов от покупки",
    "Повышение успешности доставки",
    "Поддержка выхода на международные рынки",
  ],

  "useCases.analytics.title": "Аналитика данных",
  "useCases.analytics.description":
    "Точное отображение и анализ данных по местоположению для бизнес-аналитики и исследований рынка.",
  "useCases.analytics.benefits": [
    "Единые данные по локациям",
    "Геопространственная визуализация",
    "Настраиваемые регионы и территории",
    "Анализ охвата рынка",
  ],

  "useCases.support.title": "Поддержка клиентов",
  "useCases.support.description":
    "Помогите службе поддержки быстро определять местоположение клиентов независимо от языка или ошибок в написании.",
  "useCases.support.benefits": [
    "Быстрая проверка адреса при звонке",
    "Многоязычная поддержка",
    "Рекомендации местных провайдеров",
    "Отслеживание истории геолокации клиентов",
  ],

  // Generic button texts
  "button.learnMore": "Узнать больше",
  "button.getStarted": "Начать",
  "button.choosePlan": "Выбрать тариф",

  // Common section titles
  "section.features": "Функции",
  "section.demo": "Демо",
  "section.useCase": "Примеры использования",
  "section.pricing": "Цены",
  "section.contact": "Контакты",

  // Documentation section
  "docs.badge": "Ресурсы для разработчиков",
  "docs.title": "API",
  "docs.titleColored": "Документация",
  "docs.subtitle":
    "Все необходимое для интеграции поиска локаций WhereIsMyCity в ваши приложения.",

  // Documentation sidebar
  "docs.sidebar.overview": "Обзор",
  "docs.sidebar.authentication": "Аутентификация",
  "docs.sidebar.search": "Поисковый эндпоинт",
  "docs.sidebar.errors": "Обработка ошибок",
  "docs.sidebar.rateLimits": "Ограничения",

  // Overview section
  "docs.overview.title": "Обзор API",
  "docs.overview.description":
    "API WhereIsMyCity — это мощный и простой способ искать города и локации по всему миру на разных языках.",
  "docs.overview.baseUrl": "Базовый URL",
  "docs.overview.endpoints": "Доступные эндпоинты",
  "docs.overview.responseFormat": "Формат ответа",
  "docs.overview.responseFormatDesc":
    "Все ответы API приходят в формате JSON с единообразной структурой.",
  "docs.overview.authNote":
    "Запросы требуют аутентификации. Подробнее в разделе «Аутентификация».",
  "docs.overview.searchNote": "Ищите локации по названию на любом языке",

  // Authentication section
  "docs.auth.title": "Аутентификация",
  "docs.auth.description":
    "API WhereIsMyCity использует базовую аутентификацию. Необходим API ключ в заголовке Authorization.",
  "docs.auth.gettingKey": "Получение ключа",
  "docs.auth.gettingKeyDesc":
    "Зарегистрируйтесь и получите API ключ в личном кабинете. Бесплатный тариф доступен всем.",
  "docs.auth.usingKey": "Использование ключа",
  "docs.auth.usingKeyDesc":
    "Включите ключ в заголовок Authorization всех запросов:",
  "docs.auth.bestPractices": "Лучшие практики безопасности",
  "docs.auth.practice1": "Никогда не размещайте ключ в открытом доступе",
  "docs.auth.practice2": "Используйте переменные окружения для хранения ключа",
  "docs.auth.practice3": "Регулярно обновляйте ключи",
  "docs.auth.practice4": "Ограничивайте доступ по IP",
  "docs.auth.getApiKey": "Получить API ключ",

  // Search endpoint section
  "docs.search.title": "Эндпоинт поиска",
  "docs.search.description":
    "Позволяет находить локации по названию с поддержкой языков и неточного совпадения.",
  "docs.search.endpoint": "Эндпоинт",
  "docs.search.reqParams": "Параметры запроса",
  "docs.search.respStructure": "Структура ответа",
  "docs.search.codeExamples": "Примеры кода",
  "docs.search.apiKeyNote":
    "Замените YOUR_API_KEY на ваш реальный ключ в примерах выше.",
  "docs.search.queryNote": "Поисковый запрос (от 3 до 100 символов)",
  "docs.search.limitNote": "Максимум результатов (1–1000)",
  "docs.search.queryCommentNote": "Оригинальный поисковый запрос",
  "docs.search.limitCommentNote": "Параметр limit",
  "docs.search.resultNote": "Массив подходящих локаций",
  "docs.search.locationIdNote": "Уникальный ID локации",
  "docs.search.locationCityNote": "Название города",
  "docs.search.locationStateNote": "Название штата/региона",
  "docs.search.locationCountryNote": "Название страны",
  "docs.search.locationLatNote": "Широта",
  "docs.search.locationLngNote": "Долгота",
  "docs.search.locationVectorNote": "Семантическая дистанция (опц.)",
  "docs.search.locationScoreNote": "Оценка соответствия (опц.)",
  "docs.search.locationCombinedScoreNote": "Сводный балл (опц.)",
  "docs.search.additionalLocations": "Дополнительные локации...",

  // Error handling section
  "docs.errors.title": "Обработка ошибок",
  "docs.errors.description":
    "Используются стандартные HTTP коды и подробные сообщения об ошибках.",
  "docs.errors.respFormat": "Формат ответа с ошибкой",
  "docs.errors.respFormatDesc":
    "Поле `details` может содержать доп. информацию, особенно при валидации.",
  "docs.errors.errorCodes": "Распространенные коды ошибок",
  "docs.errors.validationExample": "Пример ошибки валидации",
  "docs.errors.codeNote": "Тип ошибки",
  "docs.errors.messageNote": "Сообщение об ошибке",
  "docs.errors.detailsNote": "Дополнительные данные (опц.)",
  "docs.errors.badRequest": "Некорректный или неполный запрос",
  "docs.errors.validation": "Ошибка валидации параметров",
  "docs.errors.unauthorized": "Неверный или отсутствующий ключ",
  "docs.errors.tooManyRequests": "Превышен лимит запросов",

  // Rate limits section
  "docs.rateLimits.title": "Ограничения",
  "docs.rateLimits.description":
    "Для справедливого использования применяются лимиты в зависимости от тарифа.",
  "docs.rateLimits.headers": "Заголовки ограничений",
  "docs.rateLimits.subscriptions": "Тарифные планы",
  "docs.rateLimits.exceeded": "Превышение лимита",
  "docs.rateLimits.bestPractices": "Рекомендации",
  "docs.rateLimits.practice1":
    "Используйте экспоненциальные паузы при ошибке 429",
  "docs.rateLimits.practice2": "Кешируйте частые запросы",
  "docs.rateLimits.practice3": "Следите за использованием в личном кабинете",
  "docs.rateLimits.practice4": "Обновляйте тариф до достижения лимита",
  "docs.rateLimits.headersDescription":
    "Ответы API содержат информацию о лимитах:",
  "docs.rateLimits.exceededDescription":
    "При превышении лимита будет возвращен код 429 Too Many Requests",

  // Table headers
  "docs.table.endpoint": "Эндпоинт",
  "docs.table.method": "Метод",
  "docs.table.description": "Описание",
  "docs.table.parameter": "Параметр",
  "docs.table.type": "Тип",
  "docs.table.required": "Обязательный",
  "docs.table.httpStatus": "HTTP статус",
  "docs.table.errorCode": "Код ошибки",
  "docs.table.plan": "Тариф",
  "docs.table.requestsMonth": "Запросов/мес",
  "docs.table.rateLimit": "Лимит запросов",

  // CTA section
  "docs.cta.title": "Готовы начать?",
  "docs.cta.subtitle":
    "Создайте аккаунт и начните интеграцию WhereIsMyCity уже сегодня.",
  "docs.cta.getApiKey": "Получить API ключ",
  "docs.cta.viewPlans": "Посмотреть тарифы",

  // Pricing section
  "pricing.badge": "Стартовое предложение",
  "pricing.title": "Сейчас",
  "pricing.titleColored": "100% бесплатно",
  "pricing.subtitle":
    "Мы только начинаем! Полный доступ к API без ограничений.",
  "pricing.free.tag": "Ранний доступ",
  "pricing.free.title": "Безлимитный доступ",
  "pricing.free.description": "Полный функционал API без ограничений",
  "pricing.free.duration": "/мес",
  "pricing.free.noCreditCard": "Без банковской карты",
  "pricing.free.features": [
    "Полный поиск",
    "Поддержка 137 языков",
    "Обширная база городов",
    "Семантический поиск",
    "Подробные данные о локации",
    "Доступ в реальном времени",
    "Документация для разработчиков",
    "Форум сообщества",
  ],
  "pricing.free.cta": "Получить ключ",
  "pricing.adopter.title": "Преимущества раннего доступа",
  "pricing.adopter.description":
    "Присоединяйтесь сейчас и получите эксклюзивные условия при запуске платных тарифов.",
  "pricing.adopter.cta": "Присоединиться",

  // Contacts page
  "contacts.badge": "Мы на связи",
  "contacts.title": "Свяжитесь с",
  "contacts.titleColored": "нами",
  "contacts.subtitle": "Есть вопросы по API или нужна помощь? Напишите нам.",
  "contacts.info.title": "Контактная информация",
  "contacts.info.subtitle":
    "Наша команда экспертов готова помочь вам на любом этапе.",
  "contacts.info.email": "Написать на email",
  "contacts.info.phone": "Позвонить нам",
  "contacts.form.title": "Написать нам",
  "contacts.form.name": "Ваше имя",
  "contacts.form.email": "Email",
  "contacts.form.company": "Компания (необязательно)",
  "contacts.form.message": "Сообщение",
  "contacts.form.submit": "Отправить сообщение",

  // Auth
  "auth.welcome": "С возвращением",
  "auth.join": "Присоединяйтесь сегодня",
  "auth.error.title": "Произошла ошибка",

  "auth.login.title": "Войдите в свой",
  "auth.login.titleColored": "аккаунт",
  "auth.login.subtitle":
    "Введите свои данные для входа и доступа ко всем функциям.",
  "auth.login.success": "Вы успешно вошли!",
  "auth.login.redirecting": "Перенаправляем на панель управления...",

  "auth.register.title": "Создайте",
  "auth.register.titleColored": "аккаунт",
  "auth.register.subtitle":
    "Присоединяйтесь к тысячам пользователей и начните исследовать города по всему миру.",
  "auth.register.accountInfo": "Аккаунт",
  "auth.register.security": "Безопасность",
  "auth.register.success": "Аккаунт успешно создан!",
  "auth.register.redirecting": "Настраиваем ваш аккаунт...",

  "auth.form.name": "Полное имя",
  "auth.form.email": "Электронная почта",
  "auth.form.password": "Пароль",
  "auth.form.confirmPassword": "Подтвердите пароль",
  "auth.form.rememberMe": "Запомнить меня",
  "auth.form.forgotPassword": "Забыли пароль?",
  "auth.form.login": "Войти",
  "auth.form.loggingIn": "Вход...",
  "auth.form.register": "Создать аккаунт",
  "auth.form.registering": "Создание аккаунта...",
  "auth.form.createAccount": "Создать аккаунт",
  "auth.form.next": "Далее",
  "auth.form.back": "Назад",
  "auth.form.noAccount": "Нет аккаунта?",
  "auth.form.registerNow": "Зарегистрируйтесь сейчас",
  "auth.form.haveAccount": "Уже есть аккаунт?",
  "auth.form.loginNow": "Войти",

  "auth.validation.nameRequired": "Имя обязательно",
  "auth.validation.emailRequired": "Электронная почта обязательна",
  "auth.validation.emailInvalid": "Введите корректный адрес электронной почты",
  "auth.validation.passwordRequired": "Пароль обязателен",
  "auth.validation.passwordLength": "Пароль должен быть не менее 8 символов",
  "auth.validation.passwordMatch": "Пароли не совпадают",
  "auth.validation.passwordWeak": "Слабый",
  "auth.validation.passwordFair": "Средний",
  "auth.validation.passwordGood": "Хороший",
  "auth.validation.passwordStrong": "Сильный",
  "auth.validation.passwordTooWeak": "Пароль слишком слабый",
  "auth.validation.min8Chars": "Минимум 8 символов",
  "auth.validation.upperCase": "Минимум одна заглавная буква",
  "auth.validation.numbers": "Минимум одна цифра",
  "auth.validation.specialChar": "Минимум один специальный символ",

  "auth.security.title": "Защищено по отраслевым стандартам безопасности.",
  "auth.security.learnMore": "Узнать больше",

  "auth.terms.agreementPrefix": "Создавая аккаунт, вы соглашаетесь с нашими",
  "auth.terms.termsOfService": "Условиями использования",
  "auth.terms.and": "и",
  "auth.terms.privacyPolicy": "Политикой конфиденциальности",
};
