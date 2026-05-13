# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: hi
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/hi/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 15.91
- Input tokens: 10020
- Output tokens: 3327
- Thinking tokens: unknown
- Cached input tokens: 2688
- Cache write tokens: 0
- Estimated cost: $0.000990
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-for-admins-and-maintainers --locale hi
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'Docker सुरक्षा: डेवलपर्स के लिए खोया हुआ गाइड'
subTitle: अपने नेटवर्कको खतरों और ख़राब कॉन्फ़िगरेशन से सुरक्षित रखें!
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
import {CodeTabs} from '../../../../../components/CodeTabs';

## कार्य प्रगति में है

**सामग्री तालिका**

1. [⚠️ स्थानीय नेटवर्क जोखिम में](#-local-networks-at-risk)
2. [🛡️ फ़ायरवॉल कॉन्फ़िगरेशन](#-firewall-configuration)
3. [🔐 स्थानीय विकास के लिए सीक्रेट प्रबंधन](#-secrets-management-for-local-development)
4. [🕵️‍ प्रमाणपत्र लीक और साइड-चैनल हमले](#-credential-leaks-and-side-channel-attacks)
5. [🔍 मॉनिटरिंग और कैनरी टोकन](#-monitoring--canary-tokens)
6. [❌ सामान्य गलतफहमियां](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ स्थानीय नेटवर्क जोखिम में

सच कहें तो, हम में से हर किसी ने यह किया है। आपने कभी रैंडम कॉफ़ी‑शॉप Wi‑Fi से कनेक्ट किया होगा या बिना दो‑सोच के किसी को अपने घर के नेटवर्क का उपयोग करने दिया होगा। शायद आप अपने स्मार्ट फ्रिज पर भरोसा करते हैं कि वह आपके नेटवर्क को खतरे में नहीं डालेगा। वास्तविकता यह है कि ये आकस्मिक फैसले आपके स्थानीय विकास सेट‑अप को अनावश्यक जोखिमों के सामने ला सकते हैं। हमलावर केवल प्रोडक्शन सिस्टम को ही नहीं निशाना बनाते—स्थानीय वातावरण अक्सर नरम लक्ष्य होते हैं, जिससे संवेदनशील प्रोजेक्ट्स तक पहुँच मिल सकती है।

### हमले के परिदृश्य

1. **इंटरसेप्टेड ट्रैफ़िक:** अनएन्क्रिप्टेड ट्रैफ़िक आसानी से कैप्चर होकर पढ़ा जा सकता है।  
2. **अनप्रोटेक्टेड सर्विसेज:** `0.0.0.0` पर एक्सपोज़्ड स्थानीय डेटाबेस या API।  
3. **नेटवर्क स्पूफ़िंग:** ट्रैफ़िक को हमलावर के डिवाइस की ओर रीडायरेक्ट करना।

### त्वरित समाधान

- नेटवर्क एक्सपोज़र को सीमित करने के लिए फ़ायरवॉल की बजाय प्राइवेट Docker नेटवर्क को प्राथमिकता दें।  
- सार्वजनिक या साझा Wi‑Fi से बचें; अपने फ़ोन के हॉटस्पॉट का उपयोग करें।  
- `arp-scan` और `nmap` जैसे टूल्स से अज्ञात डिवाइस की निगरानी करके अपने स्थानीय नेटवर्क को मॉनिटर रखें।

## 🛡️ फ़ायरवॉल कॉन्फ़िगरेशन

### UFWwith Docker (Ubuntu)

> ⚠️ **चेतावनी:** डिफ़ॉल्ट रूप से Ubuntu/Debian पर Docker UFW/iptables नियमों को बायपास कर देता है, जिससे आपका सिस्टम हमलों के लिए उजागर हो सकता है।  
> यह मायने नहीं रखता कि आप पोर्ट को स्थानीय IP पते पर बाइंड करें (जैसे `-p 127.0.0.1:8080:80`)।

यह हर बार मुझे चकित करता है जब मैं इसके बारे में सीखता हूँ! [Docker डिफ़ॉल्ट रूप से UFW नियमों को बायपास करता है](https://github.com/moby/moby/issues/4737), जिससे कंटेनर होस्ट और अन्य कंटेनरों के साथ बिना प्रतिबंध के संचार कर सकते हैं।

### सर्वोत्तम प्रथा

1. 🥇 **Docker नेटवर्क** का उपयोग करें ताकि प्रत्येक कंटेनर या नेटवर्क से क्या जुड़ सकता है, इसे अलग‑अलग किया जा सके और नियंत्रित किया जा सके।

###
2. 🥉 यदि आपको `host` नेटवर्क का उपयोग करना ही पड़े, या कस्टम नेटवर्क नहीं बना सकते, तो जोखिम को कम करने के लिए iptables को अपडेट करें। यह काम आसान नहीं है; नीचे दिया गया यूटिलिटी देखें। [उपयोगिता नीचे देखें।](#uf)

#### Docker नेटवर्क पृथक्करण

```bash
# Create a new Docker network
docker network create my-network

# Run your container with the new network
docker run --network my-network my-container
```

#### UFW कॉन्फ़िगरेशन (`host` नेटवर्क के लिए)

इस समस्या को ठीक करने के लिए बहुत सारी गलत सलाह मिलती है। Docker के साथ काम करने के लिए UFW को इस तरह कॉन्फ़िगर करें जैसा आप सामान्यतः अपेक्षा करेंगे।

मैंने `ufw-docker` का उपयोग करके एक स्वयं‑होस्टेड सिस्टम सेट किया है और यह ठीक से काम करता दिखा।

```bash title="install-ufw-docker.sh"
# Install binary as root (needs root permissions anyway)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Install and modify the `after.rules` file of `ufw`
ufw-docker install

ufw-docker help
```

```

यह कमांड निम्नलिखित कार्य करता है:

- फ़ाइल `/etc/ufw/after.rules` का बैकअप बनाता है।
- फ़ाइल के अंत में Docker‑संबंधित नियम जोड़ता है ताकि UFW के साथ सही ढंग से एकीकृत हो सके।

**स्रोत:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**उदाहरण उपयोग:**

```bash

# पोर्ट 8080 पर Docker कंटेनर की अनुमति दें
ufw-docker allow <container_name> 8080/tcp

# अपने UFW कॉन्फ़िगरेशन के साथ नियमों को सुरक्षित रूप से प्रबंधित करें
ufw-docker status

```

**ध्यान दें:** Docker‑UFW टकरावों के अधिकांश “फ़िक्स” मैन्युअल iptables नियमों पर निर्भर होते हैं, जो अपडेट के दौरान त्रुटिप्रवण और नाज़ुक हो सकते हैं।

### macOS फ़ायरवॉल

1. **System Preferences > Security & Privacy > Firewall** पर जाएँ।
2. फ़ायरवॉल को सक्रिय करें और “Firewall Options” पर क्लिक करें।
3. आवश्यक सेवाओं को छोड़कर सभी इनकमिंग कनेक्शन ब्लॉक करें।

**ध्यान दें:** आपको अपने फ़ायरवॉल को कॉन्फ़िगर करने के लिए यह देखना पड़ सकता है कि कौन‑से स्मार्ट डिवाइस (जैसे Google Cast/AirPlay और अन्य सेवाएँ) की अनुमति देनी है।

### उन्नत उपयोगकर्ताओं के लिए कमांड (macOS और Linux)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # सभी को ब्लॉक करें
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # विशिष्ट ऐप की अनुमति दें

```

#### Linux (ufw):

```bash

ufw default deny incoming  # सभी इनकमिंग ब्लॉक करें
ufw allow ssh  # SSH की अनुमति दें
# वेब ट्रैफ़िक के लिए 443 और 80 की अनुमति दें
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # फ़ायरवॉल सक्रिय करें

```

**प्रो टिप:** macOS पर अधिक उपयोगकर्ता‑मित्र कॉन्फ़िगरेशन के लिए [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) और Linux पर [ufw](https://help.ubuntu.com/community/UFW) जैसे टूल्स का उपयोग करें।

## 🔐 स्थानीय विकास के लिए सीक्रेट्स प्रबंधन

### सक्रिय प्लेसहोल्डर वैलिडेशन

<p>💡 अपने एप्लिकेशन को चलाने से पहले सुनिश्चित करें कि सीक्रेट्स वास्तविक मानों के साथ सही‑सेट हैं।</p>

यदि आप अपने सीक्रेट्स में `__WARNING_REPLACE_ME__` जैसे प्लेसहोल्डर का उपयोग करते हैं, तो यह अच्छा है—शायद कोई देख लेगा। फिर भी, रन‑टाइम पर सुरक्षा प्रदान करने के लिए आप एक छोटा वैलिडेशन जोड़ सकते हैं।

आप विश्वास नहीं करेंगे कि हमलावरों के लिए सीक्रेट का अनुमान लगाकर JWT टोकन को (बदलना और पुनः‑साइन करना) कितना आसान है!

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

### Generating and Storing Secrets

<p class="inset">कोडबेस में कभी भी सीक्रेट्स को हार्डकोड न करें। पर्यावरण वेरिएबल्स और सुरक्षित वॉल्ट्स को प्राथमिकता दें।</p>


`.env.example` के बजाय, `.env.generate.sh` का उपयोग करें ताकि उपयोगकर्ताओं के लिए सुरक्षित “डिफ़ॉल्ट” के साथ `.env` फ़ाइल बनाना आसान हो सके।

#### Example `.env.generate.sh`

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

## 🕵️‍ Monitoring & Double-checking

### `nmap` Examples

#### Testing Inside Your Network

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Detect devices on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

```

#### Testing Outside Your Network

अपना वर्तमान (पब्लिक) IP आसानी से `ifconfig.me` जैसी सेवाओं से देख सकते हैं: `curl https://ifconfig.me`.

बाहरी नेटवर्क या रिमोट सर्वर का उपयोग करके अपने पब्लिक IP को टेस्ट करें:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# target_host को अपने पब्लिक IP या होस्टनेम में बदलें
# उन्नत तकनीकों से होस्ट जांचें
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**दोनों को क्यों टेस्ट करें?**
भीतर से टेस्ट करने से आंतरिक एक्सपोज़र पता चलता है, जबकि बाहरी टेस्ट से उन सेवाओं की पहचान होती है जो हमलावरों के लिए उपलब्ध हैं।

## 🛡️ Common Misconceptions

1. **मेरा स्थानीय वातावरण लक्ष्य नहीं है।**  
   - तथ्य: हमलावर आपके मशीन से आपके प्रोडक्शन सिस्टम तक पिवट कर सकते हैं।  
2. **फ़ायरवॉल सब कुछ ब्लॉक कर देते हैं।**  
   - तथ्य: वे केवल वही ब्लॉक करते हैं जो आप उन्हें कॉन्फ़िगर करते हैं।  
3. **प्राइवेट IP सुरक्षित हैं।**  
   - तथ्य: NAT बायपास जैसे एक्सप्लॉइट अभी भी आपके नेटवर्क को प्रभावित कर सकते हैं।
````
