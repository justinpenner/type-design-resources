#! /bin/bash

# macOS: Before you can run this shell script, you may need to set it to open 
# in Terminal, and run `chmod +x jekyll-server.sh` to make it executable.

# A series of ancient runes that represents the folder this script is in
cd "${0%/*}"

# Get local network IP (macOS only right now)
if [[ "$OSTYPE" == "darwin"* ]]; then
	localip=$(ipconfig getifaddr en0)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    localip=""
elif [[ "$OSTYPE" == "cygwin" ]]; then
    localip=""
elif [[ "$OSTYPE" == "msys" ]]; then
    localip=""
elif [[ "$OSTYPE" == "win32" ]]; then
    localip=""
elif [[ "$OSTYPE" == "freebsd"* ]]; then
    localip=""
else
    localip=""
fi

# Start Jekyll!
if [[ "$localip" != "" ]]; then
	jekyll serve --livereload --open-url --host ${localip}
else
	jekyll serve --livereload --open-url
fi