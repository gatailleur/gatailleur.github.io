---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
authors: []
publication: ""
doi: ""
pdf: ""
# tags: []
# categories: []
---

**Authors:** {{ with .Params.authors }}{{ delimit . ", " }}{{ end }}
  
**Venue:** {{ .Params.publication }}

{{ if .Params.doi -}}
[DOI]({{ .Params.doi }})
{{- end }} {{ if and .Params.doi .Params.pdf }} • {{ end }} {{ if .Params.pdf -}}
[PDF]({{ .Params.pdf }})
{{- end }}

<!--more-->

*Add a short abstract or summary here. Everything above the `more` line becomes the summary shown on the list page.*
