har2appcache
============

generate a appcache file from  a HTTP Archive file.har.
It extracts all the requests's urls made by your page and build the appcache file with it.
So you get all the requests even the dynamic ones like ```XMLHttpRequest```.
It is more robust than the usual appcache builders which are based on DOM parsing.


### How To Install

```
sudo npm install -g har2appcache
```

### How To Use 

```
har2appcache sample.har
```

it will output a appcache file on the terminal.

```
CACHE MANIFEST

CACHE:
index.html
images/star.png

NETWORK:
*
```

### Help 

```
har2appcache yourfile.har
	Generate a appcache file from a http archive one

OPTIONS:
	-h	display inline help
	-cooked	filter output with reasonable rules

HOW TO GET A HAR FILE:
	Step 1: go in chrome > devtools > network
	Step 2: do "Copy ALL as HAR" or "Save as HAR with Content"
```