# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: hi
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/hi/index.mdx
- Validation: deferred
- Runtime seconds: 72.01
- Input tokens: 10981
- Output tokens: 13393
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.004093
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: ''
subTitle: अपने नेटवर्क को खतरों और खतरनाक कॉन्फ़िगरेशन से कैसे सुरक्षित करें!
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
```jsx
import {CodeTabs} from '../../../../../components/CodeTabs';

## कार्य अवधि में

**सामग्री सूची**

1. [⚠️ स्थानीय नेटवर्क में खतरा](#-local-networks-at-risk)
2. [🛡️ फायरवॉल निर्माण](#-firewall-configuration)
3. [🔐 स्थानीय विकास के लिए रहस्य नियंत्रण](#-secrets-management-for-local-development)
4. [🕵️‍ संस्कृति रिसाव और पार्श्व-चैनल हमले](#-credential-leaks-and-side-channel-attacks)
5. [🔍 प्रेक्षण & कैनरी टोकन](#-monitoring--canary-tokens)
6. [❌ सामान्य गलत धारणाएँ](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ स्थानीय नेटवर्क में खतरा
```

आइए ईमानदारी से कहें, हम सभी ने ऐसा कभी न कभी किया है। आपने किसी यादृच्छिक कॉफी शॉप वाई-फाई से कनेक्ट किया है या किसी को अपने घर के नेटवर्क का उपयोग करने दिया है बिना दूसरे विचार के। शायद आप अपने स्मार्ट फ्रिज को अपने नेटवर्क को खतरा पहुंचाने से बचाने लगते हैं। वास्तविकता? ये अनौपचारिक निर्णय आपके स्थानीय विकास सेटअप को अनावश्यक खतरों के सामने रख सकते हैं। हमलावर उत्पादन प्रणालियों के लक्ष्य नहीं होते हैं—स्थानीय पर्यावरण अक्सर कमजोर लक्ष्य होते हैं, जो संवेदनशील परियोजनाओं तक पहुंच के तरीके प्रदान करते हैं।

### हमला परिदृश्य

1. **अवरुद्ध ट्रैफ़िक:** अनएन्क्रिप्टेड ट्रैफ़िक को आसानी से पकड़ा जा सकता है और पढ़ा जा सकता है।  
2. **असुरक्षित सेवाएँ:** स्थानीय डेटाबेस या APIs जो `0.0.0.0` पर खुले हुए हैं।  
3. **नेटवर्क बदलाव:** हमलावर के डिवाइस पर ट्रैफ़िक को रीडायरेक्ट कर देता है।  

### त्वरित ठीक

- नेटवर्क उत्प्रसार को सीमित करने के लिए फायरवॉल की तुलना में निजी डॉकर नेटवर्क का उपयोग करें।  
- सार्वजनिक या साझा वाई-फाई के उपयोग से बचें; अपने फोन के हॉटस्पॉट का उपयोग करें।  
- अज्ञात डिवाइसों की निगरानी करें जैसे `arp-scan` और `nmap` जैसे उपकरणों का उपयोग करके।  

## 🛡️ फायरवॉल निर्माण

### UFW डॉकर (यूबंटू) के साथ

> ⚠️ **चेतावनी:** डिफ़ॉल्ट रूप से यूबंटू/डेबियन पर डॉकर UFW/iptables नियमों को बाईपास कर सकता है, जो आपकी प्रणाली को हमलों के लिए प्रकट कर सकता है।  
> आपको यह बात ध्यान में रखने की आवश्यकता नहीं है कि आप लोकल IP पतों पर पोर्ट बाइंड कर रहे हैं (जैसे `-p 127.0.0.1:8080:80`).  

