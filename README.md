# 📥 Job Terminator — Automated Job Application Assistant

**English:** Automates your job-hunting: it searches job sites & Telegram groups
**on your behalf**, matches openings with your profile, generates a tailored
resume for each job, and sends the application from **your** Gmail.

**العربية:** يؤتمت البحث عن الوظائف: **البحث بدلاً منك** في مواقع التوظيف وجروبات
تيليجرام، يطابق الفرص مع بياناتك، يولّد سيرة ذاتية مخصصة لكل وظيفة، ويُرسل طلب
التقديم من **إيميلك** الشخصي.

---

## 🌍 Choose your language / اختر لغتك

- English 👉 continue reading below (English section)
- العربية 👉 انتقل لقسم العربية أسفل هذا القسم

---

## 🚀 English

### What it does

- 🔍 Searches job sites (Wuzzuf, Bayt, LinkedIn, Naukrigulf, GulfTalent, ...) and your **Telegram groups**
- 🎯 Scores every job against your CV (configurable match threshold)
- 📝 Generates a tailored ATS-friendly resume per job (your own Gemini key)
- ✉️ Sends applications from **your** Gmail; optional WhatsApp Web sending
- 🔒 Config encrypted (AES-256) and bound to your PC + license
- 🔑 RSA-signed offline license, machine-locked — the app does nothing without a valid key
- 🌐 Full Arabic support — Arabic UI + OCR for Arabic text in Telegram images

### Quick start

1. Download `JobTerminatorSetup.exe` from **Releases** below.
2. Run it once, copy your **Machine Code**, and contact the seller for a license key.
3. Paste the key → fill Settings once → run daily. (Full guide: Arabic section below.)

### System requirements

| Requirement | Does the client install it? |
| --- | --- |
| Windows 10 / 11 (64-bit) | Yes — the OS itself |
| Internet connection | Yes — for search & sending |
| Microsoft Edge or Google Chrome | Preferred — used for search & WhatsApp Web |
| Python, PySide6, Selenium, ... | **No** — bundled in the installer |
| Tesseract OCR (Arabic/English) | **No** — bundled in the installer |
| Telegram phone + API_ID/API_HASH | Only if you use the Telegram feature |

### What's bundled in the installer

One EXE — no Python, no libraries, no OCR installs:

- Python 3.13 + PySide6, Selenium, Pandas, reportlab, Google client libs
- Tesseract OCR + English & Arabic traineddata
- Base CV template & license system

### License / ownership

**Job Terminator** is proprietary software owned by the developer. It is
distributed under a machine-locked offline license — see the **[LICENSE](LICENSE)**
file. Redistribution, resale, decompiling, or bypassing the license protection is
prohibited.

---

## 🌍 العربية

### ماذا يفعل البرنامج

- 🔍 يبحث **بدلاً منك** في مواقع التوظيف وجروبات تيليجرام الخاصة بك
- 🎯 يقيّم كل وظيفة على حدة نسبةً لسيرتك الذاتية (مع عتبة مطابقة قابلة للضبط)
- 📝 يولّد سيرة ذاتية مخصصة لكل وظيفة (بمفتاح Gemini الخاص بك)
- ✉️ يُرسل طلبات التقديم من **إيميلك** Gmail؛ مع خاصية إرسال اختيارية عبر واتساب ويب
- 🔒 ملف الإعدادات مشفّر (AES-256) ومرتبط بجهازك وترخيصك
- 🔑 ترخيص أوفلاين موقّع رقمياً ومرتبط بجهاز واحد — لا يعمل البرنامج قبل مفتاح صالح
- 🌐 دعم كامل للعربية — واجهة عربية + OCR للعربية في الصور داخل تيليجرام

### التثبيت

1. حمّل `JobTerminatorSetup.exe` من **Releases** بالأسفل.
2. افتحه واضغط **Install** — سيظهر اختصار **Job Terminator** على سطح المكتب.

### التفعيل (أول مرة)

1. افتح البرنامج — سيظهر **كود الآلة (Machine Code)**.
2. أرسل الكود للبائع عبر واتساب لتحصل على **مفتاح الترخيص**.
3. الصق المفتاح واضغط Enter — البرنامج لا يعمل قبل ترخيص صالح (مقصود لحماية المبيعات).

### الإعدادات (مرة واحدة)

من شاشة **الإعدادات**: البريد الإلكتروني، مفتاح Gemini، بيانات إيميل الإرسال
**(كلمة مرور التطبيق يُفضَّل — أو Google OAuth بملف credentials.json الخاص بك)**،
بيانات تيليجرام ومجموعات الوظائف، والكلمات المفتاحية والمواقع. اضغط **حفظ** —
تُخزَّن مشفّرة ومرتبطة بجهازك بترخيصك فقط.

> بجانب زر "تسجيل الدخول بجوجل" اوجد زر **"How to get Google credentials"** الذي
> يفتح لك الخطوات كاملة، وكذلك زر **"How to get Telegram API credentials"** بجانب
> تيليجرام يفتح my.telegram.org مباشرة.

### الاستخدام اليومي

افتح البرنامج (ترخيصك يُتأكد تلقائياً) ← شغّل **البحث** ← راجع النتائج ← شغّل
**المطابقة + التوليد + الإرسال**.

### حل المشكلات السريعة

| المشكلة | الحل |
| --- | --- |
| يطلب مفتاحاً رغم إدخاله | تأكد أن المفتاح يخص هذا الجهاز بالضبط |
| البحث لا يعرض نتائج | تحقق من الإنترنت وحدّث الصفحة من داخل البرنامج |
| الإرسال لا يعمل | تحقق من الإيميل وكلمة مرور التطبيق في الإعدادات |
| فشل قراءة العربية من الصور | تأكد أنك تستخدم أحدث نسخة تثبيت (تدعم العربية) |

### الترخيص والملكية

**Job Terminator** برنامج مملوك لـ **المطوّر** ويُوزَّع بترخيص أوفلاين مرتبط
بجهاز واحد — راجع ملف **[LICENSE](LICENSE)**. يُمنع إعادة البيع أو النسخ أو فك
الشفرات أو تجاوز حماية الترخيص.

---

## 👤 Support / الدعم

For license keys, activation, or support: contact the seller via WhatsApp.
للحصول على مفاتيح أو دعم: تواصل مع البائع عبر واتساب.

**© 2026 Job Terminator — All rights reserved / جميع الحقوق محفوظة.**