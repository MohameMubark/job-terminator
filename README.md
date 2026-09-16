# Job Terminator

مُساعد آلي للبحث عن الوظائف على ويندوز — يبحث عنك في مواقع التوظيف وتيليجرام، يطابق الفرص مع بياناتك، يولّد سيرة ذاتية مخصصة لكل وظيفة، ويُرسل طلب التقديم من إيميلك الشخصي وواتساب.

Automated job-search assistant for Windows. Scrapes job sites + Telegram, matches against your CV, generates a tailored ATS-friendly resume per job, and sends applications from your own Gmail and WhatsApp.

- 🔍 Searches job sites (Wuzzuf, Bayt, LinkedIn, Naukrigulf, GulfTalent, ...) and your Telegram groups
- 🎯 Scores every job against your CV
- 📝 Generates a tailored AI resume per job (your own Gemini key)
- ✉️ Sends applications from **your** Gmail; optional WhatsApp Web sending
- 🔒 Config encrypted (AES-256) and bound to your PC + license
- 🔑 RSA-signed offline license, machine-locked — the app does nothing before a valid key
- 🌐 **دعم كامل للعربية** — واجهة عربية + OCR للنصوص العربية في صور تيليجرام

## Quick start (users)

1. Download `JobTerminatorSetup.exe` from **Releases**.
2. Run it once, note your **Machine Code**, request a license key from the seller.
3. Paste the key → fill your data once in Settings → run daily.
   Full steps: see the **دليل المستخدم** below.

## What's bundled in the installer

Clients install one EXE — no Python, no libraries, no OCR needed:

- Python 3.13 + PySide6, Selenium (+ selenium-manager), Pandas, reportlab, google client libs
- **Tesseract OCR + English & Arabic traineddata** (for Telegram image OCR)
- Base CV template, license system

---

## دليل المستخدم

برنامج أتمتة البحث عن وظائف: يبحث عنك في مواقع التوظيف ومواقع تيليجرام، يطابق فرص العمل مع بياناتك، يولّد سيرة ذاتية مخصصة لكل وظيفة، ثم يرسل طلب التقديم من إيميلك الشخصي.

### 1) متطلبات التشغيل (على جهاز العميل)

لا تحتاج تثبيت أي برنامج إضافي. ملف التثبيت يضمّ كل شيء تلقائيًا:

| المتطلب | هل يحتاج العميل تثبيته؟ |
| --- | --- |
| ويندوز 10/11 (64-bit) | نعم — نظام التشغيل نفسه |
| اتصال إنترنت | نعم — للبحث والإرسال والتوليد |
| متصفح Microsoft Edge أو Google Chrome | يُفضَّل — يُستخدم للبحث والواتساب ويب |
| Python أو أي مكتبة (PySide6, Selenium...) | لا — مدمجة داخل البرنامج |
| محرك OCR (Tesseract) عربي/إنجليزي | لا — مدمج داخل البرنامج |
| رقم هاتف تيليجرام مع API_ID/API_HASH | حسب استخدامك لميزة تيليجرام فقط |

> كل المكتبات (Python, PySide6, Selenium, Pandas, Tesseract مع اللغة العربية والإنجليزية) مدمجة في ملف التثبيت. التثبيت للمستخدم الحالي فقط ولا يحتاج صلاحيات مدير النظام.

### 2) التثبيت

1. حمّل `JobTerminatorSetup.exe` وافتحه.
2. اضغط **Install** وانتظر حتى يكتمل.
3. سيظهر اختصار **Job Terminator** على سطح المكتب وفي قائمة Start.

### 3) التفعيل (أول مرة)

1. افتح البرنامج — سيظهر **كود الآلة (Machine Code)** مثل `504B47E706ADF8CE`.
2. انسخ الكود وارسله إلى البائع عبر واتساب للحصول على **مفتاح الترخيص**.
3. الصق مفتاح الترخيص في البرنامج واضغط Enter.
4. البرنامج لا يعمل إطلاقًا قبل إدخال ترخيص صالح — وهذا مقصود لحماية المبيعات.

### 4) الإعدادات (مرة واحدة)

من شاشة **الإعدادات** داخل البرنامج أدخل:

- بريدك الإلكتروني (يُسجَّل مرة واحدة).
- مفتاح Gemini الخاص بك (من Google AI Studio) لتوليد السيرة الذاتية.
- بيانات إيميل الإرسال: **كلمة مرور التطبيق** من إعدادات جوجل (يُفضَّل)، أو **Google OAuth** بأن تستورد ملف `credentials.json` الخاص بك.
- بيانات تيليجرام (API_ID / API_HASH / الهاتف) ومجموعات الوظائف.
- الكلمات المفتاحية والمواقع (مثال: `planning engineer` — مصر).

> **طريقة احترافية للتسجيل بجوجل:** بجانب "تسجيل الدخول بجوجل" أزرار زرقاء:
> **"How to get Google credentials"** يفتح الخطوات + لوحة Google Cloud في متصفحك، ثم اختر **Import credentials.json** واستورد ملفك. وبجانب تيليجرام زر **"How to get Telegram API credentials"** يفتح `my.telegram.org` مباشرة.

اضغط **حفظ** — تُخزَّن كل البيانات **مشفّرة AES-256** ومرتبطة بجهازك وترخيصك فقط.

### 5) الاستخدام اليومي

1. افتح البرنامج (الترخيص يُتحقق تلقائيًا — لا إدخال يومي).
2. شغّل **البحث** — يجمع الوظائف في قاعدة البيانات المحلية.
3. راجع النتائج، ثم شغّل **المطابقة + التوليد + الإرسال**.
4. يُرسل التقديم من إيميلك، وعبر واتساب ويب إن رغبت (يُمسح QR مرة واحدة).

### 6) ملاحظات وحدود مقصودة

- المفتاح يعمل على **جهازك فقط**. النقل لجهاز آخر يحتاج مفتاحًا جديدًا من البائع.
- الإرسال محدود لكل تشغيل وبفواصل زمنية طويلة — لحماية حسابك من الحظر.
- تغيير البريد المسجَّل بعد أول تسجيل مرفوض — تواصل مع البائع لإعادة الضبط.
- أغلق البرنامج دائمًا من زر الإغلاق العادي — عند الإغلاق الطبيعي تُعاد حماية الإعدادات تلقائيًا.

### 7) حل المشكلات السريعة

| المشكلة | الحل |
| --- | --- |
| البرنامج يطلب مفتاحًا رغم إدخاله | تأكد أن المفتاح يخص هذا الجهاز بالضبط |
| البحث لا يعرض نتائج | تأكد من الاتصال بالإنترنت وحدّث الصفحة من داخل البرنامج |
| الإرسال لا يعمل | تحقق من إيميل الإرسال وكلمة المرور في الإعدادات |
| فشل التعرف على النصوص العربية من الصور | تأكد أن ملف التثبيت هو أحدث نسخة (تدعم العربية داخل تيليجرام) |

---

لمساعدة إضافية أو مفتاح جديد: تواصل مع البائع عبر واتساب.

---

**Website (sales page):** hosted on GitHub Pages (or `www.jobterminator.ai` once the domain is set) — the installer and site are published from this repo's **Releases** and **Pages**.