# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: ar
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/ar/index.mdx
- Validation: deferred
- Runtime seconds: 9.60
- Input tokens: 7181
- Output tokens: 2885
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000799
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'أمان Docker: الدليل المفقود للمطورين'
subTitle: تعلم كيفية حماية شبكتك من التهديدات والتكوينات الخطرة!
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

## قيد التطوير

**جدول المحتويات**

1. [⚠️ الشبكات المحلية في خطر](#-local-networks-at-risk)
2. [🛡️ تكوين جدار الحماية](#-firewall-configuration)
3. [🔐 إدارة الأسرار للتطوير المحلي](#-secrets-management-for-local-development)
4. [🕵️‍ تسريبات الاعتمادات والهجمات الجانبية](#-credential-leaks-and-side-channel-attacks)
5. [🔍 المراقبة ورموز الكناري](#-monitoring--canary-tokens)
6. [❌ المفاهيم الخاطئة الشائعة](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ الشبكات المحلية في خطر

لنكن صادقين، كلنا فعلنا ذلك. اتصلت بشبكة واي‑فاي عشوائية في مقهى أو سمحت لشخص ما باستخدام شبكة منزلك دون تفكير. ربما حتى تثق في ثلاجتك الذكية بأنها لن تعرض شبكتك للخطر. الحقيقة؟ هذه القرارات العارضة يمكن أن تكشف إعداد التطوير المحلي الخاص بك لمخاطر غير ضرورية. لا يقتصر المهاجمون على استهداف الأنظمة الإنتاجية—البيئات المحلية غالبًا ما تكون أهدافًا أسهل، وتوفر وسيلة للوصول إلى المشاريع الحساسة.

### سيناريوهات الهجوم

1. **اعتراض المرور:** يمكن بسهولة التقاط المرور غير المشفر وقراءته.
2. **الخدمات غير المحمية:** قواعد بيانات محلية أو واجهات برمجة تطبيقات مكشوفة على `0.0.0.0`.
3. **تزوير الشبكة:** إعادة توجيه المرور إلى جهاز المهاجم.

### حلول سريعة

- يفضَّل استخدام شبكات Docker خاصة بدلاً من جدران الحماية لتقليل تعرض الشبكة.
- تجنّب الواي‑فاي العام أو المشترك؛ يفضَّل استخدام نقطة اتصال هاتفك.
- راقِب شبكتك المحلية بحثًا عن أجهزة غير معروفة باستخدام أدوات مثل `arp-scan` و `nmap`.

## 🛡️ تكوين جدار الحماية

### UFW مع Docker (أوبونتو)

> ⚠️ **تحذير:** بشكل افتراضي، يتجاوز Docker على أوبونتو/ديبيان قواعد UFW/iptables، مما قد يكشف نظامك لهجمات.
> لا يهم إذا ربطت المنافذ بعناوين IP محلية (مثال: `-p 127.0.0.1:8080:80`).

هذا يفاجئني في كل مرة أتعلم فيها عن ذلك! [Docker يتجاوز قواعد UFW بشكل افتراضي](https://github.com/moby/moby/issues/4737)، مما يسمح للحاويات بالتواصل مع المضيف والحاويات الأخرى دون قيود.

### أفضل ممارسة

1. 🥇 **استخدام شبكات Docker** لعزل والتحكم فيما يمكنه الاتصال بكل حاوية أو شبكة.

###
2. 🥉 **تحديث iptables** إذا اضطررت لاستخدام شبكة `host`، أو لا يمكنك استخدام شبكات مخصصة، يمكنك تقليل الخطر عبر تكوين iptables. ليس للقلوب الضعيفة، [اطلع على الأداة أدناه.](#uf)

#### عزل شبكة Docker

```bash
# إنشاء شبكة Docker جديدة
docker network create my-network

# تشغيل الحاوية باستخدام الشبكة الجديدة
docker run --network my-network my-container
```

#### تكوين UFW (لشبكات `host`)

هناك الكثير من النصائح السيئة حول إصلاح هذه المشكلة. قم بتكوين UFW للعمل مع Docker كما قد تتوقع عادةً.

لقد استخدمت `ufw-docker` لتكوين نظام مستضاف ذاتيًا ويبدو أنه يعمل بشكل جيد.

```bash title="install-ufw-docker.sh"
# تثبيت الملف الثنائي كجذر (يحتاج إلى صلاحيات الجذر على أي حال)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# تثبيت وتعديل ملف `after.rules` الخاص بـ `ufw`
ufw-docker install

ufw-docker help

```

هذا الأمر يقوم بما يلي:

- ينسخ احتياطيًا ملف `/etc/ufw/after.rules`.
- يضيف قواعد متعلقة بـ Docker في نهاية الملف لتتكامل بشكل صحيح مع UFW.

**المصدر:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**مثال على الاستخدام:**

```bash

# السماح لحاوية Docker على المنفذ 8080
ufw-docker allow <container_name> 8080/tcp

# إدارة القواعد بأمان إلى جانب تكوين UFW الخاص بك
ufw-docker status

```

**ملاحظة:** معظم "الإصلاحات" لتعارض Docker‑UFW تتضمن قواعد iptables يدوية، والتي قد تكون عرضة للأخطاء وهشة أثناء التحديثات.

### جدار الحماية في macOS

1. اذهب إلى **تفضيلات النظام > الأمان والخصوصية > جدار الحماية**.
2. فعّل جدار الحماية وانقر على "خيارات جدار الحماية".
3. احظر جميع الاتصالات الواردة باستثناء الخدمات الأساسية.

**ملاحظة:** قد تحتاج إلى البحث عن إعدادات جدار الحماية للسماح لبعض الأجهزة الذكية التي تستخدمها – مثل Google Cast/AirPlay وغيرها من الخدمات.

### أوامر للمستخدمين المتقدمين (macOS و Linux)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # حظر الكل
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # السماح لتطبيق محدد

```

#### Linux (ufw):

```bash

ufw default deny incoming  # حظر جميع الوارد
ufw allow ssh  # السماح بـ SSH
# السماح بـ 443 و 80 لحركة الويب
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # تفعيل جدار الحماية

```

**نصيحة احترافية:** استخدم أدوات مثل [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) على macOS و [ufw](https://help.ubuntu.com/community/UFW) على Linux للحصول على تكوينات أكثر سهولة للمستخدم.

## 🔐 إدارة الأسرار للتطوير المحلي

### التحقق الاستباقي من العناصر النائبة

<p>💡 تأكد من إعداد الأسرار بقيم حقيقية قبل تشغيل تطبيقك.</p>

إذا كنت تستخدم عناصر نائبة مثل `__WARNING_REPLACE_ME__` في أسرارك، رائع، ربما يلاحظ أحدهم ذلك. كإجراء احتياطي، يمكنك إضافة بعض التحقق لتوفير الأمان أثناء وقت التشغيل.

لن تصدق مدى سهولة اختراق (تعديل وإعادة توقيع) رمز JWT عندما يتمكن المهاجمون من تخمين السر!

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

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

### إنشاء وتخزين الأسرار

<p class="inset">لا تقم أبدًا بكتابة الأسرار مباشرة في قاعدة الشيفرة. فضلًا عن المتغيرات البيئية والخزائن الآمنة.</p>

بدلاً من `.env.example`، استخدم `.env.generate.sh` لتسهيل حصول المستخدمين على ملف `.env` يحتوي على "قِيَم افتراضية" آمنة.

#### مثال `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# يولد ملف .env آمن للتطوير المحلي

generate_secret() {
    local length=${1:-30}
    # أضف 4 بايتات لتغطية الحشو
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# اخرج إذا كان ملف .env موجودًا مسبقًا
[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat <<EOL > .env
# إعدادات قاعدة البيانات والأسرار
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# أسرار الجلسة
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

## 🕵️‍ مراقبة وتدقيق مزدوج

### أمثلة `nmap`

#### الاختبار داخل شبكتك

```bash

# افحص جهازك المحلي لجميع المنافذ المفتوحة
nmap -sT localhost
```

# افحص عنوان الـ IP الخاص بجهازك للخدمات
nmap -sV 192.168.1.10

# اكتشف الأجهزة على شبكتك
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24

```

#### اختبار خارج شبكتك

يمكنك معرفة عنوان الـ IP العام الحالي بسهولة عبر خدمات مثل `ifconfig.me`: `curl https://ifconfig.me`.

استخدم شبكة خارجية أو خادم بعيد لاختبار عناوين الـ IP العامة الخاصة بك:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# غيّر target_host إلى عنوانك العام أو اسم المضيف
# تحقق من المضيف باستخدام تقنيات متقدمة
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**لماذا نختبر كلا الاتجاهين؟**
الاختبار من الداخل يكشف عن التعرض الداخلي، بينما الاختبارات الخارجية تحدد الخدمات التي يمكن للمهاجمين الوصول إليها.

## 🛡️ مفاهيم خاطئة شائعة

1. **بيئتي المحلية ليست هدفًا.**
   - الحقيقة: يمكن للمهاجمين الانتقال من جهازك إلى أنظمة الإنتاج.
2. **الجدران النارية تحجب كل شيء.**
   - الحقيقة: هي تحجب فقط ما قمت بتكوينه لحظره.
3. **عناوين الـ IP الخاصة آمنة.**
   - الحقيقة: يمكن لاستغلالات مثل تجاوز NAT أن تؤثر على شبكتك.
````
