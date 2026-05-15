# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/ar/index.mdx
- Validation: deferred
- Runtime seconds: 3.51
- Input tokens: 8150
- Output tokens: 3546
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.000956
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: مساعدك الذكي منحني وصولًا إلى الصدفة
subTitle: كيفية تأمين إعداد OpenClaw/Moltbot المحلي أو على خادم VPS
modified: '2026-01-28'
tags:
  - security
  - moltbot
  - clawdbot
  - tailscale
  - ai
  - vpn
  - devops
  - ssh
category: Security
subCategory: AI Infrastructure
cover_full_width: ../hero_wide.webp
cover_mobile: ../icon_square_200.webp
cover_icon: ../icon_square_200.webp
---
OpenClaw (سابقًا Clawdbot/Moltbot) يوفّر لك مساعدًا ذكيًا شخصيًا يعمل عبر WhatsApp وSlack وDiscord وiMessage وقنوات أخرى. لكن إذا وضعت بوابة OpenClaw أو تحكم العقد أو SSH على الإنترنت العام دون مصادقة قوية، فإنك تمنح الغرباء مسارًا للوصول إلى سطر الأوامر على جهازك.

هذا الدليل يوضح أكثر الإعدادات أمانًا: إبقاء بوابة OpenClaw على الـ loopback، كشفها فقط لشبكة tailnet عبر Tailscale Serve، تأمين SSH، والتحقق من خارج الشبكة أن البوابة ليست عامة.