मुझे इससे हर बार आश्चर्य होता है! [डॉकर डिफ़ॉल्ट रूप से UFW नियमों को बाईपास करता है](https://github.com/moby/moby/issues/4737), जिससे कंटेनर प्रणाली और अन्य कंटेनरों के साथ बिना किसी प्रतिबंध के संचार कर सकते हैं।  

### सर्वोत्तम अभ्यास  

1. 🥇 **डॉकर नेटवर्क का उपयोग करें** प्रत्येक कंटेनर या नेटवर्क के लिए कनेक्शन को अलग-अलग और नियंत्रित करने के लिए।  

2. 🥉 **iptables अपडेट करें** अगर आपको एक `host` नेटवर्क का उपयोग करना है, या आप अनुकूलित नेटवर्क का उपयोग नहीं कर सकते हैं, तो आप जोखिम को कम कर सकते हैं जब आप iptables को नियोजित करते हैं। इसके लिए तैयार रहने के लिए, [नीचे उपयोगिता देखें।](#uf)

#### डॉकर नेटवर्क अलगाव

```bash
# Create a new Docker network
docker network create my-network

# Run your container with the new network
docker run --network my-network my-container
```

#### यूएफडब्ल्यू संवर्ग (होस्ट नेटवर्क के लिए)

बाहर बहुत सारी खराब सलाह है इसे ठीक करने के लिए। डॉकर के साथ यूएफडब्ल्यू को इस तरह से संवर्ग करें जैसा आप अक्सर अपेक्षा करते हैं।

मैंने `ufw-docker` का उपयोग एक स्व-होस्टेड सिस्टम को संवर्गित करने के लिए किया है और लगता है कि यह अच्छा काम करता है।

```bash title="install-ufw-docker.sh"
# Install binary as root (needs root permissions anyway)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Install and modify the `after.rules` file of `ufw`
ufw-docker install

ufw-docker help
```

इस कमांड के द्वारा निम्नलिखित कार्य किए जाते हैं:

- `/etc/ufw/after.rules` फ़ाइल की प्रतिलिपि बनाता है।
- फ़ाइल के अंत में डॉकर से संबंधित नियमों को जोड़ता है ताकि UFW के साथ उचित तरीके से एकीकृत हो सके।

**स्रोत:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**उपयोग का उदाहरण:**

```bash

# डॉकर कंटेनर पोर्ट 8080 पर अनुमति दें
ufw-docker allow <container_name> 8080/tcp

# अपने UFW नियमों के साथ सुरक्षित रूप से नियम प्रबंधित करें
ufw-docker status

```

**नोट:** डॉकर-UFW झगड़ों के अधिकांश "फिक्स" में हाथ से `iptables` नियमों का उपयोग किया जाता है, जो अपडेट के दौरान त्रुटि-प्रवण और टूटीला हो सकता है।

### macOS फ़ायरवॉल

1. **सिस्टम प्राथमिकताएं > सुरक्षा एवं गोपनीयता > फ़ायरवॉल** पर जाएं।
2. फ़ायरवॉल को सक्षम करें और "फ़ायरवॉल विकल्प" पर क्लिक करें।
3. सभी आने वाले कनेक्शन को ब्लॉक करें, छोटी सेवाओं के अपवाहन को छोड़कर।

**नोट:** आपको अपने फ़ायरवॉल के लिए निर्देश खोजने पड़ सकते हैं ताकि आपके द्वारा उपयोग किए जाने वाले निश्चित स्मार्ट उपकरणों की अनुमति दी जा सके - उदाहरण के लिए Google Cast/AirPlay और अन्य सेवाएं।

### उन्नत उपयोगकर्ताओं के लिए कमांड (macOS और Linux)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # सभी ब्लॉक करें
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # विशिष्ट एप्प अनुमति दें

```

#### Linux (ufw):

```bash

ufw default deny incoming  # सभी आने वाले कनेक्शन को ब्लॉक करें
ufw allow ssh  # SSH अनुमति दें
# 443 और 80 पर वेब ट्रैफ़िक की अनुमति दें
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # फ़ायरवॉल सक्षम करें

```

**प्रो टिप:** [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) का उपयोग macOS पर और [ufw](https://help.ubuntu.com/community/UFW) का उपयोग Linux पर अधिक उपयोगकर्ता-अनुकूल निर्माण के लिए करें।

## 🔐 स्थानीय विकास के लिए सीक्रेट्स प्रबंधन

### प्राइमरी प्लेसहोल्डर वैलिडेशन

<p>💡 अपने एप्लिकेशन चलाने से पहले सीक्रेट्स को वास्तविक मानों के साथ ठीक से सेटअप करना सुनिश्चित करें।</p>

अगर आप अपने सीक्रेट्स में `__WARNING_REPLACE_ME__` जैसे प्लेसहोल्डर का उपयोग करते हैं, तो अच्छा, शायद कोई ध्यान देगा। बस बचकाना, आप थोड़ी वैलिडेशन भी जोड़ सकते हैं ताकि रनटाइम पर सुरक्षा प्रदान करें।

आप इस बात पर विश्वास नहीं करेंगे कि जब हमलावर सीक्रेट का अनुमान लगा सकते हैं, तो एक JWT टोकन को पूरी तरह से (संशोधित और पुन: हस्ताक्षरित) हैक करना कितना आसान है!

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

### गुप्त बनाना और संग्रहीत करना

<p class="inset">अपने कोडबेस में गुप्त न डालें। पर्यावरण चर और सुरक्षित भंडार का उपयोग करें।</p>

`.env.example` के बजाय `.env.generate.sh` का उपयोग करें ताकि उपयोगकर्ता को सुरक्षित "मानक" के साथ `.env` फ़ाइल प्राप्त करने में आसानी हो।

#### उदाहरण `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# स्थानीय विकास के लिए सुरक्षित .env फ़ाइल बनाता है

generate_secret() {
    local length=${1:-30}
    # पैडिंग के लिए 4 बाइट जोड़ें
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# यदि .env फ़ाइल पहले से मौजूद है तो बाहर निकलें
[ -f .env ] && { echo ".env फ़ाइल पहले से मौजूद है!"; exit 1; }

cat <<EOL > .env
# डेटाबेस सेटिंग्स और गुप्त
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# सत्र गुप्त
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "नई .env फ़ाइल बनाई गई!"
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

## 🕵️‍ निगरानी और दोबारा जाँच

### `nmap` उदाहरण

#### अपने नेटवर्क के अंदर परीक्षण करना

```bash

# अपने localhost पर सभी खुले पोर्ट की जाँच करें
nmap -sT localhost

# अपने मशीन के निजी IP पर सेवाओं की जाँच करें
nmap -sV 192.168.1.10

# अपने नेटवर्क पर उपकरणों का पता लगाएं
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

#### अपने नेटवर्क के बाहर परीक्षण करना

आप अपने वर्तमान (सार्वजनिक) IP को `ifconfig.me` जैसी सेवाओं के साथ आसानी से जांच सकते हैं: `curl https://ifconfig.me`.

अपने सार्वजनिक IPs का परीक्षण करने के लिए बाहरी नेटवर्क या दूरस्थ सर्वर का उपयोग करें:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# target_host को अपने सार्वजनिक IP या होस्टनेम में बदलें
# होस्ट की जाँच उन्नत तकनीकों का उपयोग करके करें
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**दोनों का परीक्षण क्यों करें?**  
अंदर से परीक्षण करना आंतरिक उजागर करता है, जबकि बाहरी परीक्षण हमलावरों तक पहुंचने वाली सेवाओं की पहचान करते हैं।

## 🛡️ सामान्य गलत धारणाएँ
--- CHUNK END ---

1. **मेरा स्थानीय पर्यावरण लक्ष्य नहीं है।**  
   - तथ्य: हमलावर आपके मशीन से उत्पादन प्रणालियों तक पिवट कर सकते हैं।  
2. **फायरवॉल्स सब कुछ ब्लॉक करते हैं।**  
   - तथ्य: वे केवल उन चीजों को ब्लॉक करते हैं जिन्हें आप उन्हें निर्देशित करते हैं।  
3. **निजी आईपी निश्चित हैं।**  
   - तथ्य: एनएएटी पार करने जैसे नुकसान अभी भी आपके नेटवर्क को प्रभावित कर सकते हैं।
````
