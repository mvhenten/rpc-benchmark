# Run Chrome Headless in a container

# Base docker image
FROM debian:sid

# Install deps + add Chrome Stable + purge all the things
RUN apt-get update && apt-get install -y \
	apt-transport-https \
	ca-certificates \
	curl \
  	gnupg \
	--no-install-recommends \
	&& curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
	&& apt-get update && apt-get install -y \
	google-chrome-stable libnss3-tools unzip firefox \
	--no-install-recommends \
	&& apt-get purge --auto-remove -y curl gnupg \
	&& rm -rf /var/lib/apt/lists/*

# Add Chrome as a user
RUN groupadd -r chrome && useradd -r -g chrome -G audio,video chrome \
    && mkdir -p /home/chrome && chown -R chrome:chrome /home/chrome

RUN wget --no-check-certificate http://chromedriver.storage.googleapis.com/2.35/chromedriver_linux64.zip -O chromedriver.zip && \
	unzip -p chromedriver.zip chromedriver > /usr/bin/chromedriver && \
	chmod 755 /usr/bin/chromedriver && \
	rm chromedriver.zip

RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.19.1/geckodriver-v0.19.1-linux64.tar.gz && \
	tar xvfz geckodriver-v0.19.1-linux64.tar.gz && \
	mv geckodriver /usr/bin && \
	rm geckodriver-v0.19.1-linux64.tar.gz

# Run Chrome non-privileged
USER chrome

# Install Amazon certificates
RUN cd /home/chrome && \
    wget "http://pki.amazon.com/crt/Amazon.com%20Internal%20Root%20Certificate%20Authority.der" && \
	wget "http://pki.amazon.com/crt/Amazon%20Corporate%20Systems%20Certificate%20Authority%20G2%2001.der" && \
	wget "http://pki.amazon.com/crt/Amazon%20Corporate%20Systems%20Certificate%20Authority%20G2%2002.der" && \
	wget "http://pki.amazon.com/crt/Amazon.com%20InfoSec%20CA%20G3.der" && \
	mkdir -p /home/chrome/.pki/nssdb && \
	certutil -d /home/chrome/.pki/nssdb -N && \
	certutil -A -n "Amazon Corporate Systems Certificate Authority G2 01" -t "TCu,Cu,Tu" -i "Amazon Corporate Systems Certificate Authority G2 01.der" -d sql:/home/chrome/.pki/nssdb && \
	certutil -A -n "Amazon Corporate Systems Certificate Authority G2 02" -t "TCu,Cu,Tu" -i "Amazon Corporate Systems Certificate Authority G2 02.der" -d sql:/home/chrome/.pki/nssdb && \
	certutil -A -n "Amazon.com Infosec CA G2" -t "TCu,Cu,Tu" -i "Amazon.com InfoSec CA G3.der" -d sql:/home/chrome/.pki/nssdb && \
	certutil -A -n "Amazon.com Internal Root Certificate Authority" -t "TCu,Cu,Tu" -i "Amazon.com Internal Root Certificate Authority.der" -d sql:/home/chrome/.pki/nssdb && \
	rm *.der