اعتماد المشروع السريع كشف عن مخاوف أمنية حقيقية: [مسح شودان وجد 2,847 حالة مكشوفة](https://socradar.io/blog/clawdbot-is-it-safe/) في الأسابيع القليلة الأولى، و[قضية تدقيق أمان على GitHub أبلغت عن 512 نتيجة](https://github.com/moltbot/moltbot/issues/1796) في قاعدة الشيفرة. جزء من ذلك كان ناتجًا عن ماسحات آلية وبعضها تغير منذ إعادة تسمية يناير 2026 إلى OpenClaw، لذا اعتبر الرقم إشارة تحذيرية وليس عددًا دقيقًا للثغرات الحالية. لا تحتاج لأن تكون خبيرًا أمنيًا—كل ما عليك هو تجنّب نشر أسطح التشغيل قبل النشر.

---

## ما الذي تكشفه فعليًا

اعتمادًا على طريقة التثبيت والنشر، هناك ثلاث أسطح تستحق الفحص:

- **المنفذ 22**: وصول SSH على خادم VPS
- **المنفذ 18789**: واجهة تحكم البوابة وواجهة WebSocket API
- **تحكم المتصفح/العقدة**: تنفيذ عقدة عن بُعد وأتمتة المتصفح عبر نموذج إقران البوابة/العقدة

تقول الوثائق الحالية لـ [OpenClaw عن الوصول عن بُعد](https://docs.molt.bot/gateway/remote) إن WebSocket للبوابة يرتبط بالـ loopback افتراضيًا وتوصي بالحفاظ على هذا الإعداد ما لم تقم باختيار ربط LAN/tailnet/مخصص. هذا جيد. تظهر المخاطر عندما تتجاوز الإعداد الافتراضي، تنشر منافذ Docker، تضيف وكيلًا عكسيًا، تشغّل Funnel، أو تترك SSH مفتوحًا للعالم.

البوابة هي الأكبر. إنها سطح التشغيل لمساعدك، بما في ذلك مسارات استدعاء الأدوات. إذا كان بإمكان الإنترنت الوصول إليها ولم توجد مصادقة أو كانت ضعيفة أو تم تجاوزها أو تسريبها، قد يتمكن المهاجم من توجيه الوكيل أو استدعاء الأدوات بصلاحيات مستخدمك.

تحكم المتصفح حساس تقريبًا بنفس الدرجة. توصي وثائق OpenClaw الحالية بتشغيل تحكم المتصفح عبر عقدة مقترنة على جهاز المتصفح ومعاملة إقران العقدة كالوصول التشغيلي. إذا كان بإمكان البوابة استدعاء `system.run` على عقدة مقترنة، فهذا يعني تنفيذ شفرة عن بُعد على تلك العقدة، وفقًا لسياسة العقدة في البوابة وموافقات التنفيذ الخاصة بالعقدة نفسها.

SSH هو SSH. إذا كنت تستخدم المصادقة بكلمة مرور، فإن محاولات القوة الغاشمة لا مفر منها على خادم VPS عام.

---

## حل Tailscale

بالنسبة لـ OpenClaw، يوفّر Tailscale وصولًا عن بُعد دون نشر خدمات التشغيل:

1. تشغيل نسخة OpenClaw على خادم VPS أو جهاز محلي
2. تبقى البوابة مرتبطة بالـ loopback وتُوصل عبر Tailscale Serve، أو ترتبط مباشرةً بعنوان IP الخاص بالـ tailnet مع مصادقة صريحة
3. تثبيت Tailscale على الخادم وأجهزتك الشخصية
4. الوصول إلى OpenClaw عبر عنوان IP الخاص بـ Tailscale أو اسم MagicDNS
5. لا يرى أي شخص آخر على الإنترنت شيء، ما لم تقم بتمكين Funnel أو وكيل عام آخر عن قصد

### هل يجب أن تدع OpenClaw يدير Tailscale؟

يحتوي OpenClaw على [تكامل مدمج مع Tailscale](https://docs.molt.bot/gateway/tailscale) يمكنه تكوين `tailscale serve` أو `tailscale funnel` للبوابة.

**وضع Serve** يبقي الأمور داخل شبكة tailnet فقط. تظل البوابة مرتبطة بـ `127.0.0.1` بينما يتولى Tailscale التوجيه وHTTPS. عندما يتم تمكين `gateway.auth.allowTailscale`، يمكن لـ OpenClaw مصادقة حركة مرور واجهة التحكم/WebSocket باستخدام رؤوس هوية Tailscale والتحقق من المصدر عبر `tailscale whois`. هذا هو الوضع المناسب لمعظم النشرات الشخصية.

**وضعFunnel** يعرّض البوابة للعامة عبر ميزة نقطة النهاية العامة في Tailscale. توضح وثائق Tailscale نفسها أن Funnel يوجه الحركة من الإنترنت العام إلى خدمة محلية. يرفض OpenClaw تشغيل Funnel ما لم يكن وضع مصادقة البوابة `password`، لكنك لا تزال تختار التعريض العام لسطح التشغيل.

وثائق [الأمان في OpenClaw](https://docs.molt.bot/gateway/security) توضح أن حقن الأوامر والوصول إلى الأدوات هما المخاطر الأساسية للمساعد الشخصي. لا تمنح الوكيل مسارًا ليصبح عامًّا بهدوء. استخدم Serve عن قصد، وتجنب Funnel إلا إذا كنت بحاجة فعلية للوصول العام، وتطلب موافقة تنفيذ لأي أمر `tailscale`.

## إعداد OpenClaw بأمان

### الخطوة 1: تثبيت Tailscale

على الخادم الافتراضي الخاص بك أو الخادم المحلي:

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

على جهاز العميل، ثبّت Tailscale من صفحة التحميل الرسمية وسجّل الدخول إلى نفس الـ tailnet.

الآن كلا الجهازين على نفس الشبكة الخاصة. يمكنك اختبار الاتصال بـ VPS عبر عنوان IP الخاص بـ Tailscale، وستتم التوجيه عبر النفق المشفر.

### الخطوة 2: تكوين OpenClaw لاستخدام Tailscale

النمط الأكثر أمانًا حاليًا هو: إبقاء البوابة على الـ loopback وتعريضها للـ tailnet عبر Tailscale Serve.

في إعدادات OpenClaw:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

ثم شغّل البوابة باستخدام Serve:

```bash
openclaw gateway --tailscale serve
```

توضح وثائق OpenClaw أن هذا يبقي البوابة على `127.0.0.1` بينما يوفر Tailscale HTTPS وتوجيه الـ tailnet. ستفتحها عبر `https://<magicdns-name>/`، وليس عبر عنوان IP العام لـ VPS.

إذا كنت تفضّل ربط مباشر للـ tailnet بدلاً من Serve، استخدم مصادقة البوابة الصريحة:

```js
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "replace-with-a-long-random-token",
    },
  },
}
```

ثم اتصل من جهاز tailnet آخر:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

إذا كنت تشغّل في Docker أو بيئة حاويات أخرى، كن حذرًا جدًا مع نشر المنافذ. النشر مثل `-p 18789:18789` عادةً ما يربط على جميع واجهات المضيف. فضلًا استخدم loopback مع Tailscale Serve، أو اربط جانب المضيف صراحةً إلى عنوان IP الخاص بـ Tailscale بعد التأكد من أن الحاوية لا تزال تستقبل الحركة:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

بعد أي تعديل في Docker، تحقق من الخارج باستخدام `nmap` ومن داخل النظام باستخدام `ss`. يمكن أن يتجاوز Docker أو يعيد ترتيب افتراضات جدار الحماية للمضيف إذا لم تأخذ ذلك في الاعتبار.

### الخطوة 3: تأمين SSH

حتى مع Tailscale، يجب تأمين SSH بشكل صحيح:

```bash
# Keep your current SSH session open while doing this.
# First, from your client machine, confirm you can SSH over Tailscale:
ssh your-user@SERVER_TAILSCALE_IP

# Put hardening in a drop-in file instead of rewriting sshd_config.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Validate before reloading. Do not skip this.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

هذا يعطل تسجيل الدخول القائم على كلمة المرور وتسجيل الدخول كجذر. الخطوة التالية تستخدم UFW لمنع SSH العام تمامًا مع الاستمرار في السماح بـ SSH عبر `tailscale0`.

### الخطوة 4: قواعد جدار الحماية

إعداد جدار حماية كطبقة ثانية:

```bash
# Using UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

دليل صقل Ubuntu الخاص بـ Tailscale يستخدم نفس الشكل: السماح لـ `tailscale0`، رفض باقي المرور الوارد، ثم التحقق من أن SSH العام ينتهي مهلةً بينما يظل SSH إلى العنوان `100.x.y.z` يعمل. إذا كنت تشغل موقعًا عامًا على نفس الـ VPS، احتفظ فقط بالقواعد العامة التي تحتاجها فعلاً، مثل `80/tcp` و `443/tcp`.

---

## فحص التعرض الخاص بك

### التحقق من المنافذ المفتوحة من الخارج

من جهاز **ليس** على شبكة Tailscale الخاصة بك:

```bash
# Check if common public ports are exposed
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Expected output for a secured instance:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

إذا ظهر `22` أو `18789` كـ `open` بدلاً من `filtered` أو `closed`، فهناك مشكلة. إذا كان `80` أو `443` مفتوحًا، تأكد أن ذلك هو موقعك العام المقصود أو نقطة نهاية Tailscale Funnel، وليس بوابة OpenClaw عن طريق الخطأ.

### التحقق مما يستمع محليًا

على خادم OpenClaw الخاص بك:

```bash
# Show all listening ports and what they're bound to
sudo ss -tulpn | grep LISTEN

# Look for lines like this (good for Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# Or this (acceptable for direct tailnet bind with auth):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NOT like this (bad):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

إذا رأيت `0.0.0.0` أو `:::` (ما يعادل IPv6)، فإن تلك الخدمة مكشوفة للعالم.

### تدقيق أمان مدمج

OpenClaw يتضمن [أمر تدقيق أمان](https://docs.molt.bot/gateway/security) يتحقق من إعداداتك مقابل أفضل ممارسات الأمان:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

التدقيق يفحص تعرض البوابة، وضع Tailscale، إعدادات المصادقة، وصول القنوات، سياسة الأدوات، جرد الإضافات، وأذونات الملفات. اعتبر `--fix` مساعدًا مفيدًا، لا بديلًا عن قراءة النتائج.

---

## ما لا يحلّه هذا


Tailscale يزيل أكبر خطأ: كشف المشغل للجمهور. لكنه لا يحل كل شيء:

**تخزين الاعتمادات**: OpenClaw يخزن نصوص الجلسات، رموز OAuth، ومفاتيح API على القرص. تأكد من أن لهذه الملفات أذونات صحيحة (`chmod 600` للملفات، `chmod 700` لأدلة الإعداد الخاصة) ولا تكون ضمن نظام التحكم بالإصدارات. أداة التدقيق المدمجة تتحقق من ذلك.

**عزل الإضافات**: الإضافات تُشغَّل بصلاحيات المستخدم بالكامل. لا تثبت إضافات إلا من مصادر تثق بها، وراجع القدرات التي تطلبها. أداة التدقيق تُعدّ جردًا للإضافات المثبتة.

**أمان الجهاز**: إذا تم اختراق حساب Tailscale الخاص بك أو سرق جهاز على شبكة tailnet، يمكن للمهاجم الوصول إلى نسخة OpenClaw الخاصة بك. فعّل [تفويض جهاز Tailscale](https://tailscale.com/kb/1099/device-authorization/) لطلب موافقة عند إضافة أجهزة جديدة.

---

## قائمة التحقق قبل النشر

قبل اعتبار نسخة OpenClaw/Moltbot جاهزة للإنتاج:

- [ ] تثبيت Tailscale وتوثيقه على الخادم والعميل
- [ ] إبقاء البوابة على الـ loopback مع Tailscale Serve، أو ربطها بـ `tailnet` مع توثيق صريح
- [ ] ضبط SSH لتعطيل مصادقة كلمة المرور وتسجيل الدخول كـ root
- [ ] تكوين جدار الحماية (UFW أو iptables/nftables) للسماح لـ `tailscale0` ورفض أي وصول عام غير ضروري
- [ ] فحص nmap خارجي يُظهر جميع المنافذ `filtered` أو `closed`
- [ ] أمر `ss -tulpn` داخلي يُظهر البوابة مربوطة بـ `127.0.0.1` أو `::1` أو عنوان IP الخاص بـ Tailscale فقط
- [ ] ملفات الاعتمادات ذات أذونات 600 وأدلة الإعداد الخاصة ذات أذونات 700
- [ ] تشغيل `openclaw security audit --deep` ومعالجة جميع النتائج
- [ ] إذا كنت تستخدم إدارة Tailscale في OpenClaw، تم تمكين موافقات التنفيذ
- [ ] تكوين نسخ احتياطية منتظمة (بيانات OpenClaw + الإعدادات)

---

## موارد

- [دليل أمان OpenClaw](https://docs.molt.bot/gateway/security)
- [تكامل OpenClaw مع Tailscale](https://docs.molt.bot/gateway/tailscale)
- [مرجع سطر أوامر Tailscale Serve](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [استخدام UFW لتقوية خادم Ubuntu](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [تدقيق الأمان: 512 نتيجة (قضية GitHub)](https://github.com/moltbot/moltbot/issues/1796)
- [دليل فحص الشبكة باستخدام Nmap](https://nmap.org/book/man.html)
````
