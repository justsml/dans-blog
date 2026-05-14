# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: ar
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/ar/index.mdx
- Validation: deferred
- Runtime seconds: 47.26
- Input tokens: 6919
- Output tokens: 6375
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.002648
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'أمان Docker: الدليل المفقود للمطورين'
subTitle: تعلم كيفية حماية شبكتك من التهديدات والتكوينات الخطيرة!
date: '2025-01-04'
modified: '2025-01-13'
tags:
  - local development
  - security
  - devops
  - best-practices
category: Security
cover_full_width: ../flame-whale-wide.webp
cover_mobile: ../flame-whale-head-square-200.webp
cover_icon: ../flame-whale-head-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
import {CodeTabs} from '../../../../components/CodeTabs';

## قيد العمل

**جدول المحتويات**

1. [⚠️ الشبكات المحلية تحت الخطر](#-local-networks-at-risk)
2. [🛡️ تكوين جدار الحماية](#-firewall-configuration)
3. [🔐 إدارة الأسرار للتطوير المحلي](#-secrets-management-for-local-development)
4. [🕵️‍ تسريبات بيانات الاعتماد وهجمات القنوات الجانبية](#-credential-leaks-and-side-channel-attacks)
5. [🔍 المراقبة ورموز الكناري](#-monitoring--canary-tokens)
6. [❌ المفاهيم الخاطئة الشائعة](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ الشبكات المحلية تحت الخطر

لنكن صادقين، كلنا فعلناها. اتصلت بشبكة واي فاي عشوائية في مقهى أو سمحت لشخص ما باستخدام شبكتك المنزلية دون تفكير. ربما تثق حتى في ثلاجتك الذكية ألا تعرض شبكتك للخطر. الواقع؟ هذه القرارات العابرة يمكن أن تعرض بيئة التطوير المحلية الخاصة بك لمخاطر غير ضرورية. لا يستهدف المهاجمون أنظمة الإنتاج فقط—فالبيئات المحلية غالبًا ما تكون أهدافًا أسهل، وتوفر سبيلًا للوصول إلى المشاريع الحساسة.

### سيناريوهات الهجوم

1. **اعتراض حركة المرور:** يمكن بسهولة التقاط وقراءة حركة المرور غير المشفرة.
2. **الخدمات غير المحمية:** قواعد البيانات المحلية أو واجهات برمجة التطبيقات المكشوفة على `0.0.0.0`.
3. **انتحال الشبكة:** إعادة توجيه حركة المرور إلى جهاز المهاجم.

### الإصلاحات السريعة

- تفضيل شبكات دوكر الخاصة على جدران الحماية للحد من التعرض الشبكي.
- تجنب شبكات Wi-Fi العامة أو المشتركة؛ ويفضل استخدام نقطة اتصال هاتفك.
- راقب شبكتك المحلية بحثًا عن أجهزة غير معروفة باستخدام أدوات مثل `arp-scan` و `nmap`.

## 🛡️ تكوين جدار الحماية

### UFW مع دوكر (أوبونتو)

> ⚠️ **تحذير:** افتراضيًا، يتجاوز دوكر على أوبونتو/ديبيان قواعد UFW/iptables، مما قد يعرض نظامك للهجمات.
> لا يهم إذا قمت بربط المنافذ بعناوين IP محلية (مثل `-p 127.0.0.1:8080:80`).

هذا يفاجئني في كل مرة أتعلم عنه! [يتجاوز دوكر قواعد UFW افتراضيًا](https://github.com/moby/moby/issues/4737)، مما يسمح للحاويات بالتواصل مع المضيف والحاويات الأخرى دون قيود.

### أفضل الممارسات

1. 🥇 **استخدم شبكات دوكر** لعزل والتحكم في ما يمكنه الاتصال بكل حاوية أو شبكة.

###
2. 🥉 **قم بتحديث iptables** إذا كان عليك استخدام شبكة `host`، أو لا يمكنك استخدام شبكات مخصصة، يمكنك تخفيف المخاطر عن طريق تكوين iptables. ليس لضعاف القلوب، [اطلع على الأداة أدناه.](#uf)

#### عزل شبكة دوكر

```bash
# إنشاء شبكة دوكر جديدة
docker network create my-network

# تشغيل الحاوية مع الشبكة الجديدة
docker run --network my-network my-container
```

#### تكوين UFW (لشبكات `host`)

هناك الكثير من النصائح السيئة حول إصلاح هذه المشكلة. قم بتكوين UFW للعمل مع Docker باستخدام UFW إلى حد كبير كما تتوقع.

لقد استخدمت `ufw-docker` لتكوين نظام مستضاف ذاتيًا ويبدو أنه يعمل بشكل جيد.

```bash title="install-ufw-docker.sh"
# تثبيت الثنائي كجذر (يحتاج صلاحيات الجذر على أي حال)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# تثبيت وتعديل ملف `after.rules` الخاص بـ `ufw`
ufw-docker install

ufw-docker help

```

يقوم هذا الأمر بما يلي:

- عمل نسخة احتياطية من الملف `/etc/ufw/after.rules`.
- إضافة قواعد متعلقة بـ Docker في نهاية الملف لتتكامل بشكل صحيح مع UFW.

**المصدر:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**مثال على الاستخدام:**

```bash

# السماح لحاوية Docker على المنفذ 8080
ufw-docker allow <container_name> 8080/tcp

# إدارة القواعد بأمان إلى جانب تكوين UFW الخاص بك
ufw-docker status

```

**ملاحظة:** معظم "الإصلاحات" لتعارضات Docker-UFW تتضمن قواعد iptables يدوية، والتي يمكن أن تكون عرضة للخطأ وهشة أثناء التحديثات.

### جدار الحماية في macOS

1. اذهب إلى **تفضيلات النظام > الأمان والخصوصية > جدار الحماية**.
2. فعّل جدار الحماية وانقر على "خيارات جدار الحماية".
3. احظر جميع الاتصالات الواردة باستثناء الخدمات الأساسية.

**ملاحظة:** قد تحتاج إلى البحث عن تكوين جدار الحماية الخاص بك للسماح ببعض الأجهزة الذكية التي تستخدمها - مثل Google Cast/AirPlay والخدمات الأخرى.

### أوامر للمستخدمين المتقدمين (macOS و Linux)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # حظر الكل
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # السماح لتطبيق معين

```

#### Linux (ufw):

```bash

ufw default deny incoming  # حظر جميع الاتصالات الواردة
ufw allow ssh  # السماح بـ SSH
# السماح بالمنفذين 443 و 80 لحركة مرور الويب
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # تفعيل جدار الحماية

```

**نصيحة احترافية:** استخدم أدوات مثل [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) على macOS و [ufw](https://help.ubuntu.com/community/UFW) على Linux لتكوينات أكثر سهولة في الاستخدام.

## 🔐 إدارة الأسرار للتطوير المحلي

### التحقق الاستباقي من العناصر النائبة

<p>💡 تأكد من إعداد الأسرار بشكل صحيح بقيم حقيقية قبل تشغيل تطبيقك.</p>

إذا كنت تستخدم عناصر نائبة مثل `__WARNING_REPLACE_ME__` في أسرارك، فربما سيلاحظها أحدهم. لكن تحسبًا لذلك، يمكنك إضافة القليل من التحقق لتوفير الأمان أثناء وقت التشغيل.

لن تصدق كم هو سهل اختراق رمز JWT بالكامل (تعديله وإعادة توقيعه) عندما يتمكن المهاجمون من تخمين السر!

<CodeTabs client:load tabs={["جافا سكريبت", "رست", "غو"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Unsafe secrets detected:", missingSecrets);
    process.exit(1);
  }
};

validateSecrets();
```

```rust
// validate_secrets.rs
use std::env;

fn validate_secrets() {
    let unsafe_placeholder = "__WARNING_REPLACE_ME__";
    for (key, value) in env::vars() {
        if value.contains(unsafe_placeholder) {
            panic!("Unsafe secret in {}", key);
        }
    }
}

fn main() {
    validate_secrets();
}
```

```go
// validate_secrets.go
package main

import (
	"fmt"
	"os"
	"strings"
)

func validateSecrets() {
	placeholder := "__WARNING_REPLACE_ME__"
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		if len(pair) == 2 && strings.Contains(pair[1], placeholder) {
			panic(fmt.Sprintf("Unsafe secret in %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```

</CodeTabs>

### توليد الأسرار وتخزينها

<p class="inset">لا تقم أبدًا بتضمين الأسرار في قاعدة الكود. استخدم متغيرات البيئة وخزائن آمنة بدلاً من ذلك.</p>

بدلاً من `.env.example`، استخدم `.env.generate.sh` لتسهيل حصول المستخدمين على ملف `.env` يحتوي على "إعدادات افتراضية" آمنة.

#### مثال `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Generates a secure .env file for local development

generate_secret() {
    local length=${1:-30}
    # add 4 bytes to account for padding
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Bail out if .env file already exists
[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat <<EOL > .env
# Database settings & secrets
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# Session secrets
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "New .env file generated!"
```

{/*

```zig
// validate_secrets.zig
const std = @import("std");

pub fn main() void {
    var env = std.os.getenv_map();
    const placeholder = "__WARNING_REPLACE_ME__";

    for (env.items()) |entry| {
        if (std.mem.contains(u8, entry.value, placeholder)) {
            std.debug.panic("Unsafe secret in {}", .{entry.key});
        }
    }
}
``` */}

## 🕵️‍ المراقبة والتحقق المزدوج

### أمثلة `nmap`

#### الاختبار داخل شبكتك

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Detect devices on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24

```

#### اختبار من خارج شبكتك

يمكنك البحث عن عنوان IP العام الحالي بسهولة باستخدام خدمات مثل `ifconfig.me`: `curl https://ifconfig.me`.

استخدم شبكة خارجية أو خادمًا بعيدًا لاختبار عناوين IP العامة الخاصة بك:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Change target_host to your public ip or hostname
# Check host using advanced techniques
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**لماذا اختبار كليهما؟**
يكشف الاختبار من الداخل عن التعرض الداخلي، بينما يحدد الاختبار الخارجي الخدمات التي يمكن للمهاجمين الوصول إليها.

## 🛡️ المفاهيم الخاطئة الشائعة

1. **بيئتي المحلية ليست هدفًا.**
   - الحقيقة: يمكن للمهاجمين التنقل من جهازك إلى أنظمتك الإنتاجية.
2. **جدران الحماية تمنع كل شيء.**
   - الحقيقة: إنها تمنع فقط ما تقوم بتكوينها لتمنعه.
3. **عناوين IP الخاصة آمنة.**
   - الحقيقة: لا تزال الثغرات مثل تجاوز NAT يمكن أن تؤثر على شبكتك.
````
