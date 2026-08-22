# راهنمای راه‌اندازی مستندات

این فایل راهنمای کامل ساخت و استقرار مستندات NSplusthon با **MkDocs Material** است.

## پیش‌نیازها

- Python 3.9 یا بالاتر
- pip

## نصب وابستگی‌ها

```bash
pip install -U "mkdocs-material>=9"
```

## ساختار پروژه

```
NSplusthon/
├── mkdocs.yml                 # تنظیمات MkDocs
├── docs/                      # محتوای مستندات
│   ├── index.md               # صفحه اصلی
│   ├── installation.md        # نصب و راه‌اندازی
│   ├── quick-start.md         # شروع سریع
│   ├── api-reference.md       # مرجع API
│   ├── faq.md                 # سوالات متداول
│   ├── concepts/              # مفاهیم پایه
│   └── examples/              # مثال‌ها
├── .github/
│   └── workflows.disabled/    # Workflowهای غیرفعال (deploy-docs.yml, ...)
└── site/                      # خروجی build (موقت، در git ignore است)
```

## دستورات پرکاربرد

### اجرای محلی (با hot-reload)

```bash
mkdocs serve
```

سپس مرورگر را به `http://localhost:8000` باز کنید.

### ساخت نسخه نهایی

```bash
mkdocs build
```

خروجی HTML در دایرکتوری `site/` ایجاد می‌شود.

### استقرار دستی در GitHub Pages

```bash
mkdocs gh-deploy
```

> ℹ️ Workflowهای CI/CD (از جمله `deploy-docs.yml`) فعلاً در
> `.github/workflows.disabled/` قرار دارند. برای فعال‌سازی استقرار خودکار،
> دایرکتوری را به `.github/workflows` رنیم کنید:
>
> ```bash
> mv .github/workflows.disabled .github/workflows
> ```

## ویژگی‌های مورد استفاده

- **تم Material**: طراحی مدرن با تم روشن/تاریک
- **پشتیبانی RTL**: `direction: rtl` + فونت Vazirmatn برای متن فارسی
- **جستجو**: سرچ تمام‌متن در مستندات
- **کپی کد**: دکمه کپی روی بلاک‌های کد
- **واکنش‌گرا**: نمایش صحیح در موبایل و دسکتاپ

## پیکربندی (`mkdocs.yml`)

- `site_name` / `site_description` / `site_url`: مشخصات سایت
- `theme`: تم Material، زبان `fa`، جهت RTL، پالت indigo
- `nav`: ساختار ناوبری صفحات
- `markdown_extensions`: افزونه‌های Markdown (admonition، tables، ...)

## عیب‌یابی

### `command not found: mkdocs`

```bash
pip install -U "mkdocs-material>=9"
```

اگر از virtualenv استفاده می‌کنید، مطمئن شوید فعال است.

### `No such file: docs/index.md`

در دایرکتوری **ریشه‌ی** پروژه (جایی که `mkdocs.yml` وجود دارد) دستور را اجرا کنید.

### خطای YAML در `mkdocs.yml`

سینتکس و **فاصله‌گذاری** YAML را بررسی کنید (YAML به جای indentation از space استفاده می‌کند، نه tab).

### صفحه‌ها در ناوبری نمایش داده نمی‌شوند

مطمئن شوید فایل مربوطه در `nav` داخل `mkdocs.yml` ثبت شده است؛ در غیر این صورت MkDocs آن را build می‌کند ولی در منو نشان نمی‌دهد.

## منابع

- [MkDocs](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
