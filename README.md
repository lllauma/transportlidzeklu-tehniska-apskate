# Pārbaudes uzdevums

Izstrādāta vizuāla WEB lapa, kurā tiek parādīti transportlīdzekļi(TL), kas norīkoti tehniskās apskates(TA) laukumā, un to sadalījums pa līnijām.

## Tehniskais apraksts
Risinājums izstrādāts, izmantojot Angular 9.
Palaišanas instrukcija:
    1. Instalēt Node Package Manager (NPM)
    2. Node js terminālī instalēt Angular CLI `npm install -g @angular/cli`
    3. Klonēt github repozitoriju `https://github.com/lllauma/transportlidzeklu-tehniska-apskate`
    4. Attiecīgajā mapē no Node js termināļa palaist projektu `ng serve`
    5. Pārlukprogrammā atvērt WEB lapu `http://localhost:4200/`


## Risinājuma apraksts
Dati tiek ielasīti no faila src/assets/db.json. Tā kā dati ir statiski, tie tiek ielādēti globālā masīvā, kurš var tikt rediģēts (transportlīdzekļi var tikt izņemti),
taču pats fails netiek mainīts, līdz ar to pēc lapas pārlādes dati būs to sākotnējā formā.

Failā src/assets/conf.json atrodama esošā konfigurācija 
    - datu faila atrašanās vieta
    - apskates laukuma parametri, lai risinājums būtu ērti pielāgojams